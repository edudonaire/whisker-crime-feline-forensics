(() => {
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const screenWrap = canvas.closest(".screen-wrap");
  const portrait = document.getElementById("portrait");
  const pctx = portrait.getContext("2d");

  const startPanel = document.getElementById("startPanel");
  const onlineButton = document.getElementById("onlineButton");
  const onlineLobby = document.getElementById("onlineLobby");
  const playerNameInput = document.getElementById("playerNameInput");
  const roomCodeInput = document.getElementById("roomCodeInput");
  const createRoomButton = document.getElementById("createRoomButton");
  const joinRoomButton = document.getElementById("joinRoomButton");
  const lobbyStatus = document.getElementById("lobbyStatus");
  const startButton = document.getElementById("startButton");
  const multiplayerButton = document.getElementById("multiplayerButton");
  const endPanel = document.getElementById("endPanel");
  const endChip = document.getElementById("endChip");
  const endTitle = document.getElementById("endTitle");
  const endCopy = document.getElementById("endCopy");
  const endStats = document.getElementById("endStats");
  const caseGradeLetter = document.getElementById("caseGradeLetter");
  const caseGradeCopy = document.getElementById("caseGradeCopy");
  const pausePanel = document.getElementById("pausePanel");
  const resumeButton = document.getElementById("resumeButton");
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
  const caseProgressLabel = document.getElementById("caseProgressLabel");
  const caseProgress = document.getElementById("caseProgress");
  const whodunitPanel = document.getElementById("whodunitPanel");
  const mysterySeed = document.getElementById("mysterySeed");
  const whodunitStatus = document.getElementById("whodunitStatus");
  const suspectGrid = document.getElementById("suspectGrid");
  const accuseButtons = document.getElementById("accuseButtons");
  const onlinePanel = document.getElementById("onlinePanel");
  const onlineRoomCode = document.getElementById("onlineRoomCode");
  const onlineStatus = document.getElementById("onlineStatus");
  const roomReadiness = document.getElementById("roomReadiness");
  const onlinePlayers = document.getElementById("onlinePlayers");
  const copyInviteButton = document.getElementById("copyInviteButton");
  const clueToast = document.getElementById("clueToast");
  const clueToastTitle = document.getElementById("clueToastTitle");
  const clueToastCopy = document.getElementById("clueToastCopy");
  const languageSelect = document.getElementById("languageSelect");
  const languageLabel = document.getElementById("languageLabel");

  const LANGUAGES = {
    en: {
      name: "Language", online: "Online Whodunit", story: "Story Case", local: "Local Co-op",
      detective: "Detective name", room: "Room code", create: "Create Room", join: "Join Code",
      invite: "Copy Invite Link", lead: "Lead detective", chaos: "Chaos", whodunit: "Whodunit",
      onlineRoom: "Online room", next: "Next", skip: "Skip", replay: "Replay Case", jump: "Jump", paw: "Paw", sense: "Sense", cat: "Cat", solo: "Solo switch", language: "Language",
      episode: "Episode 01 · Storm over Milkglass Manor", startTitle: "The bird knew too much.",
      startCopy: "Sir Reginald sang one forbidden name, then vanished before dawn. Create a live room, share the code, and solve a synchronized whodunit from any phone or laptop.",
      lobby: "First two players control Barnaby and Cleo. Extra players join the clue board and accusation vote.",
      bio: "Blue eyes, cream fur, gray mask, tiny trench coat. Excellent at finding evidence. Terrible at respecting heirlooms.",
      caseProgress: "Case progress",
      labels: { trail: "Find the canary trail", floor: "Expose the floorboard compartment", note: "Read the hidden note", scent: "Identify the peanut-butter scent", buster: "Crack Buster's story" },
    },
    es: {
      name: "Idioma", online: "Misterio en linea", story: "Caso de historia", local: "Cooperativo local", detective: "Nombre del detective", room: "Codigo de sala", create: "Crear sala", join: "Unirse con codigo", invite: "Copiar enlace", lead: "Detective principal", chaos: "Caos", whodunit: "Quien lo hizo", onlineRoom: "Sala en linea", next: "Siguiente", skip: "Saltar", replay: "Repetir caso", jump: "Saltar", paw: "Zarpa", sense: "Olfato", cat: "Gato", solo: "Cambiar en solitario", language: "Idioma", episode: "Episodio 01 · Tormenta sobre Milkglass Manor", startTitle: "El pajaro sabia demasiado.", startCopy: "Sir Reginald canto un nombre prohibido y desaparecio antes del amanecer. Crea una sala, comparte el codigo y resuelve el misterio desde cualquier telefono u ordenador.", lobby: "Los dos primeros jugadores controlan a Barnaby y Cleo. Los demas se unen al tablero de pistas y la votacion.", bio: "Ojos azules, pelaje crema, mascara gris y una gabardina diminuta. Excelente encontrando pruebas. Pesimo respetando reliquias.", labels: { trail: "Encuentra el rastro del canario", floor: "Revela el compartimento del suelo", note: "Lee la nota oculta", scent: "Identifica el olor a crema de cacahuete", buster: "Descubre la historia de Buster" },
    },
    "pt-BR": {
      name: "Idioma", online: "Misterio online", story: "Caso da historia", local: "Co-op local", detective: "Nome do detetive", room: "Codigo da sala", create: "Criar sala", join: "Entrar com codigo", invite: "Copiar convite", lead: "Detetive principal", chaos: "Caos", whodunit: "Quem fez isso", onlineRoom: "Sala online", next: "Proximo", skip: "Pular", replay: "Jogar de novo", jump: "Pular", paw: "Pata", sense: "Sentido", cat: "Gato", solo: "Trocar no solo", language: "Idioma", episode: "Episodio 01 · Tempestade na Mansao Milkglass", startTitle: "O passaro sabia demais.", startCopy: "Sir Reginald cantou um nome proibido e sumiu antes do amanhecer. Crie uma sala, compartilhe o codigo e resolva o misterio sincronizado de qualquer celular ou notebook.", lobby: "Os dois primeiros jogadores controlam Barnaby e Cleo. Os demais entram no quadro de pistas e na votacao.", bio: "Olhos azuis, pelo creme, mascara cinza e um sobretudo minusculo. Otimo para achar provas. Terrivel com herancas.", labels: { trail: "Encontre a trilha do canario", floor: "Revele o compartimento do assoalho", note: "Leia a nota escondida", scent: "Identifique o cheiro de pasta de amendoim", buster: "Desvende a historia de Buster" },
    },
    fr: {
      name: "Langue", online: "Mystere en ligne", story: "Affaire solo", local: "Co-op local", detective: "Nom du detective", room: "Code de salle", create: "Creer une salle", join: "Rejoindre", invite: "Copier le lien", lead: "Detective principal", chaos: "Chaos", whodunit: "Coupable", onlineRoom: "Salle en ligne", next: "Suivant", skip: "Passer", replay: "Rejouer", jump: "Sauter", paw: "Patte", sense: "Sens", cat: "Chat", solo: "Changer de chat", language: "Langue", episode: "Episode 01 · Orage sur le manoir Milkglass", startTitle: "L'oiseau en savait trop.", startCopy: "Sir Reginald a chante un nom interdit, puis a disparu avant l'aube. Creez une salle, partagez le code et resolvez l'enquete depuis n'importe quel appareil.", lobby: "Les deux premiers joueurs controlent Barnaby et Cleo. Les autres rejoignent le tableau des indices et le vote.", bio: "Yeux bleus, fourrure creme, masque gris et petit trench. Excellent pour trouver des preuves. Terrible avec les antiquites.", labels: { trail: "Trouver la piste du canari", floor: "Reveler le compartiment du plancher", note: "Lire la note cachee", scent: "Identifier l'odeur de beurre de cacahuete", buster: "Percer le secret de Buster" },
    },
    de: {
      name: "Sprache", online: "Online-Krimi", story: "Story-Fall", local: "Lokaler Koop", detective: "Name des Detektivs", room: "Raumcode", create: "Raum erstellen", join: "Code beitreten", invite: "Einladung kopieren", lead: "Chefdetektiv", chaos: "Chaos", whodunit: "Wer war es", onlineRoom: "Online-Raum", next: "Weiter", skip: "Uberspringen", replay: "Fall wiederholen", jump: "Springen", paw: "Pfote", sense: "Spur", cat: "Katze", solo: "Katze wechseln", language: "Sprache", episode: "Episode 01 · Sturm uber Milkglass Manor", startTitle: "Der Vogel wusste zu viel.", startCopy: "Sir Reginald sang einen verbotenen Namen und verschwand vor dem Morgengrauen. Erstellt einen Raum, teilt den Code und lost den synchronen Krimi auf jedem Gerat.", lobby: "Die ersten zwei Spieler steuern Barnaby und Cleo. Weitere Spieler helfen am Hinweisbrett und bei der Abstimmung.", bio: "Blaue Augen, cremefarbenes Fell, graue Maske, kleiner Trenchcoat. Findet Beweise hervorragend. Respektiert Erbstucke schlecht.", labels: { trail: "Die Kanarienvogelspur finden", floor: "Das Bodenfach aufdecken", note: "Die versteckte Notiz lesen", scent: "Den Erdnussbuttergeruch erkennen", buster: "Busters Geschichte knacken" },
    },
    it: {
      name: "Lingua", online: "Mistero online", story: "Caso narrativo", local: "Co-op locale", detective: "Nome del detective", room: "Codice stanza", create: "Crea stanza", join: "Unisciti col codice", invite: "Copia invito", lead: "Detective capo", chaos: "Caos", whodunit: "Chi e stato", onlineRoom: "Stanza online", next: "Avanti", skip: "Salta", replay: "Rigioca il caso", jump: "Salto", paw: "Zampa", sense: "Fiuto", cat: "Gatto", solo: "Cambia gatto", language: "Lingua", episode: "Episodio 01 · Tempesta a Milkglass Manor", startTitle: "L'uccello ne sapeva troppo.", startCopy: "Sir Reginald ha cantato un nome proibito, poi e sparito prima dell'alba. Crea una stanza, condividi il codice e risolvi il mistero da qualsiasi dispositivo.", lobby: "I primi due giocatori controllano Barnaby e Cleo. Gli altri si uniscono alla bacheca degli indizi e al voto.", bio: "Occhi blu, pelo color crema, maschera grigia e piccolo impermeabile. Ottimo con le prove. Terribile con i cimeli.", labels: { trail: "Trova la pista del canarino", floor: "Scopri il vano nel pavimento", note: "Leggi la nota nascosta", scent: "Riconosci l'odore di burro d'arachidi", buster: "Smaschera la storia di Buster" },
    },
    ja: {
      name: "言語", online: "オンライン推理", story: "ストーリー事件", local: "ローカル協力", detective: "探偵の名前", room: "ルームコード", create: "ルームを作成", join: "コードで参加", invite: "招待リンクをコピー", lead: "名探偵", chaos: "混乱", whodunit: "犯人は誰", onlineRoom: "オンラインルーム", next: "次へ", skip: "スキップ", replay: "事件を再捜査", jump: "ジャンプ", paw: "ひっかく", sense: "感知", cat: "猫を交代", solo: "ソロ交代", language: "言語", episode: "エピソード01 · ミルクグラス邸の嵐", startTitle: "鳥は知りすぎていた。", startCopy: "サー・レジナルドは禁じられた名前を歌い、夜明け前に消えた。ルームを作り、コードを共有して、どの端末からでも同期した謎を解こう。", lobby: "最初の2人はバーナビーとクレオを操作します。追加のプレイヤーは手がかりボードと投票に参加します。", bio: "青い目、クリーム色の毛、灰色のマスク、小さなトレンチコート。証拠探しは得意。家宝の扱いは苦手。", labels: { trail: "カナリアの足跡を探す", floor: "床板の隠し部屋を暴く", note: "隠しメモを読む", scent: "ピーナッツバターの匂いを特定", buster: "バスターの話を崩す" },
    },
  };

  let language = localStorage.getItem("whiskerLanguage") || "en";
  const locale = () => LANGUAGES[language] || LANGUAGES.en;
  const tr = (key) => locale()[key] || LANGUAGES.en[key] || key;

  function applyLanguage() {
    const current = locale();
    document.documentElement.lang = language;
    languageSelect.value = language;
    languageLabel.textContent = current.language;
    languageSelect.setAttribute("aria-label", current.language);
    const text = {
      onlineButton, startButton, multiplayerButton, createRoomButton, joinRoomButton,
      copyInviteButton, restartButton, nextCutsceneButton, skipCutsceneButton,
      languageLabel,
    };
    text.onlineButton.textContent = current.online;
    text.startButton.textContent = current.story;
    text.multiplayerButton.textContent = current.local;
    text.createRoomButton.textContent = current.create;
    text.joinRoomButton.textContent = current.join;
    text.copyInviteButton.textContent = current.invite;
    text.restartButton.textContent = current.replay;
    text.nextCutsceneButton.textContent = current.next;
    text.skipCutsceneButton.textContent = current.skip;
    document.getElementById("episodeChip").textContent = current.episode;
    document.getElementById("startTitle").textContent = current.startTitle;
    document.getElementById("startCopy").textContent = current.startCopy;
    const subtitles = {
      en: "The Case of the Vanishing Canary",
      es: "El caso del canario desaparecido",
      "pt-BR": "O caso do canario desaparecido",
      fr: "L'affaire du canari disparu",
      de: "Der Fall des verschwundenen Kanarienvogels",
      it: "Il caso del canarino scomparso",
      ja: "消えたカナリア事件",
    };
    document.getElementById("brandSubtitle").textContent = subtitles[language] || subtitles.en;
    document.title = `Whisker & Crime: ${subtitles[language] || subtitles.en}`;
    document.getElementById("detectiveLabel").textContent = current.detective;
    document.getElementById("roomCodeLabel").textContent = current.room;
    document.getElementById("leadDetectiveLabel").textContent = current.lead;
    document.getElementById("detectiveBio").textContent = current.bio;
    const meta = {
      en: ["1–8 players", "4–5 min case", "7 languages"],
      es: ["1–8 jugadores", "Caso de 4–5 min", "7 idiomas"],
      "pt-BR": ["1–8 jogadores", "Caso de 4–5 min", "7 idiomas"],
      fr: ["1–8 joueurs", "Affaire de 4–5 min", "7 langues"],
      de: ["1–8 Spieler", "4–5 Min. Fall", "7 Sprachen"],
      it: ["1–8 giocatori", "Caso da 4–5 min", "7 lingue"],
      ja: ["1–8人", "4–5分の事件", "7言語"],
    }[language] || ["1–8 players", "4–5 min case", "7 languages"];
    document.getElementById("playersMeta").textContent = meta[0];
    document.getElementById("durationMeta").textContent = meta[1];
    document.getElementById("languagesMeta").textContent = meta[2];
    document.getElementById("chaosLabel").textContent = current.chaos;
    document.getElementById("whodunitLabel").textContent = current.whodunit;
    document.getElementById("onlineRoomLabel").textContent = current.onlineRoom;
    caseProgressLabel.textContent = current.caseProgress || LANGUAGES.en.caseProgress;
    document.getElementById("onlineKeysLabel").firstChild.textContent = `${current.online} `;
    document.getElementById("p1KeysLabel").firstChild.textContent = "P1 ";
    document.getElementById("p2KeysLabel").firstChild.textContent = "P2 ";
    document.getElementById("soloKeysLabel").firstChild.textContent = `${current.solo} `;
    document.querySelector('[data-action="jump"]').textContent = current.jump;
    document.querySelector('[data-action="swat"]').textContent = current.paw;
    document.querySelector('[data-action="sense"]').textContent = current.sense;
    document.querySelector('[data-action="switch"]').textContent = current.cat;
    document.getElementById("lobbyStatus").textContent = current.lobby;
    setEvidenceLabels(current.labels);
    updateHud();
  }

  const W = 480;
  const VIEW_W = 320;
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
  let gameMode = "story";
  let started = false;
  let ended = false;
  let paused = false;
  let activeCat = "barnaby";
  let senseOn = false;
  let barnabySense = false;
  let cleoSense = false;
  let swatCooldown = 0;
  let cleoSwatCooldown = 0;
  let sensePulse = 0;
  let sceneShake = 0;
  let lightningFlash = 0;
  let lightningTimer = 0.8;
  let lightningFork = 0.5;
  let solved = false;
  let cutsceneActive = false;
  let clueToastTimer = null;
  let cutsceneQueue = [];
  let cutsceneIndex = 0;
  let cutsceneDone = null;
  let currentMystery = null;
  let audioContext = null;
  let cameraX = 0;

  function playTone(frequency, duration = 0.08, type = "square", volume = 0.025) {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch {
      audioContext = null;
    }
  }

  const online = {
    enabled: false,
    roomCode: "",
    playerId: "",
    role: "",
    slot: 0,
    syncing: false,
    pollTimer: null,
    lastStateAt: 0,
    input: {
      left: false,
      right: false,
    },
    pendingActions: [],
  };

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

  const INTRO_SCENES_LOCALIZED = {
    es: [
      { kicker: "Apertura", title: "El pajaro sabia demasiado.", copy: "A las 3:07 AM, Sir Reginald canto un nombre prohibido bajo la tormenta. Al amanecer, la jaula dorada estaba vacia y todos en la mansion Milkglass mentian fatal.", objective: "Encuentra el primer rastro antes de que despierte la casa." },
      { kicker: "Rayos sobre el estudio", title: "Entra Barnaby.", copy: "Ojos azules. Pelaje crema. Mascara gris. Un abrigo dos tallas demasiado dramatico. Barnaby no pide permiso: le pide cuentas a la gravedad.", objective: "Muevete, salta, golpea y deja que la sala confiese." },
      { kicker: "Pareja de detectives", title: "Cleo escucha parpadear las paredes.", copy: "Barnaby huele lo que los humanos esconden. Cleo escucha lo que la madera recuerda. Cambia entre ellos cuando las pistas hablen idiomas distintos.", objective: "Usa el olfato y los bigotes para resolver el caso.", cta: "Jugar" },
    ],
    "pt-BR": [
      { kicker: "Abertura", title: "O passaro sabia demais.", copy: "As 3:07 da madrugada, Sir Reginald cantou um nome proibido na tempestade. Ao amanhecer, a gaiola dourada balancava vazia e todos na Mansao Milkglass mentiam muito mal.", objective: "Encontre a primeira trilha antes que a casa acorde." },
      { kicker: "Raios sobre o escritorio", title: "Entre, Barnaby.", copy: "Olhos azuis. Pelo creme. Mascara cinza. Um sobretudo dramatico demais. Barnaby nao pede permissao. Barnaby desafia a gravidade.", objective: "Ande, pule, use a pata e deixe a sala confessar." },
      { kicker: "Dupla de investigadores", title: "Cleo ouve as paredes piscarem.", copy: "Barnaby sente o que os humanos escondem. Cleo ouve o que a madeira lembra. Troque entre eles quando as pistas falarem linguas diferentes.", objective: "Use o olfato e os bigodes para desvendar o caso.", cta: "Jogar" },
    ],
    fr: [
      { kicker: "Ouverture", title: "L'oiseau en savait trop.", copy: "A 3 h 07, Sir Reginald a chante un nom interdit dans l'orage. Au petit matin, la cage doree etait vide et tout le monde au manoir Milkglass mentait tres mal.", objective: "Trouver la premiere piste avant le reveil de la maison." },
      { kicker: "Eclairs sur le bureau", title: "Entrez, Barnaby.", copy: "Yeux bleus. Fourrure creme. Masque gris. Un trench deux fois trop dramatique. Barnaby ne demande pas la permission: il defie la gravite.", objective: "Bougez, sautez, frappez et laissez la piece avouer." },
      { kicker: "Duo d'enqueteurs", title: "Cleo entend les murs cligner.", copy: "Barnaby sent ce que les humains cachent. Cleo entend ce dont le bois se souvient. Changez de chat quand les indices changent de langage.", objective: "Utilisez le flair et les moustaches pour resoudre l'affaire.", cta: "Jouer" },
    ],
    de: [
      { kicker: "Vorspann", title: "Der Vogel wusste zu viel.", copy: "Um 3:07 Uhr sang Sir Reginald einen verbotenen Namen in den Sturm. Zum Fruehstueck schwang der goldene Kaefig leer und jeder im Milkglass Manor log miserabel.", objective: "Finde die erste Spur, bevor das Haus erwacht." },
      { kicker: "Blitze ueber dem Arbeitszimmer", title: "Auftritt Barnaby.", copy: "Blaue Augen. Cremefarbenes Fell. Graue Maske. Ein Trenchcoat, der viel zu dramatisch ist. Barnaby fragt nicht um Erlaubnis. Barnaby fragt die Schwerkraft.", objective: "Bewege dich, springe, schlage zu und lass den Raum gestehen." },
      { kicker: "Ermittlerduo", title: "Cleo hoert die Waende blinzeln.", copy: "Barnaby riecht, was Menschen verbergen. Cleo hoert, woran Holz sich erinnert. Wechsle zwischen ihnen, wenn die Hinweise verschiedene Sprachen sprechen.", objective: "Nutze Geruch und Schnurrhaare, um den Fall zu loesen.", cta: "Spielen" },
    ],
    it: [
      { kicker: "Apertura", title: "L'uccello ne sapeva troppo.", copy: "Alle 3:07, Sir Reginald ha cantato un nome proibito nella tempesta. A colazione, la gabbia dorata oscillava vuota e tutti a Milkglass Manor mentivano malissimo.", objective: "Trova la prima traccia prima che la casa si svegli." },
      { kicker: "Fulmini sullo studio", title: "Entra Barnaby.", copy: "Occhi blu. Pelo crema. Maschera grigia. Un impermeabile fin troppo teatrale. Barnaby non chiede permesso. Barnaby sfida la gravita.", objective: "Muoviti, salta, colpisci e lascia che la stanza confessi." },
      { kicker: "Coppia di investigatori", title: "Cleo sente le pareti sbattere le palpebre.", copy: "Barnaby fiuta cio che gli umani nascondono. Cleo sente cio che il legno ricorda. Passa dall'uno all'altra quando gli indizi cambiano lingua.", objective: "Usa fiuto e baffi per risolvere il caso.", cta: "Gioca" },
    ],
    ja: [
      { kicker: "オープニング", title: "鳥は知りすぎていた。", copy: "午前3時07分、サー・レジナルドは嵐の中で禁じられた名前を歌った。朝になると金の鳥かごは空っぽで、ミルクグラス邸の全員が下手な嘘をついていた。", objective: "屋敷が目を覚ます前に最初の足跡を見つけよう。" },
      { kicker: "書斎に走る稲妻", title: "バーナビー登場。", copy: "青い目。クリーム色の毛。灰色のマスク。大げさすぎるトレンチコート。バーナビーは許可を求めない。重力に挑む。", objective: "動いて、跳んで、ひっかいて、部屋に告白させよう。" },
      { kicker: "謎解きの相棒", title: "クレオは壁のまばたきを聞く。", copy: "バーナビーは人間が隠すものを嗅ぐ。クレオは木が覚えているものを聞く。手がかりが違う言葉を話し始めたら交代しよう。", objective: "感知とひげの力で事件を解決しよう。", cta: "プレイ" },
    ],
  };

  function localizedIntroScenes() {
    return INTRO_SCENES_LOCALIZED[language] || INTRO_SCENES;
  }

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

  const STORY_LABELS = {
    trail: "Find the canary trail",
    floor: "Expose the floorboard compartment",
    note: "Read the hidden note",
    scent: "Identify the peanut-butter scent",
    buster: "Crack Buster's story",
  };

  const MULTI_LABELS = {
    trail: "P1 scent: track the feather trail",
    floor: "Break the room open for a hidden compartment",
    note: "P2 whiskers: read the secret note",
    scent: "P1 scent: match the culprit's odor",
    buster: "Vote together and accuse the culprit",
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

  const player2 = {
    x: 64,
    y: GROUND - 22,
    vx: 0,
    vy: 0,
    w: 24,
    h: 21,
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
    x: 350,
    y: 33,
    w: 45,
    h: 86,
    hp: 3,
    falling: false,
    fallen: false,
    vy: 0,
  };

  function setEvidenceLabels(labels) {
    [...evidenceList.children].forEach((item) => {
      item.textContent = labels[item.dataset.key] || item.textContent;
    });
  }

  function stopOnline(clearUrl = true) {
    online.enabled = false;
    online.roomCode = "";
    online.playerId = "";
    online.role = "";
    online.slot = 0;
    online.input.left = false;
    online.input.right = false;
    online.pendingActions.length = 0;
    if (online.pollTimer) {
      clearInterval(online.pollTimer);
      online.pollTimer = null;
    }
    onlinePanel.classList.add("hidden");
    if (clearUrl) {
      const url = new URL(window.location.href);
      url.searchParams.delete("room");
      window.history.replaceState({}, "", url);
    }
  }

  function resetGame() {
    stopOnline();
    paused = false;
    pausePanel.classList.add("hidden");
    gameMode = "story";
    started = true;
    ended = false;
    activeCat = "barnaby";
    senseOn = false;
    barnabySense = false;
    cleoSense = false;
    swatCooldown = 0;
    cleoSwatCooldown = 0;
    sensePulse = 0;
    sceneShake = 0;
    lightningFlash = 0.45;
    lightningTimer = 1.2;
    solved = false;
    currentMystery = null;
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
    Object.assign(player2, {
      x: 64,
      y: GROUND - 22,
      vx: 0,
      vy: 0,
      facing: 1,
      onGround: false,
      step: 0,
    });
    Object.assign(curtain, {
      x: 350,
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
    whodunitPanel.classList.add("hidden");
    setEvidenceLabels(STORY_LABELS);
    updateHud();
  }

  function resetMultiplayer() {
    stopOnline();
    paused = false;
    pausePanel.classList.add("hidden");
    gameMode = "multi";
    started = true;
    ended = false;
    activeCat = "barnaby";
    senseOn = false;
    barnabySense = false;
    cleoSense = false;
    swatCooldown = 0;
    cleoSwatCooldown = 0;
    sensePulse = 0;
    sceneShake = 0;
    lightningFlash = 0.55;
    lightningTimer = 1;
    solved = false;
    currentMystery = MYSTERIES[Math.floor(Math.random() * MYSTERIES.length)];
    state.time = 300;
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
    state.message = "Two detectives. One liar. The manor starts sweating.";
    Object.assign(player, {
      x: 35,
      y: GROUND - 22,
      vx: 0,
      vy: 0,
      facing: 1,
      onGround: false,
      step: 0,
    });
    Object.assign(player2, {
      x: 64,
      y: GROUND - 22,
      vx: 0,
      vy: 0,
      facing: 1,
      onGround: false,
      step: 0,
    });
    Object.assign(curtain, {
      x: 350,
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
    whodunitPanel.classList.remove("hidden");
    setEvidenceLabels(MULTI_LABELS);
    renderWhodunit();
    beginCutscene(
      [
        {
          kicker: "Co-op whodunit",
          title: "One manor. Two noses. Four suspects.",
          copy:
            "Barnaby sees what glows. Cleo hears what lies. This time the culprit is shuffled, so every run needs a fresh accusation.",
          objective: "P1: A/D/W/F/E. P2: arrows/K/L. Collect clues, then accuse together.",
          cta: "Investigate",
        },
      ],
      null
    );
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

  function multiplayerBeat(key, text) {
    if (key === "buster") return;
    const doneCount = Object.values(state.evidence).filter(Boolean).length;
    beginCutscene(
      [
        {
          kicker: `Co-op clue ${Math.min(doneCount, 4)}/4`,
          title: key === "trail" ? "The trail changes." : key === "floor" ? "The room confesses." : key === "note" ? "The note bites back." : "The smell narrows.",
          copy: text,
          objective:
            doneCount >= 4
              ? "Enough evidence. Pick a suspect from the Whodunit board."
              : "Keep splitting senses. One cat cannot solve this alone.",
          cta: "Continue",
        },
      ],
      null
    );
  }

  function renderWhodunit() {
    if (!currentMystery) return;
    mysterySeed.textContent = currentMystery.id;
    const clueCount = ["trail", "floor", "note", "scent"].filter((key) => state.evidence[key]).length;
    suspectGrid.innerHTML = currentMystery.suspects
      .map(([name, role]) => `<div class="suspect-card"><strong>${name}</strong><span>${role}</span></div>`)
      .join("");
    accuseButtons.innerHTML = currentMystery.suspects
      .map(([name]) => `<button type="button" data-suspect="${name}" ${clueCount < 4 || ended ? "disabled" : ""}>Accuse ${name}</button>`)
      .join("");
    whodunitStatus.textContent =
      clueCount < 4
        ? `${clueCount}/4 clues locked. Culprit motive: ${currentMystery.motive}`
        : "Evidence is ready. Choose carefully: one accusation closes the case.";
    accuseButtons.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => accuse(button.dataset.suspect));
    });
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (match) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[match]);
  }

  function cleanRoomCode(value) {
    return String(value || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  }

  function getPlayerName() {
    const name = playerNameInput.value.trim().slice(0, 18) || "Guest Detective";
    localStorage.setItem("whiskerDetectiveName", name);
    return name;
  }

  function setLobbyStatus(text, tone = "normal") {
    lobbyStatus.textContent = text;
    lobbyStatus.style.color = tone === "bad" ? colors.red : tone === "good" ? colors.green : "#dbc6a7";
  }

  async function api(path, body) {
    const response = await fetch(path, {
      method: body ? "POST" : "GET",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload.error || "The room did not answer.");
    }
    return payload;
  }

  function inviteUrl(code = online.roomCode) {
    const url = new URL(window.location.href);
    url.searchParams.set("room", code);
    return url.toString();
  }

  function queueOnlineAction(action) {
    if (!online.enabled || ended) return;
    online.pendingActions.push(action);
    syncOnlineNow();
  }

  async function createOnlineRoom() {
    setLobbyStatus("Opening the manor doors...");
    try {
      const payload = await api("/api/rooms", { name: getPlayerName() });
      beginOnlineSession(payload, true);
      setLobbyStatus(`Room ${payload.roomCode} is live. Share the code.`, "good");
    } catch (error) {
      setLobbyStatus(error.message, "bad");
    }
  }

  async function joinOnlineRoom() {
    const code = cleanRoomCode(roomCodeInput.value);
    if (!code) {
      setLobbyStatus("Enter a room code or create a new room.", "bad");
      return;
    }
    setLobbyStatus(`Looking for room ${code}...`);
    try {
      const payload = await api(`/api/rooms/${code}/join`, {
        name: getPlayerName(),
        playerId: sessionStorage.getItem(`whiskerPlayer:${code}`) || "",
      });
      beginOnlineSession(payload, false);
      setLobbyStatus(`Joined ${payload.roomCode}.`, "good");
    } catch (error) {
      setLobbyStatus(error.message, "bad");
    }
  }

  function beginOnlineSession(payload, created) {
    online.enabled = true;
    online.roomCode = payload.roomCode;
    online.playerId = payload.playerId;
    online.role = payload.role;
    online.slot = payload.slot;
    sessionStorage.setItem(`whiskerPlayer:${payload.roomCode}`, payload.playerId);
    online.input.left = false;
    online.input.right = false;
    online.pendingActions.length = 0;
    gameMode = "online";
    started = true;
    ended = false;
    solved = false;
    activeCat = payload.slot === 1 ? "cleo" : "barnaby";
    senseOn = false;
    resetObjects();
    startPanel.classList.add("hidden");
    endPanel.classList.add("hidden");
    cutscene.classList.add("hidden");
    screenWrap.classList.remove("cinematic");
    whodunitPanel.classList.remove("hidden");
    onlinePanel.classList.remove("hidden");
    setEvidenceLabels(MULTI_LABELS);
    const url = new URL(window.location.href);
    url.searchParams.set("room", payload.roomCode);
    window.history.replaceState({}, "", url);
    applyOnlineSnapshot(payload.state, payload);
    onlineStatus.dataset.state = "connected";
    if (online.pollTimer) clearInterval(online.pollTimer);
    online.pollTimer = setInterval(syncOnlineNow, 180);
    beginCutscene(
      [
        {
          kicker: created ? "Online room created" : "Online room joined",
          title: created ? "The manor has a code." : "The storm lets you in.",
          copy:
            "Every detective sees the same room, clues, timer, suspects, and final accusation. Share the code and split the senses.",
          objective:
            online.slot < 2
              ? `You are ${online.role}. Move with A/D, jump with W, swat with F, sense with E.`
              : "You are on clue-board duty. Watch the evidence and help call the culprit.",
          cta: "Start Sync",
        },
      ],
      null
    );
  }

  async function syncOnlineNow() {
    if (!online.enabled || online.syncing || !online.roomCode || !online.playerId) return;
    online.syncing = true;
    const actions = online.pendingActions.splice(0);
    try {
      const payload = await api(`/api/rooms/${online.roomCode}/input`, {
        playerId: online.playerId,
        input: online.input,
        actions,
      });
      onlineStatus.dataset.state = "connected";
      applyOnlineSnapshot(payload.state, payload);
    } catch (error) {
      setLobbyStatus(error.message, "bad");
      onlineStatus.dataset.state = "offline";
      onlineStatus.textContent = `Connection interrupted. Retrying automatically...`;
    } finally {
      online.syncing = false;
    }
  }

  function applyOnlineSnapshot(snapshot, payload = {}) {
    if (!snapshot) return;
    online.lastStateAt = Date.now();
    if (payload.playerId) online.playerId = payload.playerId;
    if (payload.role) online.role = payload.role;
    if (Number.isInteger(payload.slot)) online.slot = payload.slot;
    if (snapshot.code) online.roomCode = snapshot.code;
    const previousEvidence = { ...state.evidence };
    currentMystery = snapshot.mystery;
    state.time = snapshot.time;
    state.chaos = snapshot.chaos;
    state.swats = snapshot.swats;
    state.broken = snapshot.broken;
    state.evidence = { ...snapshot.evidence };
    if (online.enabled) {
      const newClue = ["trail", "floor", "note", "scent", "buster"].find((key) => state.evidence[key] && !previousEvidence[key]);
      if (newClue) showClueToast(snapshot.mystery?.reveals?.[newClue] || newClue);
    }
    state.message = snapshot.message;
    const barnaby = snapshot.actors?.[0];
    const cleo = snapshot.actors?.[1];
    if (barnaby) Object.assign(player, barnaby);
    if (cleo) Object.assign(player2, cleo);
    barnabySense = Boolean(barnaby?.sense);
    cleoSense = Boolean(cleo?.sense);
    swatCooldown = barnaby?.cooldown || 0;
    cleoSwatCooldown = cleo?.cooldown || 0;
    Object.assign(curtain, snapshot.curtain || curtain);
    if (Array.isArray(snapshot.objects)) {
      objects.length = 0;
      snapshot.objects.forEach((obj) => objects.push({ ...obj }));
    }
    ended = snapshot.status === "ended";
    if (ended && snapshot.end) {
      endChip.textContent = snapshot.end.chip;
      endTitle.textContent = snapshot.end.title;
      endCopy.textContent = snapshot.end.copy;
      renderEndStats();
      endPanel.classList.remove("hidden");
    } else {
      endPanel.classList.add("hidden");
    }
    renderWhodunit();
    renderOnlinePanel(snapshot);
    updateHud();
  }

  function renderOnlinePanel(snapshot) {
    onlineRoomCode.textContent = online.roomCode || snapshot.code || "------";
    const role = online.role || "Detective";
    const clueCount = ["trail", "floor", "note", "scent"].filter((key) => state.evidence[key]).length;
    onlineStatus.textContent =
      snapshot.status === "ended"
        ? "Case closed for everyone in the room."
        : `${role} · ${clueCount}/4 clues · screens syncing live`;
    onlineStatus.dataset.state = snapshot.status === "ended" ? "ended" : "connected";
    roomReadiness.textContent = clueCount >= 4
      ? "Clue board ready. Compare motives and make one accusation together."
      : `${4 - clueCount} more clue${4 - clueCount === 1 ? "" : "s"} needed before the accusation board unlocks.`;
    onlinePlayers.innerHTML = (snapshot.players || [])
      .map(
        (p) =>
          `<div class="player-pill"><strong>${escapeHtml(p.name)}</strong><span>${escapeHtml(p.role)}${p.you ? " · you" : ""}</span></div>`
      )
      .join("");
  }

  async function accuseOnline(name) {
    if (!online.enabled || ended) return;
    try {
      const payload = await api(`/api/rooms/${online.roomCode}/accuse`, {
        playerId: online.playerId,
        suspect: name,
      });
      applyOnlineSnapshot(payload.state, payload);
      lightningFlash = 0.7;
      sceneShake = Math.max(sceneShake, 3);
    } catch (error) {
      setLobbyStatus(error.message, "bad");
    }
  }

  async function resetOnlineRoom() {
    if (!online.enabled) return;
    try {
      const payload = await api(`/api/rooms/${online.roomCode}/reset`, {
        playerId: online.playerId,
      });
      applyOnlineSnapshot(payload.state, payload);
      endPanel.classList.add("hidden");
      lightningFlash = 0.55;
    } catch (error) {
      setLobbyStatus(error.message, "bad");
    }
  }

  function accuse(name) {
    if (online.enabled) {
      accuseOnline(name);
      return;
    }
    if (ended || gameMode !== "multi" || !currentMystery) return;
    state.evidence.buster = true;
    renderWhodunit();
    if (name === currentMystery.culprit) {
      beginCutscene(
        [
          {
            kicker: "Final accusation",
            title: `${name} did it.`,
            copy: currentMystery.win,
            objective: "Co-op solved. The security cam is already embarrassing.",
            cta: "Close Case",
          },
        ],
        () => finish(true, "Co-op case closed", `${currentMystery.win}`)
      );
    } else {
      addChaos(22, "Wrong accusation. The house gets louder.");
      if (ended) return;
      beginCutscene(
        [
          {
            kicker: "Bad accusation",
            title: `${name} hisses innocent.`,
            copy: `The clue board does not line up. ${currentMystery.culprit} is still using the storm as cover.`,
            objective: "Review the clue text and accuse again before chaos hits 100%.",
            cta: "Keep Playing",
          },
        ],
        () => {
          state.evidence.buster = false;
          renderWhodunit();
        }
      );
    }
    updateHud();
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

  function showClueToast(text) {
    const titles = { en: "New clue", es: "Nueva pista", "pt-BR": "Nova pista", fr: "Nouvel indice", de: "Neuer Hinweis", it: "Nuovo indizio", ja: "新しい手がかり" };
    clueToastTitle.textContent = titles[language] || titles.en;
    clueToastCopy.textContent = text;
    clueToast.classList.add("visible");
    clearTimeout(clueToastTimer);
    clueToastTimer = setTimeout(() => clueToast.classList.remove("visible"), 4200);
  }

  function renderEndStats() {
    const clues = Object.values(state.evidence).filter(Boolean).length;
    const score = Math.max(0, clues * 250 + Math.floor(state.time) * 2 - Math.round(state.chaos) * 3);
    const grade = score >= 1100 ? "S" : score >= 850 ? "A" : score >= 600 ? "B" : "C";
    const gradeCopy = grade === "S" ? "Masterful detective work." : grade === "A" ? "Clean work under pressure." : grade === "B" ? "The clues survived the chaos." : "The trail is still worth following.";
    caseGradeLetter.textContent = grade;
    caseGradeCopy.textContent = gradeCopy;
    endStats.innerHTML = `<span>Score ${score}</span><span>${clues}/5 clues</span><span>${state.swats} swats</span><span>${Math.round(state.chaos)}% chaos</span>`;
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

  function markEvidence(key, text, actor = player) {
    if (state.evidence[key]) return;
    state.evidence[key] = true;
    const shownText =
      gameMode === "multi" && currentMystery?.reveals[key]
        ? currentMystery.reveals[key]
        : text;
    setMessage(shownText, actor.x - 14, actor.y - 14, colors.green);
    showClueToast(shownText);
    playTone(660, 0.12, "sine", 0.035);
    addParticles(actor.x + actor.w / 2, actor.y + 8, 18, colors.green, 2.3);
    pulse(actor.x + actor.w / 2, actor.y + 10, colors.green);
    if (gameMode === "multi") {
      multiplayerBeat(key, shownText);
      renderWhodunit();
    } else if (STORY_BEATS[key]) {
      storyBeat(key);
    }
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
    if (gameMode === "multi") {
      toggleBarnabySense();
      return;
    }
    senseOn = !senseOn;
    sensePulse = 0.5;
    pulse(player.x + player.w / 2, player.y + 10, activeCat === "barnaby" ? colors.blue : colors.amber);
    updateHud();
    inspectNearby();
  }

  function toggleBarnabySense() {
    barnabySense = !barnabySense;
    sensePulse = 0.5;
    pulse(player.x + player.w / 2, player.y + 10, colors.blue);
    setMessage(barnabySense ? "Barnaby's scent sight is live." : "Barnaby blinks the scent away.", player.x - 10, player.y - 12, colors.blue);
    inspectMultiplayer();
    updateHud();
  }

  function toggleCleoSense() {
    cleoSense = !cleoSense;
    sensePulse = 0.5;
    pulse(player2.x + player2.w / 2, player2.y + 10, colors.amber);
    setMessage(cleoSense ? "Cleo hears the walls breathe." : "Cleo lowers her whiskers.", player2.x - 10, player2.y - 12, colors.amber);
    inspectMultiplayer();
    updateHud();
  }

  function jump() {
    if (!started || ended || cutsceneActive) return;
    jumpActor(player);
  }

  function jumpCleo() {
    if (!started || ended || cutsceneActive) return;
    jumpActor(player2);
  }

  function jumpActor(actor) {
    if (actor.onGround) {
      actor.vy = -6.1;
      actor.onGround = false;
      playTone(330, 0.07, "square", 0.018);
      addParticles(actor.x + actor.w / 2, actor.y + actor.h, 5, "#80604a", 1);
    }
  }

  function swat() {
    if (!started || ended || cutsceneActive || swatCooldown > 0) return;
    swatCooldown = 0.26;
    swatActor(player);
  }

  function swatCleo() {
    if (!started || ended || cutsceneActive || cleoSwatCooldown > 0) return;
    cleoSwatCooldown = 0.26;
    swatActor(player2);
  }

  function swatActor(actor) {
    state.swats += 1;
    playTone(180, 0.055, "square", 0.018);
    const paw = {
      x: actor.facing > 0 ? actor.x + actor.w - 2 : actor.x - 16,
      y: actor.y + 6,
      w: 18,
      h: 12,
    };
    let hit = false;

    for (const obj of objects) {
      if (obj.broken) continue;
      if (rectsOverlap(paw, obj)) {
        if (obj.id === "ink" && !state.evidence.floor && !canReadFloorClue(actor)) {
          hit = true;
          setMessage("The ink needs Cleo's whiskers, not another hit.", actor.x - 18, actor.y - 12, colors.amber);
          continue;
        }
        hit = true;
        obj.dynamic = true;
        obj.vx += actor.facing * (2.2 + Math.random() * 0.5);
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
        markEvidence("trail", "A neon feather trail glows behind the drapes.", actor);
        addChaos(8, "The curtains surrender.");
      } else {
        setMessage("The curtain rings groan.", curtain.x - 30, curtain.y + 20, colors.amber);
      }
    }

    if (!hit) {
      addParticles(paw.x + paw.w / 2, paw.y + 8, 5, colors.paper, 1.4);
      setMessage("A very forensic swat.", actor.x - 8, actor.y - 10, colors.paper);
    }
  }

  function canReadFloorClue(actor = player) {
    return gameMode === "multi" ? actor === player2 && cleoSense : activeCat === "cleo" && senseOn;
  }

  function inspectNearby() {
    if (!senseOn || !started || ended || cutsceneActive) return;
    const centerX = player.x + player.w / 2;

    if (activeCat === "barnaby") {
      if (Math.abs(centerX - 370) < 52 && !state.evidence.trail) {
        markEvidence("trail", "Oily feathers. The trail climbs to the curtain rod.");
      }
      if (state.evidence.floor && Math.abs(centerX - 151) < 34 && !state.evidence.scent) {
        markEvidence("scent", "Cheap peanut butter. Dog shampoo. Buster was here.");
      }
    } else {
      if (state.evidence.floor && Math.abs(centerX - 146) < 34 && !state.evidence.note) {
        markEvidence("note", "The note reads: garden gate, 3 AM, bring feathers.");
      }
      const ink = objects.find((object) => object.id === "ink" && !object.broken);
      if (!state.evidence.floor && ink && Math.abs(centerX - (ink.x + ink.w / 2)) < 36) {
        markEvidence("floor", "Cleo hears the hidden compartment beneath the ink.");
      }
    }
  }

  function inspectMultiplayer() {
    if (gameMode !== "multi" || !started || ended || cutsceneActive) return;
    const barnabyX = player.x + player.w / 2;
    const cleoX = player2.x + player2.w / 2;
    if (barnabySense) {
      if (Math.abs(barnabyX - 370) < 52 && !state.evidence.trail) {
        markEvidence("trail", "Barnaby finds a feather trail that refuses to behave.", player);
      }
      if (state.evidence.floor && Math.abs(barnabyX - 151) < 38 && !state.evidence.scent) {
        markEvidence("scent", "Barnaby matches the odor to a suspect.", player);
      }
    }
    if (cleoSense && state.evidence.floor && Math.abs(cleoX - 146) < 38 && !state.evidence.note) {
      markEvidence("note", "Cleo reads the note the floor tried to swallow.", player2);
    }
    const ink = objects.find((object) => object.id === "ink" && !object.broken);
    if (cleoSense && !state.evidence.floor && ink && Math.abs(cleoX - (ink.x + ink.w / 2)) < 40) {
      markEvidence("floor", "Cleo hears the hidden compartment beneath the ink.", player2);
    }
  }

  function update(dt) {
    updateStorm(dt);
    if (!started || ended || cutsceneActive) return;
    if (online.enabled) {
      sensePulse = Math.max(0, sensePulse - dt);
      updateEffects(dt);
      updateHud();
      return;
    }
    state.time -= dt;
    if (state.time <= 0) {
      finish(false, "The humans are home", "The owner stepped into the study before Barnaby could name the culprit. The canary remains a cold case.");
      return;
    }
    if (gameMode === "multi") {
      updateMultiplayer(dt);
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

  function updateMultiplayer(dt) {
    moveActor(player, keys.has("a") || keys.has("A"), keys.has("d") || keys.has("D"), 0.44, 2.1, dt);
    moveActor(player2, keys.has("ArrowLeft"), keys.has("ArrowRight"), 0.52, 2.35, dt);
    swatCooldown = Math.max(0, swatCooldown - dt);
    cleoSwatCooldown = Math.max(0, cleoSwatCooldown - dt);
    sensePulse = Math.max(0, sensePulse - dt);
    updateObjects(dt);
    updateEffects(dt);
    inspectMultiplayer();
    renderWhodunit();
    updateHud();
  }

  function moveActor(actor, left, right, acceleration, maxSpeed, dt) {
    if (left) {
      actor.vx -= acceleration;
      actor.facing = -1;
    }
    if (right) {
      actor.vx += acceleration;
      actor.facing = 1;
    }
    if (!left && !right) actor.vx *= 0.78;
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

  function collideFurniture(actor = player) {
    const shelves = [
      { x: 192, y: 105, w: 53, h: 7 },
      { x: 75, y: 104, w: 94, h: 9 },
    ];
    for (const s of shelves) {
      const next = { x: actor.x, y: actor.y, w: actor.w, h: actor.h };
      if (rectsOverlap(next, s) && actor.vy >= 0 && actor.y + actor.h - actor.vy <= s.y + 2) {
        actor.y = s.y - actor.h;
        actor.vy = 0;
        actor.onGround = true;
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
          if (canReadFloorClue()) {
            obj.broken = true;
            state.broken += 1;
            markEvidence("floor", "Black ink drains into a hidden floorboard seam.");
            addParticles(obj.x + obj.w / 2, obj.y + obj.h, 24, "#17151d", 2.5);
          } else {
            obj.dynamic = false;
            obj.vx = 0;
            obj.vy = 0;
            setMessage("The ink splashes, but the real clue is still hidden.", obj.x - 18, obj.y - 12, colors.amber);
          }
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
    if (player.x > 410) {
      solved = true;
      state.evidence.buster = true;
      updateHud();
      storyBeat("buster");
    } else if (player.x > 382) {
      setMessage("Pet door ahead. Buster is pacing by the garden gate.", 184, 82, colors.amber);
    }
  }

  function finish(won, chip, copy) {
    if (ended) return;
    ended = true;
    playTone(won ? 880 : 150, won ? 0.28 : 0.2, won ? "sine" : "sawtooth", 0.035);
    endChip.textContent = chip;
    endTitle.textContent = won ? "Sir Reginald is saved." : "The trail goes cold.";
    endCopy.textContent = `${copy} Security cam recap: ${state.swats} swats, ${state.broken} broken objects, ${Math.round(state.chaos)}% chaos.`;
    renderEndStats();
    endPanel.classList.remove("hidden");
  }

  function updateHud() {
    const minutes = Math.max(0, Math.floor(state.time / 60));
    const seconds = Math.max(0, Math.floor(state.time % 60));
    clockEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    chaosText.textContent = `${Math.round(state.chaos)}%`;
    chaosBar.style.width = `${state.chaos}%`;
    const clueCount = Object.values(state.evidence).filter(Boolean).length;
    caseProgress.textContent = `${clueCount}/5`;
    if (gameMode === "multi" || online.enabled) {
      detectiveName.textContent = online.enabled
        ? `${online.role || "Online"} · B ${barnabySense ? "scent on" : "scent ready"} · C ${cleoSense ? "whiskers on" : "whiskers ready"}`
        : `Co-op · B ${barnabySense ? "scent on" : "scent ready"} · C ${cleoSense ? "whiskers on" : "whiskers ready"}`;
      senseCopy.textContent =
        online.enabled
          ? "Everyone shares the same clue board. Move your assigned cat, collect four clues, then accuse together."
          : "P1 Barnaby tracks smell with E. P2 Cleo reads notes and hollows with L. Accuse only after four clues.";
    } else {
      detectiveName.textContent =
        activeCat === "barnaby"
          ? `Barnaby · ${senseOn ? "Scent active" : "Scent ready"}`
          : `Cleo · ${senseOn ? "Whiskers active" : "Whiskers ready"}`;
      senseCopy.textContent =
        activeCat === "barnaby"
          ? "Scent sight makes chemical trails glow. Use it near suspicious evidence."
          : "Whisker resonance reads notes and hollow spaces that Barnaby cannot understand.";
    }
    [...evidenceList.children].forEach((item) => {
      item.classList.toggle("done", Boolean(state.evidence[item.dataset.key]));
    });
  }

  function draw() {
    ctx.imageSmoothingEnabled = false;
    const focusX = gameMode === "multi"
      ? (player.x + player2.x + player.w + player2.w) / 2
      : player.x + player.w / 2;
    cameraX = clamp(focusX - VIEW_W * 0.42, 0, W - VIEW_W);
    ctx.save();
    if (sceneShake > 0) {
      ctx.translate(Math.round((Math.random() - 0.5) * sceneShake), Math.round((Math.random() - 0.5) * sceneShake));
    }
    ctx.translate(-Math.round(cameraX), 0);
    drawRoom();
    if (senseOn || barnabySense || cleoSense) drawSenseLayer();
    drawFurniture();
    drawCurtain();
    drawObjects();
    drawClues();
    drawPlayer();
    drawEffects();
    ctx.restore();
    ctx.save();
    if (sceneShake > 0) {
      ctx.translate(Math.round((Math.random() - 0.5) * sceneShake), Math.round((Math.random() - 0.5) * sceneShake));
    }
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
    drawHallway();
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
    fill(438, 119, 19, 31, "#0d0d12");
    fill(441, 123, 13, 27, "#2a1c1c");
    fill(444, 128, 7, 22, "#131116");
    if (state.evidence.note && state.evidence.scent) {
      fill(436, 115, 24, 4, colors.green);
      drawTinyBuster();
    }
  }

  function drawHallway() {
    fill(320, 18, 148, 108, "#15121a");
    fill(326, 27, 42, 82, "#271b22");
    fill(330, 31, 34, 74, "#3a2730");
    fill(382, 35, 52, 4, colors.gold);
    fill(386, 39, 4, 64, "#4b2d25");
    fill(426, 39, 4, 64, "#4b2d25");
    fill(389, 51, 38, 3, "#6b4230");
    fill(389, 72, 38, 3, "#6b4230");
    fill(389, 93, 38, 3, "#6b4230");
    fill(466, 20, 3, 106, "#3a2526");
    fill(320, 126, 148, 30, "#2a181c");
  }

  function drawTinyBuster() {
    fill(431, 128, 18, 12, "#9b7b60");
    fill(425, 125, 10, 11, "#a98866");
    fill(426, 123, 4, 4, "#6b503f");
    fill(433, 124, 4, 4, "#6b503f");
    fill(428, 130, 2, 2, "#111018");
    fill(434, 130, 2, 2, "#111018");
    fill(422, 122, 4, 9, "#7f5e48");
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
      fill(332, curtain.y + 36, 60, 10, "#702633");
      fill(342, curtain.y + 27, 45, 11, "#8d3040");
      fill(350, curtain.y + 20, 30, 9, "#5d1d2d");
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
    if ((senseOn && activeCat === "barnaby") || barnabySense || state.evidence.trail) {
      const glow = senseOn && activeCat === "barnaby" || barnabySense ? colors.green : "rgba(104, 212, 119, 0.7)";
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
      if ((senseOn && activeCat === "cleo") || cleoSense) {
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
    if (gameMode === "multi" || online.enabled) {
      if (barnabySense) {
        fill(0, 0, W, H, "rgba(22, 52, 78, 0.28)");
        for (let i = 0; i < 8; i++) {
          const x = 42 + i * 27 + Math.sin(performance.now() / 220 + i) * 3;
          const y = 119 - (i % 3) * 14;
          fill(x, y, 5, 3, i % 2 ? colors.green : colors.violet);
        }
      }
      if (cleoSense) {
        ctx.strokeStyle = "rgba(240, 174, 72, 0.72)";
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.arc(player2.x + player2.w / 2, player2.y + 10, 17 + i * 8 + sensePulse * 7, -0.4, 0.4);
          ctx.stroke();
        }
      }
      return;
    }
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
    if (gameMode === "multi" || online.enabled) {
      drawBarnaby(player.x, player.y, player.facing, swatCooldown > 0, player);
      drawCleo(player2.x, player2.y + 1, player2.facing, cleoSwatCooldown > 0, player2);
      drawPlayerTag(player, online.enabled ? "B" : "P1", colors.blue);
      drawPlayerTag(player2, online.enabled ? "C" : "P2", colors.amber);
      return;
    }
    if (activeCat === "barnaby") {
      drawBarnaby(player.x, player.y, player.facing, swatCooldown > 0, player);
    } else {
      drawCleo(player.x, player.y + 1, player.facing, swatCooldown > 0, player);
    }
  }

  function drawPlayerTag(actor, label, color) {
    fill(actor.x + 5, actor.y - 9, 13, 7, "rgba(8, 8, 11, 0.78)");
    drawPixelText(label, actor.x + 7, actor.y - 4, color, 18);
  }

  function drawBarnaby(x, y, facing, pawOut, actor = player) {
    const bob = actor.onGround ? Math.sin(actor.step * 11) * 1 : 0;
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

  function drawCleo(x, y, facing, pawOut, actor = player) {
    const bob = actor.onGround ? Math.sin(actor.step * 12) * 1 : 0;
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
    ctx.font = "bold 7px monospace";
    ctx.textBaseline = "top";
    ctx.textAlign = "left";
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
    pollGamepad();
    if (!paused) update(dt);
    draw();
    drawPortrait();
    requestAnimationFrame(loop);
  }

  const gamepadButtons = { jump: false, swat: false, sense: false };

  function setHeldKey(key, pressed) {
    if (pressed) keys.add(key);
    else keys.delete(key);
  }

  function pollGamepad() {
    const pad = (navigator.getGamepads?.() || []).find(Boolean);
    if (!pad) return;
    const axis = pad.axes?.[0] || 0;
    const left = axis < -0.25 || Boolean(pad.buttons?.[14]?.pressed);
    const right = axis > 0.25 || Boolean(pad.buttons?.[15]?.pressed);
    if (online.enabled) {
      online.input.left = left;
      online.input.right = right;
    } else if (started && !ended && !cutsceneActive) {
      if (gameMode === "multi") {
        setHeldKey("a", left);
        setHeldKey("d", right);
      } else {
        setHeldKey("ArrowLeft", left);
        setHeldKey("ArrowRight", right);
      }
    }
    if (!started || ended || cutsceneActive) {
      gamepadButtons.jump = false;
      gamepadButtons.swat = false;
      gamepadButtons.sense = false;
      return;
    }
    const jumpPressed = Boolean(pad.buttons?.[0]?.pressed);
    const swatPressed = Boolean(pad.buttons?.[2]?.pressed);
    const sensePressed = Boolean(pad.buttons?.[3]?.pressed);
    if (jumpPressed && !gamepadButtons.jump) online.enabled ? queueOnlineAction("jump") : gameMode === "multi" ? jump() : jump();
    if (swatPressed && !gamepadButtons.swat) online.enabled ? queueOnlineAction("swat") : swat();
    if (sensePressed && !gamepadButtons.sense) online.enabled ? queueOnlineAction("sense") : toggleSense();
    gamepadButtons.jump = jumpPressed;
    gamepadButtons.swat = swatPressed;
    gamepadButtons.sense = sensePressed;
  }

  function bindMouseControls() {
    let heldDirection = "";
    const release = () => {
      if (heldDirection) keys.delete(heldDirection);
      heldDirection = "";
    };
    canvas.addEventListener("pointerdown", (event) => {
      if (event.button === 2) {
        event.preventDefault();
        online.enabled ? queueOnlineAction("jump") : jump();
        return;
      }
      if (event.button !== 0 || cutsceneActive) return;
      const bounds = canvas.getBoundingClientRect();
      heldDirection = event.clientX - bounds.left < bounds.width / 2 ? "ArrowLeft" : "ArrowRight";
      keys.add(heldDirection);
      canvas.setPointerCapture?.(event.pointerId);
    });
    canvas.addEventListener("pointerup", release);
    canvas.addEventListener("pointercancel", release);
    canvas.addEventListener("pointerleave", release);
    canvas.addEventListener("contextmenu", (event) => event.preventDefault());
    canvas.addEventListener("dblclick", (event) => {
      event.preventDefault();
      online.enabled ? queueOnlineAction("swat") : swat();
    });
  }

  function refreshOnlineInput() {
    if (!online.enabled) return;
    online.input.left = keys.has("ArrowLeft") || keys.has("a") || keys.has("A");
    online.input.right = keys.has("ArrowRight") || keys.has("d") || keys.has("D");
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
    if (event.key === "Escape" && !event.repeat && !online.enabled) {
      if (started && !ended) {
        paused = !paused;
        pausePanel.classList.toggle("hidden", !paused);
        if (paused) resumeButton.focus();
      }
      return;
    }
    keys.add(event.key);
    if (online.enabled) {
      refreshOnlineInput();
      if (!event.repeat) {
        if (event.key === " " || event.key === "w" || event.key === "W" || event.key === "ArrowUp") queueOnlineAction("jump");
        if (event.key === "f" || event.key === "F" || event.key === "x" || event.key === "X" || event.key === "k" || event.key === "K") queueOnlineAction("swat");
        if (event.key === "e" || event.key === "E" || event.key === "l" || event.key === "L") {
          sensePulse = 0.5;
          queueOnlineAction("sense");
        }
      }
      syncOnlineNow();
      return;
    }
    if (gameMode === "multi") {
      if ((event.key === "w" || event.key === "W") && !event.repeat) jump();
      if (event.key === "ArrowUp" && !event.repeat) jumpCleo();
      if ((event.key === "f" || event.key === "F") && !event.repeat) swat();
      if ((event.key === "k" || event.key === "K") && !event.repeat) swatCleo();
      if ((event.key === "e" || event.key === "E") && !event.repeat) toggleBarnabySense();
      if ((event.key === "l" || event.key === "L") && !event.repeat) toggleCleoSense();
      return;
    }
    if ((event.key === " " || event.key === "w" || event.key === "W" || event.key === "ArrowUp") && !event.repeat) jump();
    if ((event.key === "f" || event.key === "F" || event.key === "x" || event.key === "X") && !event.repeat) swat();
    if ((event.key === "e" || event.key === "E") && !event.repeat) toggleSense();
    if (event.key === "Tab" && !event.repeat) switchCat();
  });

  document.addEventListener("keyup", (event) => {
    keys.delete(event.key);
    if (online.enabled) {
      refreshOnlineInput();
      syncOnlineNow();
    }
  });

  document.querySelectorAll("[data-hold]").forEach((button) => {
    const key = button.dataset.hold === "left" ? "ArrowLeft" : "ArrowRight";
    const down = (event) => {
      event.preventDefault();
      keys.add(key);
      if (online.enabled) {
        refreshOnlineInput();
        syncOnlineNow();
      }
    };
    const up = (event) => {
      event.preventDefault();
      keys.delete(key);
      if (online.enabled) {
        refreshOnlineInput();
        syncOnlineNow();
      }
    };
    button.addEventListener("pointerdown", down);
    button.addEventListener("pointerup", up);
    button.addEventListener("pointercancel", up);
    button.addEventListener("pointerleave", up);
  });

  bindMouseControls();
  resumeButton.addEventListener("click", () => {
    paused = false;
    pausePanel.classList.add("hidden");
  });

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.action;
      if (online.enabled) {
        if (action === "jump") queueOnlineAction("jump");
        if (action === "swat") queueOnlineAction("swat");
        if (action === "sense") {
          sensePulse = 0.5;
          queueOnlineAction("sense");
        }
        return;
      }
      if (action === "jump") jump();
      if (action === "swat") swat();
      if (action === "sense") toggleSense();
      if (action === "switch") switchCat();
    });
  });

  startButton.addEventListener("click", () => {
    startPanel.classList.add("hidden");
    beginCutscene(localizedIntroScenes(), resetGame);
  });
  onlineButton.addEventListener("click", () => {
    onlineLobby.classList.toggle("hidden");
    roomCodeInput.value = cleanRoomCode(roomCodeInput.value);
    if (!onlineLobby.classList.contains("hidden")) {
      roomCodeInput.focus();
    }
  });
  createRoomButton.addEventListener("click", createOnlineRoom);
  joinRoomButton.addEventListener("click", joinOnlineRoom);
  roomCodeInput.addEventListener("input", () => {
    roomCodeInput.value = cleanRoomCode(roomCodeInput.value);
  });
  roomCodeInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") joinOnlineRoom();
  });
  copyInviteButton.addEventListener("click", async () => {
    const link = inviteUrl();
    try {
      await navigator.clipboard.writeText(link);
      onlineStatus.textContent = `Invite copied: ${online.roomCode}`;
    } catch {
      onlineStatus.textContent = link;
    }
  });
  multiplayerButton.addEventListener("click", () => {
    startPanel.classList.add("hidden");
    resetMultiplayer();
  });
  restartButton.addEventListener("click", () => {
    endPanel.classList.add("hidden");
    if (online.enabled) {
      resetOnlineRoom();
    } else if (gameMode === "multi") {
      resetMultiplayer();
    } else {
      beginCutscene(localizedIntroScenes(), resetGame);
    }
  });
  nextCutsceneButton.addEventListener("click", advanceCutscene);
  skipCutsceneButton.addEventListener("click", endCutscene);
  languageSelect.addEventListener("change", () => {
    language = languageSelect.value;
    localStorage.setItem("whiskerLanguage", language);
    applyLanguage();
  });

  resetObjects();
  playerNameInput.value = localStorage.getItem("whiskerDetectiveName") || "";
  const roomFromUrl = cleanRoomCode(new URLSearchParams(window.location.search).get("room"));
  if (roomFromUrl) {
    roomCodeInput.value = roomFromUrl;
    onlineLobby.classList.remove("hidden");
    setLobbyStatus(`Room ${roomFromUrl} is ready. Add your name and join.`);
  }
  drawPortrait();
  applyLanguage();
  updateHud();
  requestAnimationFrame(loop);
})();
