const W = 320;
const GROUND = 150;
const GRAVITY = 0.36;
const ROOM_TTL_MS = 1000 * 60 * 60 * 3;
const PLAYER_TTL_MS = 1000 * 60 * 8;
const MEMORY_ROOMS = new Map();

const MYSTERIES = [
  {
    id: "Case P-17",
    culprit: "Alley Pigeon",
    suspects: [
      ["Alley Pigeon", "breadcrumb syndicate runner"],
      ["Buster", "nervous gate dog"],
      ["Madame Parrot", "opera mimic"],
      ["Mittens", "jealous window cat"],
    ],
    motive: "Sir Reginald learned the downtown breadcrumb route.",
    reveals: {
      trail: "Barnaby: green feather oil, but no cage dust. The bird was carried outside.",
      floor: "Ink exposes a hidden seam packed with breadcrumb dust.",
      note: "Cleo reads: Garden gate. 3 AM. Bring feathers.",
      scent: "Barnaby smells peanut butter used as payment, plus wet pigeon down.",
    },
    win: "The Alley Pigeon cracks. Sir Reginald witnessed the breadcrumb syndicate moving through Milkglass Manor.",
  },
  {
    id: "Case B-04",
    culprit: "Buster",
    suspects: [
      ["Buster", "nervous gate dog"],
      ["Alley Pigeon", "breadcrumb syndicate runner"],
      ["Madame Parrot", "opera mimic"],
      ["Mittens", "jealous window cat"],
    ],
    motive: "The canary knew Buster chewed the owner's victory slippers.",
    reveals: {
      trail: "Barnaby: oily feathers drag low, exactly at bulldog nose height.",
      floor: "Ink reveals a paw-scuffed compartment under the rug.",
      note: "Cleo reads: Bring feathers, or the slipper secret sings.",
      scent: "Barnaby smells dog shampoo, cheap peanut butter, and pure panic.",
    },
    win: "Buster confesses between hiccuping barks. The canary was hidden as blackmail protection.",
  },
  {
    id: "Case M-22",
    culprit: "Madame Parrot",
    suspects: [
      ["Madame Parrot", "opera mimic"],
      ["Mittens", "jealous window cat"],
      ["Buster", "nervous gate dog"],
      ["Alley Pigeon", "breadcrumb syndicate runner"],
    ],
    motive: "Sir Reginald stole her thunder by singing the aria first.",
    reveals: {
      trail: "Barnaby: the feather trail smells like perfume, polish, and stage fright.",
      floor: "Ink seeps into a compartment lined with torn sheet music.",
      note: "Cleo reads: No encore for the yellow soprano.",
      scent: "Barnaby catches birdseed, violet perfume, and fake bulldog shampoo.",
    },
    win: "Madame Parrot repeats the confession in three voices. Sir Reginald was stashed backstage in the pantry.",
  },
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    try {
      if (url.pathname.startsWith("/api/")) {
        return await handleApi(request, env, url);
      }
      return serveAsset(url.pathname);
    } catch (error) {
      return json({ error: error?.message || "The manor lost the trail." }, error?.status || 500);
    }
  },
};

