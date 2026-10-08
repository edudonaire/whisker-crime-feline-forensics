(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const screenWrap = canvas.closest(".screen-wrap");
  const portrait = document.getElementById("portrait");
  const pctx = portrait.getContext("2d");

  const startPanel = document.getElementById("startPanel");
  const startButton = document.getElementById("startButton");
  const endPanel = document.getElementById("endPanel");
  const endChip = document.getElementById("endChip");
  const endTitle = document.getElementById("endTitle");
  const endCopy = document.getElementById("endCopy");
  const restartButton = document.getElementById("restartButton");
  const cutscene = document.getElementById("cutscene");
  const cutsceneKicker = document.getElementById("cutsceneKicker");
  const cutsceneTitle = document.getElementById("cutsceneTitle");
  const cutsceneCopy = document.getElementById("cutsceneCopy");
  const cutsceneObjective = document.getElementById("cutsceneObjective");
  const nextCutsceneButton = document.getElementById("nextCutsceneButton");
  const skipCutsceneButton = document.getElementById("skipCutsceneButton");
  const clockEl = document.getElementById("clock");
  const chaosText = document.getElementById("chaosText");
  const chaosBar = document.getElementById("chaosBar");
  const detectiveName = document.getElementById("detectiveName");
  const senseCopy = document.getElementById("senseCopy");
  const evidenceList = document.getElementById("evidenceList");

  const W = 320;
  const H = 180;
  const GROUND = 150;
  const GRAVITY = 0.36;
  const keys = new Set();
  const pulses = [];
  const particles = [];
  const floaters = [];
  const rain = Array.from({ length: 42 }, (_, i) => ({
    x: (i * 37) % W,
    y: (i * 17) % H,
    s: 1 + ((i * 11) % 4),
  }));

  const colors = {
    ink: "#111018",
    wood: "#4f2e26",
    woodDark: "#2a1717",
    gold: "#d8a13a",
    cream: "#efe6d2",
    cream2: "#d6c7ad",
    shadowFur: "#8a8179",
    mask: "#706861",
    maskDark: "#4a4542",
    blue: "#55aee3",
    amber: "#f0ae48",
    violet: "#9267e6",
    green: "#68d477",
    red: "#e04e56",
    paper: "#f1e1c1",
  };

  let lastTime = 0;
  let started = false;
  let ended = false;
  let activeCat = "barnaby";
  let senseOn = false;
  let swatCooldown = 0;
  let sensePulse = 0;
  let sceneShake = 0;
  let lightningFlash = 0;
  let lightningTimer = 0.8;
  let lightningFork = 0.5;
  let solved = false;
  let cutsceneActive = false;
  let cutsceneQueue = [];
  let cutsceneIndex = 0;
  let cutsceneDone = null;

  const state = {
    time: 240,
    chaos: 0,
    swats: 0,
    broken: 0,
    evidence: {
      trail: false,
      floor: false,
      note: false,
      scent: false,
      buster: false,
    },
    message: "The canary cage is empty. Barnaby smells trouble.",
  };

  const INTRO_SCENES = [
    {
      kicker: "Cold open",
      title: "The bird knew too much.",
      copy:
        "At 3:07 AM, Sir Reginald sang one forbidden name into the storm. By breakfast, the gilded cage was swinging empty and every human in Milkglass Manor was lying badly.",
      objective: "Find the first trail before the house wakes up.",
    },
    {
      kicker: "Lightning over the study",
      title: "Enter Barnaby.",
      copy:
        "Blue eyes. Cream fur. Gray mask. A trench coat two sizes too dramatic. Barnaby does not ask permission. Barnaby asks gravity.",
      objective: "Move, jump, swat, and let the room confess.",
    },
    {
      kicker: "Partner in crime-solving",
      title: "Cleo hears the walls blink.",
      copy:
        "Barnaby smells what humans hide. Cleo hears what wood remembers. Switch between them when the clues start talking in different languages.",
      objective: "Use Scent and Whisker sense to crack the case.",
      cta: "Play",
    },
  ];

  const STORY_BEATS = {
    trail: [
      {
        kicker: "Scene I",
        title: "Feathers in the thunder.",
        copy:
          "A green trail burns across the dark like a confession with wings. Sir Reginald did not fly away. He was carried.",
        objective: "Rip down the curtain and follow the glow.",
        cta: "Continue",
      },
    ],
    floor: [
      {
        kicker: "Scene II",
        title: "Ink tells on the floor.",
        copy:
          "The bottle breaks. The floor drinks. A hidden seam appears, thin as a guilty smile.",
        objective: "Switch to Cleo and read what the manor tried to bury.",
        cta: "Continue",
      },
    ],
    note: [
      {
        kicker: "Scene III",
        title: "Meet at the garden gate.",
        copy:
          "The note is short, wet, and rude: 3 AM. Bring feathers. Somebody sold out a bird for peanut butter.",
        objective: "Bring Barnaby back to sniff the chewed twine.",
        cta: "Continue",
      },
    ],
    scent: [
      {
        kicker: "Scene IV",
        title: "Dog shampoo. Cheap peanut butter.",
        copy:
          "Barnaby knows that smell. Buster, the bulldog with the nervous paws, has been standing too close to the truth.",
        objective: "Reach the pet door on the right and corner Buster.",
        cta: "Continue",
      },
    ],
    buster: [
      {
        kicker: "Final scene",
        title: "The bulldog breaks.",
        copy:
          "Buster folds before the second meow. The Alley Pigeon paid him in peanut butter. Sir Reginald knew about the downtown breadcrumb syndicate.",
        objective: "Case closed. Mostly. The curtains may need a lawyer.",
        cta: "Close Case",
      },
    ],
  };

  const player = {
    x: 38,
    y: GROUND - 22,
    vx: 0,
    vy: 0,
    w: 26,
    h: 22,
    facing: 1,
    onGround: false,
    step: 0,
  };

  const objects = [];

  function resetObjects() {
    objects.length = 0;
    objects.push(
      {
        id: "ink",
        name: "ink bottle",
        type: "bottle",
        x: 102,
        y: 88,
        w: 11,
        h: 15,
        vx: 0,
        vy: 0,
        dynamic: false,
        broken: false,
        precious: false,
        clue: true,
      },
      {
        id: "vase",
        name: "crystal vase",
        type: "vase",
        x: 144,
        y: 83,
        w: 13,
        h: 20,
        vx: 0,
        vy: 0,
        dynamic: false,
        broken: false,
        precious: true,
      },
      {
        id: "clock",
        name: "clock pendulum",
        type: "pendulum",
        x: 35,
        y: 76,
        w: 9,
        h: 36,
        vx: 0,
        vy: 0,
        dynamic: false,
        broken: false,
        precious: true,
      },
      {
        id: "book1",
        name: "ledger",
        type: "book",
        x: 203,
        y: 97,
        w: 14,
        h: 6,
        vx: 0,
        vy: 0,
        dynamic: false,
        broken: false,
        precious: false,
      },
      {
        id: "book2",
        name: "atlas",
        type: "book",
        x: 217,
        y: 91,
        w: 16,
        h: 7,
        vx: 0,
        vy: 0,
        dynamic: false,
        broken: false,
        precious: false,
      }
    );
  }

  const curtain = {
    x: 247,
    y: 33,
    w: 45,
    h: 86,
    hp: 3,
    falling: false,
    fallen: false,
    vy: 0,
  };

  function resetGame() {
    started = true;
    ended = false;
    activeCat = "barnaby";
    senseOn = false;
    swatCooldown = 0;
    sensePulse = 0;
    sceneShake = 0;
    lightningFlash = 0.45;
    lightningTimer = 1.2;
    solved = false;
    state.time = 240;
    state.chaos = 0;
    state.swats = 0;
    state.broken = 0;
    state.evidence = {
      trail: false,
      floor: false,
      note: false,
      scent: false,
      buster: false,
    };
    state.message = "The canary cage is empty. Barnaby smells trouble.";
    Object.assign(player, {
      x: 38,
      y: GROUND - 22,
      vx: 0,
      vy: 0,
      facing: 1,
      onGround: false,
      step: 0,
    });
    Object.assign(curtain, {
      x: 247,
      y: 33,
      w: 45,
      h: 86,
      hp: 3,
      falling: false,
      fallen: false,
      vy: 0,
    });
    pulses.length = 0;
    particles.length = 0;
    floaters.length = 0;
    resetObjects();
    startPanel.classList.add("hidden");
    endPanel.classList.add("hidden");
    cutscene.classList.add("hidden");
    screenWrap.classList.remove("cinematic");
    updateHud();
  }

  function beginCutscene(scenes, onDone) {
    cutsceneQueue = scenes;
    cutsceneIndex = 0;
    cutsceneDone = onDone;
    cutsceneActive = true;
    cutscene.classList.remove("hidden");
    screenWrap.classList.add("cinematic");
    sceneShake = Math.max(sceneShake, 3);
    lightningFlash = 0.75;
    showCutsceneCard();
  }

  function showCutsceneCard() {
    const scene = cutsceneQueue[cutsceneIndex];
    if (!scene) {
      endCutscene();
      return;
    }
    cutsceneKicker.textContent = scene.kicker;
    cutsceneTitle.textContent = scene.title;
    cutsceneCopy.textContent = scene.copy;
    cutsceneObjective.textContent = scene.objective;
    nextCutsceneButton.textContent = scene.cta || (cutsceneIndex === cutsceneQueue.length - 1 ? "Continue" : "Next");
  }

  function endCutscene() {
    cutscene.classList.add("hidden");
    screenWrap.classList.remove("cinematic");
    cutsceneActive = false;
    const done = cutsceneDone;
    cutsceneDone = null;
    cutsceneQueue = [];
    cutsceneIndex = 0;
    if (done) done();
  }

  function advanceCutscene() {
    cutsceneIndex += 1;
    lightningFlash = 0.62;
    sceneShake = Math.max(sceneShake, 2.5);
    if (cutsceneIndex >= cutsceneQueue.length) {
      endCutscene();
    } else {
      showCutsceneCard();
    }
  }

  function storyBeat(key) {
    if (!STORY_BEATS[key]) return;
    beginCutscene(STORY_BEATS[key], () => {
      if (key === "buster") {
        finish(
          true,
          "Case closed",
          "Buster folds before the second meow. The Alley Pigeon took Sir Reginald to the breadcrumb syndicate, and Barnaby leaves only moderate structural damage behind."
        );
      }
    });
  }

  function rectsOverlap(a, b) {
    return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function addFloater(text, x, y, color = colors.paper) {
    floaters.push({ text, x, y, color, life: 1.4, vy: -0.22 });
  }

  function addParticles(x, y, count, color, spread = 1.6) {
    for (let i = 0; i < count; i++) {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * spread,
        vy: -Math.random() * spread,
        life: 0.7 + Math.random() * 0.5,
        color,
      });
    }
  }

  function setMessage(message, x = player.x, y = player.y - 12, color = colors.paper) {
    state.message = message;
    addFloater(message, clamp(x, 12, W - 90), clamp(y, 16, H - 24), color);
  }

  function addChaos(amount, reason) {
    state.chaos = clamp(state.chaos + amount, 0, 100);
    if (reason) {
      setMessage(reason, player.x - 12, player.y - 12, amount > 12 ? colors.red : colors.amber);
    }
    if (state.chaos >= 100) {
      finish(false, "Bathroom jail", "Thunder covers many crimes. It does not cover the priceless vase, the clock, or the fact that Barnaby looks wildly satisfied.");
    }
  }

  function markEvidence(key, text) {
    if (state.evidence[key]) return;
    state.evidence[key] = true;
    setMessage(text, player.x - 14, player.y - 14, colors.green);
    addParticles(player.x + player.w / 2, player.y + 8, 18, colors.green, 2.3);
    pulse(player.x + player.w / 2, player.y + 10, colors.green);
    if (STORY_BEATS[key]) storyBeat(key);
    updateHud();
  }

  function pulse(x, y, color) {
    pulses.push({ x, y, color, r: 3, life: 0.9 });
  }

  function switchCat() {
    activeCat = activeCat === "barnaby" ? "cleo" : "barnaby";
    senseOn = true;
    sensePulse = 0.2;
    const label = activeCat === "barnaby" ? "Barnaby takes the scent." : "Cleo listens through her whiskers.";
    setMessage(label, player.x - 10, player.y - 12, activeCat === "barnaby" ? colors.blue : colors.amber);
    updateHud();
  }

  function toggleSense() {
    senseOn = !senseOn;
    sensePulse = 0.5;
    pulse(player.x + player.w / 2, player.y + 10, activeCat === "barnaby" ? colors.blue : colors.amber);
    updateHud();
    inspectNearby();
  }

  function jump() {
    if (!started || ended || cutsceneActive) return;
    if (player.onGround) {
      player.vy = -6.1;
      player.onGround = false;
      addParticles(player.x + player.w / 2, player.y + player.h, 5, "#80604a", 1);
    }
  }

  function swat() {
    if (!started || ended || cutsceneActive || swatCooldown > 0) return;
    swatCooldown = 0.26;
    state.swats += 1;
    const paw = {
      x: player.facing > 0 ? player.x + player.w - 2 : player.x - 16,
      y: player.y + 6,
      w: 18,
      h: 12,
    };
    let hit = false;

    for (const obj of objects) {
      if (obj.broken) continue;
      if (rectsOverlap(paw, obj)) {
        hit = true;
        obj.dynamic = true;
        obj.vx += player.facing * (2.2 + Math.random() * 0.5);
        obj.vy -= 1.6;
        sceneShake = Math.max(sceneShake, 3);
        addParticles(obj.x + obj.w / 2, obj.y + obj.h / 2, 8, colors.amber, 2.1);
        if (obj.precious) addChaos(4, "That sounded expensive.");
      }
    }

    if (!curtain.fallen && rectsOverlap(paw, curtain)) {
      hit = true;
      curtain.hp -= 1;
      sceneShake = Math.max(sceneShake, 2);
      addParticles(curtain.x + 12, curtain.y + 8 + curtain.hp * 18, 9, "#8c2d35", 1.8);
      if (curtain.hp <= 0) {
        curtain.falling = true;
        markEvidence("trail", "A neon feather trail glows behind the drapes.");
        addChaos(8, "The curtains surrender.");
      } else {
        setMessage("The curtain rings groan.", curtain.x - 30, curtain.y + 20, colors.amber);
      }
    }

    if (!hit) {
      addParticles(paw.x + paw.w / 2, paw.y + 8, 5, colors.paper, 1.4);
      setMessage("A very forensic swat.", player.x - 8, player.y - 10, colors.paper);
    }
  }

  function inspectNearby() {
    if (!senseOn || !started || ended || cutsceneActive) return;
    const centerX = player.x + player.w / 2;

    if (activeCat === "barnaby") {
      if (Math.abs(centerX - 266) < 52 && !state.evidence.trail) {
        markEvidence("trail", "Oily feathers. The trail climbs to the curtain rod.");
      }
      if (state.evidence.floor && Math.abs(centerX - 151) < 34 && !state.evidence.scent) {
        markEvidence("scent", "Cheap peanut butter. Dog shampoo. Buster was here.");
      }
    } else {
      if (state.evidence.floor && Math.abs(centerX - 146) < 34 && !state.evidence.note) {
        markEvidence("note", "The note reads: garden gate, 3 AM, bring feathers.");
      }
    }
  }

  function update(dt) {
    updateStorm(dt);
    if (!started || ended || cutsceneActive) return;
    state.time -= dt;
    if (state.time <= 0) {
      finish(false, "The humans are home", "The owner stepped into the study before Barnaby could name the culprit. The canary remains a cold case.");
      return;
    }

    const left = keys.has("ArrowLeft") || keys.has("a") || keys.has("A");
    const right = keys.has("ArrowRight") || keys.has("d") || keys.has("D");
    const acceleration = activeCat === "barnaby" ? 0.44 : 0.52;
    const maxSpeed = activeCat === "barnaby" ? 2.1 : 2.35;

    if (left) {
      player.vx -= acceleration;
      player.facing = -1;
    }
    if (right) {
      player.vx += acceleration;
      player.facing = 1;
    }
    if (!left && !right) player.vx *= 0.78;
    player.vx = clamp(player.vx, -maxSpeed, maxSpeed);
    player.vy += GRAVITY;
    player.x += player.vx;
    player.y += player.vy;
    player.x = clamp(player.x, 10, W - player.w - 10);

    collideFurniture();

    if (player.y + player.h >= GROUND) {
      player.y = GROUND - player.h;
      player.vy = 0;
      player.onGround = true;
    } else {
      player.onGround = false;
    }

    player.step += Math.abs(player.vx) * dt;
    swatCooldown = Math.max(0, swatCooldown - dt);
    sensePulse = Math.max(0, sensePulse - dt);
    sceneShake = Math.max(0, sceneShake - dt * 10);

    updateObjects(dt);
    updateEffects(dt);
    inspectNearby();
    maybeStartInterrogation();
    updateHud();
  }

  function updateStorm(dt) {
    lightningTimer -= dt;
    lightningFlash = Math.max(0, lightningFlash - dt * 2.8);
    if (lightningTimer <= 0) {
      lightningFork = Math.random();
      lightningFlash = Math.random() > 0.38 ? 0.55 : 0.18;
      sceneShake = Math.max(sceneShake, lightningFlash > 0.4 ? 2.4 : 0);
      lightningTimer = 2.4 + Math.random() * 3.8;
    }
    sceneShake = Math.max(0, sceneShake - dt * 10);
  }

  function collideFurniture() {
    const shelves = [
      { x: 192, y: 105, w: 53, h: 7 },
      { x: 75, y: 104, w: 94, h: 9 },
    ];
    for (const s of shelves) {
      const next = { x: player.x, y: player.y, w: player.w, h: player.h };
      if (rectsOverlap(next, s) && player.vy >= 0 && player.y + player.h - player.vy <= s.y + 2) {
        player.y = s.y - player.h;
        player.vy = 0;
        player.onGround = true;
      }
    }
  }

  function updateObjects(dt) {
    if (curtain.falling && !curtain.fallen) {
      curtain.vy += 0.5;
      curtain.y += curtain.vy;
      if (curtain.y + curtain.h >= GROUND) {
        curtain.y = GROUND - curtain.h + 18;
        curtain.fallen = true;
        curtain.falling = false;
        sceneShake = 7;
        const ink = objects.find((o) => o.id === "ink" && !o.broken);
        if (ink) {
          ink.dynamic = true;
          ink.vx = -1.9;
          ink.vy = -2.4;
        }
      }
    }

    for (const obj of objects) {
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
        if (obj.id === "ink" && !state.evidence.floor) {
          obj.broken = true;
          state.broken += 1;
          markEvidence("floor", "Black ink drains into a hidden floorboard seam.");
          addParticles(obj.x + obj.w / 2, obj.y + obj.h, 24, "#17151d", 2.5);
        } else if (obj.precious && Math.abs(obj.vx) > 0.9) {
          obj.broken = true;
          state.broken += 1;
          addChaos(obj.id === "vase" ? 23 : 16, `${obj.name} becomes evidence-adjacent.`);
          addParticles(obj.x + obj.w / 2, obj.y + obj.h / 2, 20, obj.id === "vase" ? "#bbd5e4" : colors.gold, 2.8);
        }
      }
    }
  }

  function updateEffects(dt) {
    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].r += dt * 34;
      pulses[i].life -= dt;
      if (pulses[i].life <= 0) pulses.splice(i, 1);
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life -= dt;
      p.vy += 0.05;
      p.x += p.vx;
      p.y += p.vy;
      if (p.life <= 0) particles.splice(i, 1);
    }
    for (let i = floaters.length - 1; i >= 0; i--) {
      const f = floaters[i];
      f.life -= dt;
      f.y += f.vy;
      if (f.life <= 0) floaters.splice(i, 1);
    }
  }

  function maybeStartInterrogation() {
    if (solved || !state.evidence.note || !state.evidence.scent) return;
    if (player.x > 266) {
      solved = true;
      state.evidence.buster = true;
      updateHud();
      storyBeat("buster");
    } else if (player.x > 238) {
      setMessage("Pet door ahead. Buster is pacing by the garden gate.", 184, 82, colors.amber);
    }
  }

  function finish(won, chip, copy) {
    if (ended) return;
    ended = true;
    endChip.textContent = chip;
    endTitle.textContent = won ? "Sir Reginald is saved." : "The trail goes cold.";
    endCopy.textContent = `${copy} Security cam recap: ${state.swats} swats, ${state.broken} broken objects, ${Math.round(state.chaos)}% chaos.`;
    endPanel.classList.remove("hidden");
  }

  function updateHud() {
    const minutes = Math.max(0, Math.floor(state.time / 60));
    const seconds = Math.max(0, Math.floor(state.time % 60));
    clockEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    chaosText.textContent = `${Math.round(state.chaos)}%`;
    chaosBar.style.width = `${state.chaos}%`;
    detectiveName.textContent =
      activeCat === "barnaby"
        ? `Barnaby · ${senseOn ? "Scent active" : "Scent ready"}`
        : `Cleo · ${senseOn ? "Whiskers active" : "Whiskers ready"}`;
    senseCopy.textContent =
      activeCat === "barnaby"
        ? "Scent sight makes chemical trails glow. Use it near suspicious evidence."
        : "Whisker resonance reads notes and hollow spaces that Barnaby cannot understand.";
    [...evidenceList.children].forEach((item) => {
      item.classList.toggle("done", Boolean(state.evidence[item.dataset.key]));
    });
  }

  function draw() {
    ctx.imageSmoothingEnabled = false;
    ctx.save();
    if (sceneShake > 0) {
      ctx.translate(Math.round((Math.random() - 0.5) * sceneShake), Math.round((Math.random() - 0.5) * sceneShake));
    }
    drawRoom();
    if (senseOn) drawSenseLayer();
    drawFurniture();
    drawCurtain();
    drawObjects();
    drawClues();
    drawPlayer();
    drawEffects();
    drawDialogue();
    drawLightning();
    ctx.restore();
  }

  function fill(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
  }

  function drawRoom() {
    fill(0, 0, W, H, "#111018");
    for (let y = 0; y < GROUND; y += 6) {
      const tone = y % 12 === 0 ? "#17131d" : "#1c1620";
      fill(0, y, W, 6, tone);
    }
    fill(0, 126, W, 30, "#31201f");
    for (let x = 0; x < W; x += 22) {
      fill(x, 126, 2, 30, "#241515");
    }
    fill(0, GROUND, W, H - GROUND, "#201315");
    for (let x = -8; x < W; x += 32) {
      fill(x, GROUND + 5, 28, 2, "#4a2b22");
      fill(x + 2, GROUND + 16, 26, 2, "#5e3829");
    }

    drawWindow();
    drawRain();
    drawRug();
    drawCage();
    drawPetDoor();
  }

  function drawWindow() {
    fill(18, 18, 66, 45, "#07080e");
    fill(21, 21, 60, 39, "#142232");
    fill(47, 21, 3, 39, "#3b2b2a");
    fill(21, 39, 60, 3, "#3b2b2a");
    fill(24, 24, 18, 12, "#20425a");
    fill(53, 24, 24, 12, "#6f3a56");
    fill(24, 43, 24, 13, "#20425a");
    fill(53, 43, 24, 13, "#b07b34");
    fill(15, 63, 74, 5, "#36201e");
  }

  function drawLightning() {
    if (lightningFlash <= 0) return;
    ctx.globalAlpha = Math.min(0.72, lightningFlash);
    fill(0, 0, W, H, "#d9f2ff");
    ctx.globalAlpha = Math.min(1, lightningFlash + 0.25);
    ctx.strokeStyle = "#f6fdff";
    ctx.lineWidth = 2;
    const startX = 218 + lightningFork * 54;
    ctx.beginPath();
    ctx.moveTo(startX, 0);
    ctx.lineTo(startX - 11, 25);
    ctx.lineTo(startX + 5, 42);
    ctx.lineTo(startX - 8, 70);
    ctx.lineTo(startX + 11, 92);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#57b7e8";
    ctx.beginPath();
    ctx.moveTo(startX - 4, 36);
    ctx.lineTo(startX - 31, 60);
    ctx.lineTo(startX - 20, 77);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  function drawRain() {
    ctx.strokeStyle = "rgba(86, 177, 225, 0.32)";
    ctx.lineWidth = 1;
    for (const drop of rain) {
      drop.y += drop.s * 0.32;
      drop.x -= drop.s * 0.07;
      if (drop.y > H) drop.y = -8;
      if (drop.x < -4) drop.x = W + 4;
      ctx.beginPath();
      ctx.moveTo(Math.round(drop.x), Math.round(drop.y));
      ctx.lineTo(Math.round(drop.x - 3), Math.round(drop.y + 7));
      ctx.stroke();
    }
  }

  function drawRug() {
    fill(72, 136, 148, 16, "#5f2430");
    fill(78, 139, 136, 10, "#8d4630");
    fill(99, 142, 92, 4, "#cf9d4a");
    for (let x = 76; x < 218; x += 10) fill(x, 137, 4, 2, "#e7c36b");
  }

  function drawCage() {
    fill(154, 21, 3, 33, colors.gold);
    fill(139, 51, 34, 3, colors.gold);
    fill(138, 53, 36, 28, "#1d171c");
    for (let x = 143; x < 173; x += 6) fill(x, 55, 1, 24, colors.gold);
    fill(138, 78, 36, 3, colors.gold);
    fill(150, 49, 12, 4, colors.gold);
    if (!state.evidence.trail || senseOn) {
      fill(151, 67, 5, 3, "#dcd267");
      fill(158, 63, 5, 3, "#dcd267");
    }
  }

  function drawPetDoor() {
    fill(291, 119, 19, 31, "#0d0d12");
    fill(294, 123, 13, 27, "#2a1c1c");
    fill(297, 128, 7, 22, "#131116");
    if (state.evidence.note && state.evidence.scent) {
      fill(289, 115, 24, 4, colors.green);
      drawTinyBuster();
    }
  }

  function drawTinyBuster() {
    fill(284, 128, 18, 12, "#9b7b60");
    fill(278, 125, 10, 11, "#a98866");
    fill(279, 123, 4, 4, "#6b503f");
    fill(286, 124, 4, 4, "#6b503f");
    fill(281, 130, 2, 2, "#111018");
    fill(287, 130, 2, 2, "#111018");
    fill(275, 122, 4, 9, "#7f5e48");
  }

  function drawFurniture() {
    fill(72, 103, 102, 8, colors.wood);
    fill(79, 111, 8, 32, colors.woodDark);
    fill(153, 111, 8, 32, colors.woodDark);
    fill(81, 93, 78, 12, "#5d392d");
    fill(84, 88, 50, 6, "#7f4e36");
    fill(190, 104, 55, 7, "#4a2d25");
    fill(197, 58, 40, 48, "#332420");
    for (let y = 66; y <= 94; y += 13) fill(199, y, 36, 3, "#6b4230");
    fill(21, 78, 29, 68, "#2b1c1c");
    fill(26, 84, 19, 55, "#4a2d25");
    fill(31, 95, 4, 31, colors.gold);
    fill(30, 127, 8, 8, colors.gold);
    fill(109, 73, 26, 15, "#e3b45a");
    fill(113, 68, 18, 6, "#fff1ba");
    fill(116, 61, 12, 8, "#ffdf79");
    fill(114, 88, 20, 3, "#8f5c25");
  }

  function drawCurtain() {
    if (curtain.fallen) {
      fill(229, curtain.y + 36, 60, 10, "#702633");
      fill(239, curtain.y + 27, 45, 11, "#8d3040");
      fill(247, curtain.y + 20, 30, 9, "#5d1d2d");
      return;
    }
    fill(curtain.x - 3, 30, curtain.w + 6, 6, "#614326");
    for (let i = 0; i < 6; i++) {
      fill(curtain.x + i * 8, curtain.y, 5, curtain.h, i % 2 ? "#682637" : "#8b3042");
    }
    fill(curtain.x, curtain.y + curtain.h - 4, curtain.w, 4, "#4c1726");
    if (curtain.hp < 3) fill(curtain.x + 8, curtain.y + 18, 21, 4, "#170e14");
    if (curtain.hp < 2) fill(curtain.x + 21, curtain.y + 38, 17, 5, "#170e14");
  }

  function drawObjects() {
    for (const obj of objects) {
      if (obj.broken) {
        if (obj.id === "ink") drawInkSpill();
        continue;
      }
      if (obj.type === "bottle") {
        fill(obj.x + 3, obj.y, 5, 4, "#231833");
        fill(obj.x + 1, obj.y + 4, 9, 11, "#1a1426");
        fill(obj.x + 3, obj.y + 7, 5, 5, "#443463");
      }
      if (obj.type === "vase") {
        fill(obj.x + 4, obj.y, 5, 4, "#cce5f1");
        fill(obj.x + 1, obj.y + 4, 11, 13, "#9fc5d6");
        fill(obj.x + 3, obj.y + 17, 7, 3, "#d7edf5");
        fill(obj.x + 5, obj.y + 7, 3, 8, "#ecfbff");
      }
      if (obj.type === "pendulum") {
        fill(obj.x + 4, obj.y, 2, 25, colors.gold);
        fill(obj.x, obj.y + 24, 9, 12, "#bd8431");
      }
      if (obj.type === "book") {
        fill(obj.x, obj.y, obj.w, obj.h, obj.id === "book1" ? "#315170" : "#6d3642");
        fill(obj.x + 2, obj.y + 1, obj.w - 4, 1, "#d7c6a6");
      }
    }
    if (state.evidence.floor) drawInkSpill();
  }

  function drawInkSpill() {
    fill(132, 144, 48, 5, "#09080d");
    fill(142, 138, 29, 7, "#111018");
    fill(151, 132, 9, 10, "#191622");
    fill(138, 149, 42, 2, "#403847");
  }

  function drawClues() {
    if ((senseOn && activeCat === "barnaby") || state.evidence.trail) {
      const glow = senseOn && activeCat === "barnaby" ? colors.green : "rgba(104, 212, 119, 0.7)";
      fill(165, 62, 4, 3, glow);
      fill(182, 58, 5, 3, glow);
      fill(199, 54, 4, 3, glow);
      fill(218, 49, 5, 3, glow);
      fill(238, 47, 4, 3, glow);
      fill(259, 44, 5, 3, glow);
    }
    if (state.evidence.floor) {
      fill(147, 139, 21, 3, colors.amber);
      fill(153, 134, 9, 5, "#d0bf90");
      if (senseOn && activeCat === "cleo") {
        ctx.strokeStyle = colors.amber;
        ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          ctx.arc(156, 137, 12 + i * 8 + Math.sin(performance.now() / 160) * 2, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    }
    if (state.evidence.scent) {
      fill(142, 130, 6, 4, colors.violet);
      fill(151, 127, 4, 4, colors.violet);
      fill(160, 130, 5, 4, colors.violet);
    }
  }

  function drawSenseLayer() {
    const color = activeCat === "barnaby" ? "rgba(22, 52, 78, 0.48)" : "rgba(71, 43, 17, 0.42)";
    fill(0, 0, W, H, color);
    if (activeCat === "barnaby") {
      for (let i = 0; i < 8; i++) {
        const x = 42 + i * 27 + Math.sin(performance.now() / 220 + i) * 3;
        const y = 119 - (i % 3) * 14;
        fill(x, y, 5, 3, i % 2 ? colors.green : colors.violet);
      }
    } else {
      ctx.strokeStyle = "rgba(240, 174, 72, 0.72)";
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(player.x + player.w / 2, player.y + 10, 17 + i * 8 + sensePulse * 7, -0.4, 0.4);
        ctx.stroke();
      }
    }
  }

  function drawPlayer() {
    if (activeCat === "barnaby") {
      drawBarnaby(player.x, player.y, player.facing, swatCooldown > 0);
    } else {
      drawCleo(player.x, player.y + 1, player.facing, swatCooldown > 0);
    }
  }

  function drawBarnaby(x, y, facing, pawOut) {
    const bob = player.onGround ? Math.sin(player.step * 11) * 1 : 0;
    const fx = facing < 0 ? -1 : 1;
    const px = (dx) => x + (fx < 0 ? player.w - dx : dx);
    fill(px(4), y + 7 + bob, 18, 13, colors.cream2);
    fill(px(1), y + 10 + bob, 7, 8, colors.cream);
    fill(px(18), y + 11 + bob, 8, 7, colors.cream);
    fill(px(6), y + 2 + bob, 15, 12, colors.cream);
    fill(px(7), y - 2 + bob, 5, 7, colors.cream2);
    fill(px(16), y - 2 + bob, 5, 7, colors.cream2);
    fill(px(9), y + 3 + bob, 10, 9, colors.mask);
    fill(px(12), y + 1 + bob, 4, 12, colors.maskDark);
    fill(px(8), y + 7 + bob, 4, 4, colors.blue);
    fill(px(17), y + 7 + bob, 4, 4, colors.blue);
    fill(px(9), y + 8 + bob, 1, 1, "#e9fbff");
    fill(px(18), y + 8 + bob, 1, 1, "#e9fbff");
    fill(px(13), y + 11 + bob, 4, 3, "#c98686");
    fill(px(3), y + 15 + bob, 19, 7, "#a07037");
    fill(px(1), y + 18 + bob, 5, 3, "#5b371e");
    fill(px(18), y + 18 + bob, 5, 3, "#5b371e");
    fill(px(0), y + 12 + bob, 3, 9, colors.cream);
    if (pawOut) fill(px(22), y + 13 + bob, 9 * fx, 4, colors.cream);
    fill(px(2), y + 18 + bob, 3, 6, colors.cream);
    fill(px(17), y + 18 + bob, 3, 6, colors.cream);
    fill(px(-4), y + 9 + bob, 8, 4, colors.cream2);
  }

  function drawCleo(x, y, facing, pawOut) {
    const bob = player.onGround ? Math.sin(player.step * 12) * 1 : 0;
    const fx = facing < 0 ? -1 : 1;
    const px = (dx) => x + (fx < 0 ? player.w - dx : dx);
    fill(px(5), y + 9 + bob, 17, 11, "#d2bd91");
    fill(px(9), y + 3 + bob, 13, 10, "#e5d3a4");
    fill(px(10), y, 4, 5, "#cf7135");
    fill(px(19), y, 4, 5, "#2a2020");
    fill(px(15), y + 4 + bob, 5, 7, "#2a2020");
    fill(px(12), y + 7 + bob, 3, 3, colors.amber);
    fill(px(20), y + 7 + bob, 3, 3, colors.amber);
    fill(px(16), y + 11 + bob, 3, 2, "#9b6970");
    fill(px(8), y + 1 + bob, 15, 3, "#2a2020");
    fill(px(11), y - 2 + bob, 10, 3, "#2a2020");
    fill(px(1), y + 12 + bob, 5, 7, "#d2bd91");
    if (pawOut) fill(px(21), y + 14 + bob, 9 * fx, 4, "#e5d3a4");
    fill(px(4), y + 18 + bob, 3, 5, "#e5d3a4");
    fill(px(18), y + 18 + bob, 3, 5, "#2a2020");
    fill(px(-4), y + 12 + bob, 8, 3, "#cf7135");
  }

  function drawEffects() {
    for (const p of particles) {
      fill(p.x, p.y, 2, 2, p.color);
    }
    for (const pulseItem of pulses) {
      ctx.strokeStyle = pulseItem.color;
      ctx.globalAlpha = Math.max(0, pulseItem.life);
      ctx.beginPath();
      ctx.arc(pulseItem.x, pulseItem.y, pulseItem.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
    for (const f of floaters) {
      ctx.globalAlpha = clamp(f.life, 0, 1);
      drawPixelText(f.text, f.x, f.y, f.color, 80);
      ctx.globalAlpha = 1;
    }
  }

  function drawDialogue() {
    fill(8, 8, 185, 24, "rgba(8, 8, 11, 0.78)");
    fill(8, 31, 185, 1, colors.amber);
    drawPixelText(state.message, 12, 15, colors.paper, 168);
  }

  function drawPixelText(text, x, y, color, maxWidth = 120) {
    ctx.font = "6px monospace";
    ctx.fillStyle = color;
    const words = text.split(" ");
    let line = "";
    let yy = y;
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, Math.round(x), Math.round(yy));
        line = word;
        yy += 8;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, Math.round(x), Math.round(yy));
  }

  function drawPortrait() {
    pctx.imageSmoothingEnabled = false;
    pctx.fillStyle = "#111018";
    pctx.fillRect(0, 0, 96, 96);
    pctx.fillStyle = "#2b1d22";
    pctx.fillRect(0, 68, 96, 28);
    pctx.fillStyle = "#efe6d2";
    pctx.fillRect(17, 31, 62, 41);
    pctx.fillRect(12, 44, 72, 35);
    pctx.fillStyle = "#d5c5a8";
    pctx.fillRect(18, 18, 16, 25);
    pctx.fillRect(62, 18, 16, 25);
    pctx.fillStyle = "#bda98d";
    pctx.fillRect(22, 23, 8, 18);
    pctx.fillRect(66, 23, 8, 18);
    pctx.fillStyle = "#756d66";
    pctx.fillRect(37, 28, 22, 27);
    pctx.fillStyle = "#4f4945";
    pctx.fillRect(45, 24, 8, 34);
    pctx.fillRect(31, 50, 16, 8);
    pctx.fillRect(55, 50, 16, 8);
    pctx.fillStyle = "#57b7e8";
    pctx.fillRect(29, 42, 14, 14);
    pctx.fillRect(55, 42, 14, 14);
    pctx.fillStyle = "#121016";
    pctx.fillRect(34, 45, 6, 9);
    pctx.fillRect(60, 45, 6, 9);
    pctx.fillStyle = "#ffffff";
    pctx.fillRect(32, 43, 3, 3);
    pctx.fillRect(58, 43, 3, 3);
    pctx.fillStyle = "#d39491";
    pctx.fillRect(45, 59, 8, 6);
    pctx.fillStyle = "#f6efe2";
    pctx.fillRect(25, 72, 48, 15);
    pctx.fillRect(13, 78, 69, 9);
    pctx.fillStyle = "#a07037";
    pctx.fillRect(18, 72, 60, 10);
    pctx.fillStyle = "#5b371e";
    pctx.fillRect(18, 80, 60, 4);
  }

  function loop(time) {
    const dt = Math.min(0.033, (time - lastTime) / 1000 || 0);
    lastTime = time;
    update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  document.addEventListener("keydown", (event) => {
    if (["ArrowLeft", "ArrowRight", "ArrowUp", " ", "Tab"].includes(event.key)) {
      event.preventDefault();
    }
    if (cutsceneActive && !event.repeat) {
      if (event.key === "Enter" || event.key === " ") advanceCutscene();
      if (event.key === "Escape") endCutscene();
      return;
    }
    keys.add(event.key);
    if ((event.key === " " || event.key === "w" || event.key === "W" || event.key === "ArrowUp") && !event.repeat) jump();
    if ((event.key === "f" || event.key === "F" || event.key === "x" || event.key === "X") && !event.repeat) swat();
    if ((event.key === "e" || event.key === "E") && !event.repeat) toggleSense();
    if (event.key === "Tab" && !event.repeat) switchCat();
  });

  document.addEventListener("keyup", (event) => {
    keys.delete(event.key);
  });

  document.querySelectorAll("[data-hold]").forEach((button) => {
    const key = button.dataset.hold === "left" ? "ArrowLeft" : "ArrowRight";
    const down = (event) => {
      event.preventDefault();
      keys.add(key);
    };
    const up = (event) => {
      event.preventDefault();
      keys.delete(key);
    };
    button.addEventListener("pointerdown", down);
    button.addEventListener("pointerup", up);
    button.addEventListener("pointercancel", up);
    button.addEventListener("pointerleave", up);
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (action === "jump") jump();
      if (action === "swat") swat();
      if (action === "sense") toggleSense();
      if (action === "switch") switchCat();
    });
  });

  startButton.addEventListener("click", () => {
    startPanel.classList.add("hidden");
    beginCutscene(INTRO_SCENES, resetGame);
  });
  restartButton.addEventListener("click", () => {
    endPanel.classList.add("hidden");
    beginCutscene(INTRO_SCENES, resetGame);
  });
  nextCutsceneButton.addEventListener("click", advanceCutscene);
  skipCutsceneButton.addEventListener("click", endCutscene);

  resetObjects();
  drawPortrait();
  updateHud();
  requestAnimationFrame(loop);
})();