function serveAsset(pathname) {
  if (pathname === "/" || pathname === "/index.html") {
    return new Response(ASSETS.html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
  if (pathname === "/style.css") {
    return new Response(ASSETS.css, {
      headers: {
        "Content-Type": "text/css; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
  if (pathname === "/game.js") {
    return new Response(ASSETS.js, {
      headers: {
        "Content-Type": "application/javascript; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
  if (pathname === "/assets/barnaby-detective.png") {
    const binary = atob(ASSETS.barnabyArt);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    return new Response(bytes, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  }
  return new Response(ASSETS.html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

async function handleApi(request, env, url) {
  if (request.method === "OPTIONS") return json({});
  if (url.pathname === "/api/rooms" && request.method === "POST") {
    return createRoom(request, env);
  }

  const match = url.pathname.match(/^\/api\/rooms\/([A-Z0-9]{4,6})(?:\/([a-z]+))?$/i);
  if (!match) return json({ error: "Unknown room route." }, 404);

  const code = match[1].toUpperCase();
  const action = match[2] || "";
  if (request.method === "GET" && !action) {
    const room = await requireRoom(env, code);
    stepRoom(room);
    await saveRoom(env, room);
    return json({ state: snapshot(room, "") });
  }
  if (request.method !== "POST") return json({ error: "Use the game buttons for this route." }, 405);

  if (action === "join") return joinRoom(request, env, code);
  if (action === "input") return updateInput(request, env, code);
  if (action === "accuse") return accuse(request, env, code);
  if (action === "reset") return resetRoom(request, env, code);
  return json({ error: "Unknown room action." }, 404);
}

async function createRoom(request, env) {
  const body = await readJson(request);
  await pruneOldRooms(env);
  let code = randomCode();
  for (let i = 0; i < 20 && (await loadRoom(env, code)); i += 1) {
    code = randomCode();
  }
  const playerId = randomId();
  const room = newRoom(code, playerId, body.name);
  await saveRoom(env, room);
  return json(joinPayload(room, playerId));
}

async function joinRoom(request, env, code) {
  const body = await readJson(request);
  const room = await requireRoom(env, code);
  stepRoom(room);
  prunePlayers(room);
  let playerId = String(body.playerId || "");
  let player = room.players.find((candidate) => candidate.id === playerId);
  if (!player) {
    if (room.players.length >= 8) {
      return json({ error: "This room is full. Create another manor." }, 409);
    }
    playerId = randomId();
    const slot = nextSlot(room);
    player = {
      id: playerId,
      name: cleanName(body.name),
      slot,
      role: roleForSlot(slot),
      lastSeen: Date.now(),
      input: { left: false, right: false },
    };
    room.players.push(player);
  } else {
    player.name = cleanName(body.name);
    player.lastSeen = Date.now();
  }
  await saveRoom(env, room);
  return json(joinPayload(room, playerId));
}

async function updateInput(request, env, code) {
  const body = await readJson(request);
  const room = await requireRoom(env, code);
  const player = requirePlayer(room, body.playerId);
  player.lastSeen = Date.now();
  player.input = {
    left: Boolean(body.input?.left),
    right: Boolean(body.input?.right),
  };
  for (const action of Array.isArray(body.actions) ? body.actions.slice(0, 8) : []) {
    processAction(room, player, action);
  }
  stepRoom(room);
  await saveRoom(env, room);
  return json(joinPayload(room, player.id));
}

async function accuse(request, env, code) {
  const body = await readJson(request);
  const room = await requireRoom(env, code);
  const player = requirePlayer(room, body.playerId);
  player.lastSeen = Date.now();
  stepRoom(room);
  const clueCount = ["trail", "floor", "note", "scent"].filter((key) => room.evidence[key]).length;
  if (clueCount < 4) {
    room.message = "Four clues first. The board refuses to guess.";
  } else if (room.status !== "ended") {
    const suspect = String(body.suspect || "");
    room.evidence.buster = true;
    if (suspect === room.mystery.culprit) {
      finish(room, true, "Online case closed", room.mystery.win);
    } else {
      room.evidence.buster = false;
      addChaos(room, 22, `${suspect || "Someone"} is innocent. The real culprit keeps moving.`);
    }
  }
  await saveRoom(env, room);
  return json(joinPayload(room, player.id));
}

async function resetRoom(request, env, code) {
  const body = await readJson(request);
  const room = await requireRoom(env, code);
  const player = requirePlayer(room, body.playerId);
  const players = room.players.map((p) => ({
    ...p,
    lastSeen: p.id === player.id ? Date.now() : p.lastSeen,
    input: { left: false, right: false },
  }));
  const fresh = newRoom(code, players[0]?.id || player.id, players[0]?.name || player.name);
  fresh.players = players;
  await saveRoom(env, fresh);
  return json(joinPayload(fresh, player.id));
}

function newRoom(code, hostId, hostName) {
  const mystery = MYSTERIES[Math.floor(Math.random() * MYSTERIES.length)];
  const now = Date.now();
  return {
    code,
    status: "playing",
    createdAt: now,
    updatedAt: now,
    lastTick: now,
    time: 300,
    chaos: 0,
    swats: 0,
    broken: 0,
    message: "Two detectives. One liar. The manor starts sweating.",
    mystery,
    evidence: {
      trail: false,
      floor: false,
      note: false,
      scent: false,
      buster: false,
    },
    players: [
      {
        id: hostId,
        name: cleanName(hostName),
        slot: 0,
        role: roleForSlot(0),
        lastSeen: now,
        input: { left: false, right: false },
      },
    ],
    actors: [
      {
        cat: "barnaby",
        x: 35,
        y: GROUND - 22,
        vx: 0,
        vy: 0,
        w: 26,
        h: 22,
        facing: 1,
        onGround: false,
        step: 0,
        sense: false,
        cooldown: 0,
      },
      {
        cat: "cleo",
        x: 64,
        y: GROUND - 21,
        vx: 0,
        vy: 0,
        w: 24,
        h: 21,
        facing: 1,
        onGround: false,
        step: 0,
        sense: false,
        cooldown: 0,
      },
    ],
    curtain: {
      x: 247,
      y: 33,
      w: 45,
      h: 86,
      hp: 3,
      falling: false,
      fallen: false,
      vy: 0,
    },
    objects: initialObjects(),
    end: null,
  };
}

function initialObjects() {
  return [
    object("ink", "ink bottle", "bottle", 102, 88, 11, 15, false, true),
    object("vase", "crystal vase", "vase", 144, 83, 13, 20, true, false),
    object("clock", "clock pendulum", "pendulum", 35, 76, 9, 36, true, false),
    object("book1", "ledger", "book", 203, 97, 14, 6, false, false),
    object("book2", "atlas", "book", 217, 91, 16, 7, false, false),
  ];
}

function object(id, name, type, x, y, w, h, precious, clue) {
  return { id, name, type, x, y, w, h, vx: 0, vy: 0, dynamic: false, broken: false, precious, clue };
}

function stepRoom(room) {
  const now = Date.now();
  const elapsed = Math.min((now - (room.lastTick || now)) / 1000, 0.25);
  room.lastTick = now;
  room.updatedAt = now;
  if (elapsed <= 0 || room.status === "ended") return;

  const steps = Math.ceil(elapsed / 0.033);
  const dt = elapsed / steps;
  for (let i = 0; i < steps; i += 1) {
    room.time -= dt;
    if (room.time <= 0) {
      room.time = 0;
      finish(room, false, "The humans are home", "The owner stepped into the study before the detectives could name the culprit.");
      return;
    }
    moveActor(room, 0, dt);
    moveActor(room, 1, dt);
    updateObjects(room, dt);
    inspectRoom(room);
  }
}

function moveActor(room, slot, dt) {
  const actor = room.actors[slot];
  const controller = room.players.find((player) => player.slot === slot);
  const input = controller?.input || {};
  const acceleration = slot === 0 ? 0.44 : 0.52;
  const maxSpeed = slot === 0 ? 2.1 : 2.35;
  if (input.left) {
    actor.vx -= acceleration;
    actor.facing = -1;
  }
  if (input.right) {
    actor.vx += acceleration;
    actor.facing = 1;
  }
  if (!input.left && !input.right) actor.vx *= 0.78;
  actor.vx = clamp(actor.vx, -maxSpeed, maxSpeed);
  actor.vy += GRAVITY;
  actor.x += actor.vx;
  actor.y += actor.vy;
  actor.x = clamp(actor.x, 10, W - actor.w - 10);
  collideFurniture(actor);
  if (actor.y + actor.h >= GROUND) {
    actor.y = GROUND - actor.h;
    actor.vy = 0;
    actor.onGround = true;
  } else {
    actor.onGround = false;
  }
  actor.step += Math.abs(actor.vx) * dt;
  actor.cooldown = Math.max(0, actor.cooldown - dt);
}

function processAction(room, player, action) {
  if (room.status === "ended" || player.slot > 1) return;
  const actor = room.actors[player.slot];
  if (action === "jump" && actor.onGround) {
    actor.vy = -6.1;
    actor.onGround = false;
  }
  if (action === "sense") {
    actor.sense = !actor.sense;
    room.message = actor.sense
      ? `${actor.cat === "barnaby" ? "Barnaby" : "Cleo"} turns sense on.`
      : `${actor.cat === "barnaby" ? "Barnaby" : "Cleo"} lets the room go quiet.`;
    inspectRoom(room);
  }
  if (action === "swat" && actor.cooldown <= 0) {
    actor.cooldown = 0.26;
    swatActor(room, actor);
  }
}

function swatActor(room, actor) {
  room.swats += 1;
  const paw = {
    x: actor.facing > 0 ? actor.x + actor.w - 2 : actor.x - 16,
    y: actor.y + 6,
    w: 18,
    h: 12,
  };
  let hit = false;
  for (const obj of room.objects) {
    if (obj.broken) continue;
    if (rectsOverlap(paw, obj)) {
      if (obj.id === "ink" && !room.evidence.floor && !(actor.cat === "cleo" && actor.sense)) {
        hit = true;
        room.message = "The ink splashes, but Cleo must read the hidden clue.";
        continue;
      }
      hit = true;
      obj.dynamic = true;
      obj.vx += actor.facing * 2.35;
      obj.vy -= 1.6;
      if (obj.precious) addChaos(room, 4, "That sounded expensive.");
    }
  }
  if (!room.curtain.fallen && rectsOverlap(paw, room.curtain)) {
    hit = true;
    room.curtain.hp -= 1;
    if (room.curtain.hp <= 0) {
      room.curtain.falling = true;
      addChaos(room, 8, "The curtains surrender.");
    } else {
      room.message = "The curtain rings groan.";
    }
  }
  if (!hit) room.message = "A very forensic swat.";
}

function updateObjects(room) {
  const curtain = room.curtain;
  if (curtain.falling && !curtain.fallen) {
    curtain.vy += 0.5;
    curtain.y += curtain.vy;
    if (curtain.y + curtain.h >= GROUND) {
      curtain.y = GROUND - curtain.h + 18;
      curtain.fallen = true;
      curtain.falling = false;
      const ink = room.objects.find((o) => o.id === "ink" && !o.broken);
      if (ink) {
        ink.dynamic = true;
        ink.vx = -1.9;
        ink.vy = -2.4;
      }
    }
  }
  for (const obj of room.objects) {
    if (obj.broken || !obj.dynamic) continue;
    obj.vy += GRAVITY;
    obj.x += obj.vx;
    obj.y += obj.vy;
    obj.vx *= 0.985;
    if (obj.x < 12 || obj.x + obj.w > W - 12) {
      obj.x = clamp(obj.x, 12, W - obj.w - 12);
      obj.vx *= -0.45;
    }
    if (obj.y + obj.h >= GROUND) {
      obj.y = GROUND - obj.h;
      obj.vy *= -0.26;
      obj.vx *= 0.78;
      if (Math.abs(obj.vy) < 0.7) obj.vy = 0;
      if (obj.id === "ink" && !room.evidence.floor) {
        obj.broken = true;
        room.broken += 1;
        markEvidence(room, "floor", "Black ink drains into a hidden floorboard seam.");
      } else if (obj.precious && Math.abs(obj.vx) > 0.9) {
        obj.broken = true;
        room.broken += 1;
        addChaos(room, obj.id === "vase" ? 23 : 16, `${obj.name} becomes evidence-adjacent.`);
      }
    }
  }
}

function inspectRoom(room) {
  const barnaby = room.actors[0];
  const cleo = room.actors[1];
  const barnabyX = barnaby.x + barnaby.w / 2;
  const cleoX = cleo.x + cleo.w / 2;
  if (barnaby.sense) {
    if (room.curtain.fallen && Math.abs(barnabyX - 266) < 52 && !room.evidence.trail) {
      markEvidence(room, "trail", "Barnaby finds a feather trail that refuses to behave.");
    }
    if (room.evidence.floor && Math.abs(barnabyX - 151) < 38 && !room.evidence.scent) {
      markEvidence(room, "scent", "Barnaby matches the odor to a suspect.");
    }
  }
  if (cleo.sense && room.evidence.floor && Math.abs(cleoX - 146) < 38 && !room.evidence.note) {
    markEvidence(room, "note", "Cleo reads the note the floor tried to swallow.");
  }
}

function markEvidence(room, key, text) {
  if (room.evidence[key]) return;
  room.evidence[key] = true;
  room.message = room.mystery.reveals[key] || text;
}

function addChaos(room, amount, reason) {
  room.chaos = clamp(room.chaos + amount, 0, 100);
  if (reason) room.message = reason;
  if (room.chaos >= 100) {
    finish(room, false, "Bathroom jail", "The manor solved only one mystery: who destroyed the study.");
  }
}

function finish(room, won, chip, copy) {
  room.status = "ended";
  room.end = {
    won,
    chip,
    title: won ? "Sir Reginald is saved." : "The trail goes cold.",
    copy: `${copy} Security cam recap: ${room.swats} swats, ${room.broken} broken objects, ${Math.round(room.chaos)}% chaos.`,
  };
  room.message = won ? "Case closed. The bird sings again." : "The trail goes cold.";
}

function snapshot(room, playerId) {
  const mystery = {
    id: room.mystery.id,
    suspects: room.mystery.suspects,
    motive: room.mystery.motive,
  };
  return {
    code: room.code,
    status: room.status,
    time: room.time,
    chaos: room.chaos,
    swats: room.swats,
    broken: room.broken,
    message: room.message,
    mystery,
    evidence: room.evidence,
    players: room.players.map((player) => ({
      name: player.name,
      role: player.role,
      slot: player.slot,
      you: player.id === playerId,
    })),
    actors: room.actors,
    curtain: room.curtain,
    objects: room.objects,
    end: room.end,
  };
}

function joinPayload(room, playerId) {
  const player = room.players.find((candidate) => candidate.id === playerId);
  return {
    roomCode: room.code,
    playerId,
    slot: player?.slot ?? 2,
    role: player?.role ?? "Clue Board",
    state: snapshot(room, playerId),
  };
}

async function loadRoom(env, code) {
  if (env.DB) {
    const row = await env.DB.prepare("SELECT data FROM rooms WHERE code = ?").bind(code).first();
    return row?.data ? JSON.parse(row.data) : null;
  }
  return clone(MEMORY_ROOMS.get(code) || null);
}

async function requireRoom(env, code) {
  const room = await loadRoom(env, code);
  if (!room) {
    const error = new Error("Room not found. Check the code or create a new room.");
    error.status = 404;
    throw error;
  }
  return room;
}

async function saveRoom(env, room) {
  room.updatedAt = Date.now();
  if (env.DB) {
    await env.DB
      .prepare("INSERT INTO rooms (code, data, updated_at) VALUES (?, ?, ?) ON CONFLICT(code) DO UPDATE SET data = excluded.data, updated_at = excluded.updated_at")
      .bind(room.code, JSON.stringify(room), room.updatedAt)
      .run();
  } else {
    MEMORY_ROOMS.set(room.code, clone(room));
  }
}

async function pruneOldRooms(env) {
  const cutoff = Date.now() - ROOM_TTL_MS;
  if (env.DB) {
    await env.DB.prepare("DELETE FROM rooms WHERE updated_at < ?").bind(cutoff).run();
    return;
  }
  for (const [code, room] of MEMORY_ROOMS) {
    if ((room.updatedAt || 0) < cutoff) MEMORY_ROOMS.delete(code);
  }
}

function prunePlayers(room) {
  const cutoff = Date.now() - PLAYER_TTL_MS;
  room.players = room.players.filter((player, index) => index === 0 || player.lastSeen > cutoff);
}

function requirePlayer(room, playerId) {
  const player = room.players.find((candidate) => candidate.id === playerId);
  if (!player) {
    const error = new Error("Rejoin the room to keep playing.");
    error.status = 401;
    throw error;
  }
  return player;
}

function nextSlot(room) {
  for (let slot = 0; slot < 8; slot += 1) {
    if (!room.players.some((player) => player.slot === slot)) return slot;
  }
  return room.players.length;
}

function roleForSlot(slot) {
  if (slot === 0) return "Barnaby";
  if (slot === 1) return "Cleo";
  return `Clue Board ${slot - 1}`;
}

function cleanName(name) {
  return String(name || "Guest Detective").replace(/[<>]/g, "").trim().slice(0, 18) || "Guest Detective";
}

function randomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

function randomId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function clone(value) {
  return value ? JSON.parse(JSON.stringify(value)) : value;
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function collideFurniture(actor) {
  const shelves = [
    { x: 192, y: 105, w: 53, h: 7 },
    { x: 75, y: 104, w: 94, h: 9 },
  ];
  for (const shelf of shelves) {
    const next = { x: actor.x, y: actor.y, w: actor.w, h: actor.h };
    if (rectsOverlap(next, shelf) && actor.vy >= 0 && actor.y + actor.h - actor.vy <= shelf.y + 2) {
      actor.y = shelf.y - actor.h;
      actor.vy = 0;
      actor.onGround = true;
    }
  }
}

async function readJson(request) {
  return request.json().catch(() => ({}));
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
