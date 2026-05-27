const TEST_MODE = false;
const USE_FIXED_DECKS = true;
const SHUFFLE_DECKS = true;

const DEFAULT_PLAYER_1_ELEMENT = "Air";
const DEFAULT_PLAYER_2_ELEMENT = "Water";

const MAX_BOARD_SIZE = 5;
const MAX_HAND_SIZE = 10;

const gameState = {
  currentPlayerIndex: 0,
  phase: "action",
  turnNumber: 1,
  gameLog: [],
  selectedAttackerIndex: null,
  selectedReactionCardIndex: null,
  selectedSpellCardIndex: null,
  selectedWindSliceTargets: [],
  gameOver: false,

  players: [
    {
      name: "Player 1",
      hp: 30,
      maxChi: 0,
      currentChi: 0,
      fatigueDamage: 0,
      hasHadActionPhase: false,
      damagedEnemyHeroThisTurn: false,
      playedReactionThisReactionPhase: false,
      momentumActive: false,
      deck: [],
      hand: [],
      board: []
    },

    {
      name: "Player 2",
      hp: 30,
      maxChi: 0,
      currentChi: 0,
      fatigueDamage: 0,
      hasHadActionPhase: false,
      damagedEnemyHeroThisTurn: false,
      playedReactionThisReactionPhase: false,
      momentumActive: false,
      deck: [],
      hand: [],
      board: []
    }
  ]
};

const fireTestDeckIds = [
  // Fire units — early pressure / Ignite setup
  "spark_thrower",
  "confident_duelist",

  "flame_adept",
  "flame_adept",

  "southern_raider",
  "southern_raider",

  // Fire spells — removal + face pressure + draw
  "ember_strike",
  "ember_strike",

  "fire_whip",
  "fire_whip",

  "scorch_mark",
  "scorch_mark",

  "face_burn",
  "face_burn",

  "war_drums",
  "war_drums",

  // Neutral cards — aggressive / high attack / tempo
  "wandering_merchant",
  "wandering_merchant",

  "harbor_brawler",
  "harbor_brawler",

  "young_rascal",
  "young_rascal",

  "traveling_cook",
  "traveling_cook",

  "roadside_colossus",

  "overbearing_teacher",

  "old_map",
  "old_map",

  "fire_nation_recruit",
  "fire_nation_recruit"
];

const earthTestDeckIds = [
  // Earth units — Guard / Fortify / defensive board
  "lowly_armorsmith",
  "lowly_armorsmith",

  "academy_student",
  "academy_student",

  "stone_guardian",
  "stone_guardian",

  "pebble_catcher",
  "pebble_catcher",

  "wall_watcher",
  "wall_watcher",

  // Earth buffs — class identity
  "proper_stance",
  "proper_stance",

  "burrow_into_earth",
  "burrow_into_earth",

  // Earth proactive spells — control / stabilization
  "shifting_sands",
  "shifting_sands",

  "overwhelming_weight",
  "overwhelming_weight",

  "splitting_rock",

  "enduring_spirit",
  "enduring_spirit",

  // Neutral cards — HP / Guard / late game / value
  "tea_house_patron",
  "tea_house_patron",

  "shrine_guardian",
  "shrine_guardian",

  "roadside_colossus",
  "roadside_colossus",

  "pebble_toss",

  "old_map",
  "old_map"
];

const airTestDeckIds = [
  // Air units — Dodge / Momentum / tempo
  "simple_monk",
  "simple_monk",

  "gale_trainee",
  "gale_trainee",

  "wind_reader",
  "wind_reader",

  "air_acolyte",
  "air_acolyte",

  "skyline_courier",
  "skyline_courier",

  "windstep_duelist",

  // Air spells — Momentum payoff / board control
  "sweeping_strikes",
  "sweeping_strikes",

  "wind_slice",
  "wind_slice",

  "open_sky_training",
  "open_sky_training",

  // Air reactions — fewer friendly-only reactions, less dead hand
  "gust_snare",

  "crosswind_jab",
  "crosswind_jab",

  "sudden_gale",

  "banish",

  // Neutral cards — proactive pressure / tempo / draw
  "wandering_merchant",
  "wandering_merchant",

  "harbor_brawler",
  "harbor_brawler",

  "young_rascal",
  "young_rascal",

  "turtle_duck",

  "confident_duelist"
];

const waterTestDeckIds = [
  // Water units — sticky board / Flow support
  "southern_sailor",
  "southern_sailor",

  "stream_guide",
  "stream_guide",

  "river_guardian",
  "river_guardian",

  "waterbending_initiate",
  "waterbending_initiate",

  // Water Flow spells — flexibility / sustain / board control
  "flowing_touch",
  "flowing_touch",

  "river_spark",
  "river_spark",

  "tidal_splash",
  "tidal_splash",

  // Water tempo spell
  "ice_blast",
  "ice_blast",

  // Neutral early units — board presence
  "turtle_duck",
  "turtle_duck",

  "tea_house_patron",
  "tea_house_patron",

  "harbor_brawler",
  "harbor_brawler",

  // Neutral value / sustain / light finishers
  "scroll_keeper",
  "scroll_keeper",

  "old_map",
  "old_map",

  "traveling_cook",
  "traveling_cook",

  "roadside_colossus",
  "roadside_colossus"
];

const elementTestDecks = {
  Fire: fireTestDeckIds,
  Air: airTestDeckIds,
  Earth: earthTestDeckIds,
  Water: waterTestDeckIds
};

const matchupSettings = {
  player1Element: DEFAULT_PLAYER_1_ELEMENT,
  player2Element: DEFAULT_PLAYER_2_ELEMENT
};

function getDeckIdsForElement(elementName) {
  const deckIds = elementTestDecks[elementName];

  if (!deckIds) {
    console.error(`No test deck found for element: ${elementName}`);
    return [];
  }

  return deckIds;
}

function updateMatchupSettingsFromUI() {
  const player1Select = document.getElementById("player1-element-select");
  const player2Select = document.getElementById("player2-element-select");

  if (player1Select) {
    matchupSettings.player1Element = player1Select.value;
  }

  if (player2Select) {
    matchupSettings.player2Element = player2Select.value;
  }
}

function setupMatchupSelector() {
  const player1Select = document.getElementById("player1-element-select");
  const player2Select = document.getElementById("player2-element-select");
  const startMatchupButton = document.getElementById("start-matchup-button");

  if (player1Select) {
    player1Select.value = matchupSettings.player1Element;
  }

  if (player2Select) {
    player2Select.value = matchupSettings.player2Element;
  }

  if (startMatchupButton) {
    startMatchupButton.addEventListener("click", function () {
      updateMatchupSettingsFromUI();
      startGame();
    });
  }
}

function getCardById(cardId) {
  const foundCard = cards.find(function (card) {
    return card.id === cardId;
  });

  if (!foundCard) {
    console.error(`Card not found: ${cardId}`);
    return null;
  }

  return foundCard;
}

function buildDeck(cardIds) {
  return cardIds
    .map(function (cardId) {
      return getCardById(cardId);
    })
    .filter(function (card) {
      return card !== null;
    });
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temporaryCard = deck[i];
    deck[i] = deck[randomIndex];
    deck[randomIndex] = temporaryCard;
  }
}

function resetPlayer(player) {
  player.hp = 30;
  player.maxChi = 0;
  player.currentChi = 0;
  player.damagedEnemyHeroThisTurn = false;
  player.playedReactionThisReactionPhase = false;
  player.momentumActive = false;
  player.deck = [];
  player.hand = [];
  player.board = [];
  player.fatigueDamage = 0;
  player.hasHadActionPhase = false;
}

function resetGameState() {
  gameState.currentPlayerIndex = 0;
  gameState.phase = "action";
  gameState.turnNumber = 1;
  gameState.gameLog = [];
  gameState.selectedAttackerIndex = null;
  gameState.selectedReactionCardIndex = null;
  gameState.selectedSpellCardIndex = null;
  gameState.selectedWindSliceTargets = [];
  gameState.gameOver = false;

  gameState.players.forEach(function (player) {
    resetPlayer(player);
  });
}

function startGame() {
  updateMatchupSettingsFromUI();
  resetGameState();
  hideWinScreen();

  const player1 = gameState.players[0];
  const player2 = gameState.players[1];

  player1.name = `Player 1 (${matchupSettings.player1Element})`;
  player2.name = `Player 2 (${matchupSettings.player2Element})`;

  if (USE_FIXED_DECKS) {
    player1.deck = buildDeck(getDeckIdsForElement(matchupSettings.player1Element));
    player2.deck = buildDeck(getDeckIdsForElement(matchupSettings.player2Element));
  } else {
    player1.deck = [...cards, ...cards, ...cards];
    player2.deck = [...cards, ...cards, ...cards];
  }

  if (SHUFFLE_DECKS) {
    shuffleDeck(player1.deck);
    shuffleDeck(player2.deck);
  }

  const startingHandSize = TEST_MODE ? cards.length : 3;

  for (let i = 0; i < startingHandSize; i++) {
    if (TEST_MODE) {
      drawStartingCard(player1);
      drawStartingCard(player2);
    } else {
      drawCard(player1);
      drawCard(player2);
    }
  }

  if (TEST_MODE) {
    player1.maxChi = 10;
    player1.currentChi = 10;

    player2.maxChi = 10;
    player2.currentChi = 10;
  } else {
    player1.maxChi = 1;
    player1.currentChi = 1;
    player1.hasHadActionPhase = true;

    player2.maxChi = 0;
    player2.currentChi = 0;
    player2.hasHadActionPhase = false;
  }

  showMessage(`${player1.name} starts the game. Action Phase.`);
  logGameStateSnapshot("START GAME");

  renderGame();
}

function drawCard(player) {
  const card = player.deck.shift();

  if (!card) {
    player.fatigueDamage += 1;
    player.hp -= player.fatigueDamage;

    return {
      drewCard: false,
      burnedCard: false,
      fatigueDamage: player.fatigueDamage,
      cardName: null
    };
  }

  if (player.hand.length >= MAX_HAND_SIZE) {
    return {
      drewCard: false,
      burnedCard: true,
      cardName: card.name,
      fatigueDamage: 0
    };
  }

  player.hand.push(card);

  return {
    drewCard: true,
    burnedCard: false,
    cardName: card.name,
    fatigueDamage: 0
  };
}

function drawCardType(player, cardType) {
  const cardIndex = player.deck.findIndex(function (card) {
    return card.type === cardType;
  });

  if (cardIndex === -1) {
    return {
      drewCard: false,
      burnedCard: false,
      noMatchingCard: true,
      cardName: null
    };
  }

  const card = player.deck.splice(cardIndex, 1)[0];

  if (player.hand.length >= MAX_HAND_SIZE) {
    return {
      drewCard: false,
      burnedCard: true,
      noMatchingCard: false,
      cardName: card.name
    };
  }

  player.hand.push(card);

  return {
    drewCard: true,
    burnedCard: false,
    noMatchingCard: false,
    cardName: card.name
  };
}

function resolveBattlecry(player, enemyPlayer, unit) {
  const battlecryMessages = [];

  if (!unit.battlecry) {
    return battlecryMessages;
  }

  if (unit.battlecry.type === "draw_card_type") {
    const amount = unit.battlecry.amount || 1;
    const cardType = unit.battlecry.cardType;

    for (let i = 0; i < amount; i++) {
      const drawResult = drawCardType(player, cardType);

      if (drawResult.drewCard) {
        battlecryMessages.push(`drew ${drawResult.cardName}`);
      }

      if (drawResult.burnedCard) {
        battlecryMessages.push(`hand was full, ${drawResult.cardName} was burned`);
      }

      if (drawResult.noMatchingCard) {
        battlecryMessages.push(`no ${cardType} found in deck`);
      }
    }
  }

  if (unit.battlecry.type === "draw_card_type_with_keyword") {
    const amount = unit.battlecry.amount || 1;
    const cardType = unit.battlecry.cardType;
    const keyword = unit.battlecry.keyword;

    for (let i = 0; i < amount; i++) {
      const drawResult = drawCardTypeWithKeyword(player, cardType, keyword);

      if (drawResult.drewCard) {
        battlecryMessages.push(`drew ${drawResult.cardName}`);
      }

      if (drawResult.burnedCard) {
        battlecryMessages.push(`hand was full, ${drawResult.cardName} was burned`);
      }

      if (drawResult.noMatchingCard) {
        battlecryMessages.push(`no ${keyword} ${cardType} found in deck`);
      }
    }
  }

  if (unit.battlecry.type === "buff_self") {
    const attackBuff = unit.battlecry.buff.attack || 0;
    const healthBuff = unit.battlecry.buff.health || 0;

    unit.attack += attackBuff;
    unit.maxHealth += healthBuff;
    unit.currentHealth += healthBuff;

    battlecryMessages.push(`gained +${attackBuff}/+${healthBuff}`);
  }

  if (unit.battlecry.type === "gain_hero_health") {
    const heal = unit.battlecry.heal || 0;

    gainHeroHealth(player, heal);

    battlecryMessages.push(`gained ${heal} HP`);
  }

  if (unit.battlecry.type === "buff_random_other_friendly_unit") {
    const possibleTargets = player.board.filter(function (friendlyUnit) {
      return friendlyUnit !== unit;
    });

    if (possibleTargets.length === 0) {
      battlecryMessages.push("no other friendly unit to buff");
    } else {
      const randomIndex = Math.floor(Math.random() * possibleTargets.length);
      const targetUnit = possibleTargets[randomIndex];

      const attackBuff = unit.battlecry.buff.attack || 0;
      const healthBuff = unit.battlecry.buff.health || 0;

      targetUnit.attack += attackBuff;
      targetUnit.maxHealth += healthBuff;
      targetUnit.currentHealth += healthBuff;

      battlecryMessages.push(`${targetUnit.name} gained +${attackBuff}/+${healthBuff}`);
    }
  }

  if (unit.battlecry.type === "damage_random_enemy_unit") {
    if (enemyPlayer.board.length === 0) {
      battlecryMessages.push("no enemy unit to damage");
    } else {
      const randomIndex = Math.floor(Math.random() * enemyPlayer.board.length);
      const targetUnit = enemyPlayer.board[randomIndex];

      const damageResult = dealDamageToUnit(targetUnit, unit.battlecry.damage);

      if (damageResult.wasDodged) {
        battlecryMessages.push(`${targetUnit.name} dodged`);
      } else {
        battlecryMessages.push(`dealt ${damageResult.actualDamage} damage to ${targetUnit.name}`);
      }

      if (targetUnit.currentHealth <= 0) {
        enemyPlayer.board.splice(randomIndex, 1);
        battlecryMessages.push(`${targetUnit.name} was destroyed`);
      }
    }
  }

  return battlecryMessages;
}

function drawCardTypeWithKeyword(player, cardType, keyword) {
  const cardIndex = player.deck.findIndex(function (card) {
    return (
      card.type === cardType &&
      card.keywords &&
      card.keywords.includes(keyword)
    );
  });

  if (cardIndex === -1) {
    return {
      drewCard: false,
      burnedCard: false,
      noMatchingCard: true,
      cardName: null
    };
  }

  const card = player.deck.splice(cardIndex, 1)[0];

  if (player.hand.length >= MAX_HAND_SIZE) {
    return {
      drewCard: false,
      burnedCard: true,
      noMatchingCard: false,
      cardName: card.name
    };
  }

  player.hand.push(card);

  return {
    drewCard: true,
    burnedCard: false,
    noMatchingCard: false,
    cardName: card.name
  };
}

function drawStartingCard(player) {
  const card = player.deck.shift();

  if (card) {
    player.hand.push(card);
  }
}

function formatUnitForLog(unit) {
  const keywordText =
    unit.keywords && unit.keywords.length > 0
      ? ` [${unit.keywords.join(", ")}]`
      : "";

  const statusParts = [];

  if (unit.canAttack && !unit.hasAttacked) {
    statusParts.push("Ready");
  } else {
    statusParts.push("Exhausted");
  }

  if (unit.summonedThisTurn) {
    statusParts.push("New");
  }

  if (hasKeyword(unit, "Dodge")) {
    statusParts.push(unit.dodgeUsed ? "Dodge used" : "Dodge ready");
  }

  if (hasKeyword(unit, "Fortify")) {
    statusParts.push(unit.fortifyUsed ? "Fortify used" : "Fortify ready");
  }

  if (unit.skipNextAttack) {
    statusParts.push("Skip next attack");
  }

  if (unit.frozenThisTurn) {
    statusParts.push("Frozen this turn");
  }

  return `${unit.name} ${unit.attack}/${unit.currentHealth}/${unit.maxHealth}${keywordText} (${statusParts.join(", ")})`;
}

function formatBoardForLog(player) {
  if (player.board.length === 0) {
    return "empty";
  }

  return player.board.map(formatUnitForLog).join(" | ");
}

function formatHandForLog(player) {
  if (player.hand.length === 0) {
    return "empty";
  }

  return player.hand
    .map(function (card) {
      return `${card.name} (${card.cost})`;
    })
    .join(", ");
}

function logGameStateSnapshot(label) {
  const player1 = gameState.players[0];
  const player2 = gameState.players[1];

  addGameLogEntry(`--- ${label} SNAPSHOT ---`);

  addGameLogEntry(
    `${player1.name}: HP ${player1.hp} | Chi ${player1.currentChi}/${player1.maxChi} | Hand ${player1.hand.length} | Deck ${player1.deck.length} | Fatigue ${player1.fatigueDamage} | Momentum ${player1.momentumActive ? "ON" : "OFF"}`
  );

  addGameLogEntry(
    `${player1.name} hand: ${formatHandForLog(player1)}`
  );

  addGameLogEntry(
    `${player1.name} board: ${formatBoardForLog(player1)}`
  );

  addGameLogEntry(
    `${player2.name}: HP ${player2.hp} | Chi ${player2.currentChi}/${player2.maxChi} | Hand ${player2.hand.length} | Deck ${player2.deck.length} | Fatigue ${player2.fatigueDamage} | Momentum ${player2.momentumActive ? "ON" : "OFF"}`
  );

  addGameLogEntry(
    `${player2.name} hand: ${formatHandForLog(player2)}`
  );

  addGameLogEntry(
    `${player2.name} board: ${formatBoardForLog(player2)}`
  );

  addGameLogEntry(`--- END SNAPSHOT ---`);
}

function addGameLogEntry(message) {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const playerName = currentPlayer ? currentPlayer.name : "System";
  const phaseName = getPhaseName();

  const logEntry = `[Turn ${gameState.turnNumber} | ${phaseName} | ${playerName}] ${message}`;

  gameState.gameLog.push(logEntry);
}

function showMessage(message) {
  const messageElement = document.getElementById("game-message");
  messageElement.textContent = message;

  addGameLogEntry(message);
}

function getMatchSummaryHtml(winnerPlayer, loserPlayer) {
  const highestMaxChi = Math.max(winnerPlayer.maxChi, loserPlayer.maxChi);

  return `
    <p><strong>Winner:</strong> ${winnerPlayer.name}</p>
    <p><strong>Loser:</strong> ${loserPlayer.name}</p>
    <p><strong>Ended on turn:</strong> ${gameState.turnNumber}</p>
    <p><strong>Highest Chi reached:</strong> ${highestMaxChi}</p>
    <hr />
    <p><strong>${winnerPlayer.name} HP:</strong> ${winnerPlayer.hp}</p>
    <p><strong>${winnerPlayer.name} deck:</strong> ${winnerPlayer.deck.length}</p>
    <p><strong>${winnerPlayer.name} hand:</strong> ${winnerPlayer.hand.length}</p>
    <p><strong>${winnerPlayer.name} board:</strong> ${winnerPlayer.board.length}</p>
    <p><strong>${winnerPlayer.name} fatigue:</strong> ${winnerPlayer.fatigueDamage}</p>
    <hr />
    <p><strong>${loserPlayer.name} HP:</strong> ${loserPlayer.hp}</p>
    <p><strong>${loserPlayer.name} deck:</strong> ${loserPlayer.deck.length}</p>
    <p><strong>${loserPlayer.name} hand:</strong> ${loserPlayer.hand.length}</p>
    <p><strong>${loserPlayer.name} board:</strong> ${loserPlayer.board.length}</p>
    <p><strong>${loserPlayer.name} fatigue:</strong> ${loserPlayer.fatigueDamage}</p>
  `;
}

function showWinScreen(winnerPlayer, loserPlayer) {
  const winScreen = document.getElementById("win-screen");
  const winTitle = document.getElementById("win-title");
  const matchSummary = document.getElementById("match-summary");

  if (!winScreen || !winTitle || !matchSummary) {
    return;
  }

  winTitle.textContent = `${winnerPlayer.name} wins!`;
  matchSummary.innerHTML = getMatchSummaryHtml(winnerPlayer, loserPlayer);

  winScreen.classList.remove("hidden");
}

function hideWinScreen() {
  const winScreen = document.getElementById("win-screen");

  if (!winScreen) {
    return;
  }

  winScreen.classList.add("hidden");
}

function copyGameLog() {
  if (gameState.gameLog.length === 0) {
    showMessage("Game log is empty.");
    return;
  }

  const fullLog = gameState.gameLog.join("\n");

  navigator.clipboard.writeText(fullLog)
    .then(function () {
      showMessage("Game log copied to clipboard.");
    })
    .catch(function () {
      console.log(fullLog);
      showMessage("Could not copy log. Game log was printed in the console.");
    });
}

function clearSelection(message) {
  gameState.selectedAttackerIndex = null;
  gameState.selectedReactionCardIndex = null;
  gameState.selectedSpellCardIndex = null;
  gameState.selectedWindSliceTargets = [];

  showMessage(message);
  renderGame();
}

function hasKeyword(card, keyword) {
  if (!card.keywords) {
    return false;
  }

  return card.keywords.includes(keyword);
}

function playerHasGuardUnit(player) {
  return player.board.some(function (unit) {
    return hasKeyword(unit, "Guard");
  });
}

function restoreHeroHealth(player, amount) {
  player.hp += amount;

  if (player.hp > player.maxHp) {
    player.hp = player.maxHp;
  }
}

function gainHeroHealth(player, amount) {
  player.hp += amount;
}

function dealDamageToUnit(unit, damage) {
  if (damage <= 0) {
    return {
      actualDamage: 0,
      wasDodged: false
    };
  }

  if (hasKeyword(unit, "Dodge") && !unit.dodgeUsed) {
    unit.dodgeUsed = true;

    return {
      actualDamage: 0,
      wasDodged: true
    };
  }

  unit.currentHealth -= damage;

  return {
    actualDamage: damage,
    wasDodged: false
  };
}

function isIgniteActive(player) {
  return player.damagedEnemyHeroThisTurn === true;
}

function getSelectedSpell() {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  return currentPlayer.hand[gameState.selectedSpellCardIndex];
}

function isNoTargetSpell(card) {
  return (
    card &&
    card.type === "spell" &&
    (
      card.spellType === "damage_enemy_units" ||
      card.spellType === "damage_enemy_hero" ||
      card.spellType === "draw_cards" ||
      card.spellType === "gain_hero_health"
    )
  );
}

function selectedSpellTargetsEnemyUnits(card) {
  return (
    card &&
    card.type === "spell" &&
    (
      card.spellType === "damage_enemy_unit" ||
      card.spellType === "damage_two_enemy_units"
    )
  );
}

function selectedSpellCanTargetFriendlyHero(card) {
  return (
    card &&
    card.type === "spell" &&
    card.canTargetHero === true
  );
}

function selectedSpellTargetsFriendlyUnits(card) {
  return (
    card &&
    card.type === "spell" &&
    (
      card.spellType === "heal_friendly_unit" ||
      card.spellType === "buff_friendly_unit"
    )
  );
}

function selectedReactionTargetsFriendlyUnits(card) {
  return (
    card &&
    card.type === "reaction" &&
    (
      card.reactionType === "give_dodge_to_friendly_unit" ||
      card.reactionType === "destroy_friendly_unit_draw_cards"
    )
  );
}

function addElementClassToCard(cardElement, card) {
  if (card.element) {
    cardElement.classList.add(`${card.element.toLowerCase()}-element`);
  } else {
    cardElement.classList.add("neutral-element");
  }
}

function getEnemyPlayerIndex() {
  if (gameState.currentPlayerIndex === 0) {
    return 1;
  }

  return 0;
}

function playCard(cardIndex) {
  if (gameState.gameOver) {
    return;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const card = currentPlayer.hand[cardIndex];

  if (!card) {
    return;
  }

  if (gameState.selectedSpellCardIndex === cardIndex) {
    if (isNoTargetSpell(card)) {
      castNoTargetSpell();
      return;
    }

    clearSelection(`${card.name} selection cancelled.`);
    return;
  }

  if (gameState.selectedReactionCardIndex === cardIndex) {
    clearSelection(`${card.name} selection cancelled.`);
    return;
  }

  if (gameState.phase === "reaction") {
    if (card.type === "reaction") {
      selectReactionCard(cardIndex);
      return;
    }

    if (card.type === "spell" && hasKeyword(card, "Flow")) {
      selectSpellCard(cardIndex);
      return;
    }

    showMessage("Only reaction cards or Flow cards can be played during Reaction Phase.");
    return;
  }

  if (gameState.phase !== "action") {
    showMessage("You can only play normal cards during Action Phase.");
    return;
  }

  if (card.type === "spell") {
    selectSpellCard(cardIndex);
    return;
  }

  gameState.selectedSpellCardIndex = null;
  gameState.selectedReactionCardIndex = null;

  if (card.type !== "unit") {
    showMessage("That card cannot be played right now.");
    return;
  }

  if (currentPlayer.currentChi < card.cost) {
    showMessage("Not enough Chi!");
    return;
  }

  if (currentPlayer.board.length >= MAX_BOARD_SIZE) {
    showMessage("Your board is full.");
    return;
  }

  currentPlayer.currentChi -= card.cost;

  let attack = card.attack;
  let health = card.health;
  let bonusMessage = "";

  if (
    hasKeyword(card, "Ignite") &&
    isIgniteActive(currentPlayer) &&
    card.igniteBuff
  ) {
    const attackBuff = card.igniteBuff.attack || 0;
    const healthBuff = card.igniteBuff.health || 0;

    attack += attackBuff;
    health += healthBuff;

    bonusMessage += ` Ignite activated: +${attackBuff}/+${healthBuff}.`;
  }

  if (
    hasKeyword(card, "Momentum") &&
    currentPlayer.momentumActive &&
    card.momentumBuff
  ) {
    const attackBuff = card.momentumBuff.attack || 0;
    const healthBuff = card.momentumBuff.health || 0;

    attack += attackBuff;
    health += healthBuff;

    bonusMessage += ` Momentum activated: +${attackBuff}/+${healthBuff}.`;
  }

  const unit = {
    ...card,
    attack: attack,
    health: health,
    maxHealth: health,
    currentHealth: health,
    canAttack: hasKeyword(card, "Swift"),
    hasAttacked: false,
    summonedThisTurn: true,
    dodgeUsed: false,
    skipNextAttack: false,
    frozenThisTurn: false,
    fortifyUsed: false
  };

  currentPlayer.board.push(unit);
  currentPlayer.hand.splice(cardIndex, 1);

  const enemyPlayer = gameState.players[getEnemyPlayerIndex()];
  const battlecryMessages = resolveBattlecry(currentPlayer, enemyPlayer, unit);

  let message = "";

  if (hasKeyword(card, "Swift")) {
    message = `${card.name} was played. It can attack immediately!${bonusMessage}`;
  } else {
    message = `${card.name} was played. It can attack next turn.${bonusMessage}`;
  }

  if (battlecryMessages.length > 0) {
    message += ` Battlecry: ${battlecryMessages.join(", ")}.`;
  }

  showMessage(message);

  renderGame();
}

function selectSpellCard(cardIndex) {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const card = currentPlayer.hand[cardIndex];

  if (!card || card.type !== "spell") {
    return;
  }

  if (currentPlayer.currentChi < card.cost) {
    showMessage("Not enough Chi for this move.");
    return;
  }

  gameState.selectedAttackerIndex = null;
  gameState.selectedReactionCardIndex = null;
  gameState.selectedSpellCardIndex = cardIndex;
  gameState.selectedWindSliceTargets = [];

  if (isNoTargetSpell(card)) {
    showMessage(`${card.name} selected. Click this card again to confirm.`);
    renderGame();
    return;
  }

  if (card.spellType === "damage_enemy_unit") {
    showMessage(`${card.name} selected. Click an enemy unit.`);
    renderGame();
    return;
  }

  if (card.spellType === "damage_two_enemy_units") {
    showMessage(`${card.name} selected. Click the first enemy unit.`);
    renderGame();
    return;
  }

  if (card.spellType === "heal_friendly_unit") {
    showMessage(`${card.name} selected. Click one of your units.`);
    renderGame();
    return;
  }

  if (card.spellType === "buff_friendly_unit") {
    showMessage(`${card.name} selected. Click one of your units.`);
    renderGame();
    return;
  }

  showMessage(`${card.name} selected. Choose a target.`);
  renderGame();
}

function selectReactionCard(cardIndex) {
  const reactingPlayer = gameState.players[gameState.currentPlayerIndex];
  const card = reactingPlayer.hand[cardIndex];

  if (!card || card.type !== "reaction") {
    return;
  }

  if (reactingPlayer.currentChi < card.cost) {
    showMessage("Not enough Chi for this reaction.");
    return;
  }

  gameState.selectedAttackerIndex = null;
  gameState.selectedSpellCardIndex = null;
  gameState.selectedReactionCardIndex = cardIndex;

  if (selectedReactionTargetsFriendlyUnits(card)) {
    showMessage(`${card.name} selected. Click one of your units.`);
    renderGame();
    return;
  }

  showMessage(`${card.name} selected. Click an enemy unit summoned this turn.`);

  renderGame();
}

function playReactionOnEnemyUnit(enemyUnitIndex) {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.phase !== "reaction") {
    return;
  }

  if (gameState.selectedReactionCardIndex === null) {
    showMessage("Select a reaction card first.");
    return;
  }

  const reactingPlayer = gameState.players[gameState.currentPlayerIndex];
  const enemyPlayer = gameState.players[getEnemyPlayerIndex()];

  const reactionCard = reactingPlayer.hand[gameState.selectedReactionCardIndex];
  const targetUnit = enemyPlayer.board[enemyUnitIndex];

  if (!reactionCard || reactionCard.type !== "reaction") {
    showMessage("Selected card is not a reaction.");
    gameState.selectedReactionCardIndex = null;
    return;
  }

  if (!targetUnit) {
    showMessage("No target found.");
    return;
  }

  if (!targetUnit.summonedThisTurn) {
    showMessage("You can only counter a unit summoned this turn.");
    return;
  }

  if (reactingPlayer.currentChi < reactionCard.cost) {
    showMessage("Not enough Chi for this reaction.");
    return;
  }

  if (reactionCard.reactionType === "destroy_summoned_unit") {
    reactingPlayer.currentChi -= reactionCard.cost;

    enemyPlayer.board.splice(enemyUnitIndex, 1);
    reactingPlayer.hand.splice(gameState.selectedReactionCardIndex, 1);

    reactingPlayer.playedReactionThisReactionPhase = true;

    showMessage(`${reactionCard.name} destroyed ${targetUnit.name}.`);

    gameState.selectedReactionCardIndex = null;

    renderGame();
    return;
  }

  if (reactionCard.reactionType === "freeze_summoned_unit") {
    reactingPlayer.currentChi -= reactionCard.cost;

    targetUnit.skipNextAttack = true;

    reactingPlayer.hand.splice(gameState.selectedReactionCardIndex, 1);

    reactingPlayer.playedReactionThisReactionPhase = true;

    showMessage(`${reactionCard.name} stopped ${targetUnit.name}. It can't attack next turn.`);

    gameState.selectedReactionCardIndex = null;

    renderGame();
    return;
  }

  if (reactionCard.reactionType === "damage_summoned_unit") {
    reactingPlayer.currentChi -= reactionCard.cost;

    const damageResult = dealDamageToUnit(targetUnit, reactionCard.damage);

    let message = "";

    if (damageResult.wasDodged) {
      message = `${targetUnit.name} dodged ${reactionCard.name}.`;
    } else {
      message = `${reactionCard.name} dealt ${damageResult.actualDamage} damage to ${targetUnit.name}.`;
    }

    if (targetUnit.currentHealth <= 0) {
      enemyPlayer.board.splice(enemyUnitIndex, 1);
      message += ` ${targetUnit.name} was destroyed.`;
    }

    reactingPlayer.hand.splice(gameState.selectedReactionCardIndex, 1);

    reactingPlayer.playedReactionThisReactionPhase = true;

    showMessage(message);

    gameState.selectedReactionCardIndex = null;

    renderGame();
    return;
  }

  if (reactionCard.reactionType === "weaken_summoned_unit") {
    reactingPlayer.currentChi -= reactionCard.cost;

    targetUnit.attack -= reactionCard.attackDebuff;

    if (targetUnit.attack < 0) {
      targetUnit.attack = 0;
    }

    reactingPlayer.hand.splice(gameState.selectedReactionCardIndex, 1);

    reactingPlayer.playedReactionThisReactionPhase = true;

    showMessage(`${reactionCard.name} weakened ${targetUnit.name}. It lost ${reactionCard.attackDebuff} Attack.`);

    gameState.selectedReactionCardIndex = null;

    renderGame();
    return;
  }

  showMessage("This reaction effect is not implemented yet.");
}

function playReactionOnFriendlyUnit(friendlyUnitIndex) {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.phase !== "reaction") {
    return;
  }

  if (gameState.selectedReactionCardIndex === null) {
    showMessage("Select a reaction card first.");
    return;
  }

  const reactingPlayer = gameState.players[gameState.currentPlayerIndex];

  const reactionCard = reactingPlayer.hand[gameState.selectedReactionCardIndex];
  const targetUnit = reactingPlayer.board[friendlyUnitIndex];

  if (!reactionCard || reactionCard.type !== "reaction") {
    showMessage("Selected card is not a reaction.");
    gameState.selectedReactionCardIndex = null;
    return;
  }

  if (!selectedReactionTargetsFriendlyUnits(reactionCard)) {
    showMessage("This reaction cannot target a friendly unit.");
    return;
  }

  if (!targetUnit) {
    showMessage("No friendly unit found.");
    return;
  }

  if (reactingPlayer.currentChi < reactionCard.cost) {
    showMessage("Not enough Chi for this reaction.");
    return;
  }

  if (reactionCard.reactionType === "give_dodge_to_friendly_unit") {
    reactingPlayer.currentChi -= reactionCard.cost;

    if (!targetUnit.keywords) {
      targetUnit.keywords = [];
    }

    if (!hasKeyword(targetUnit, "Dodge")) {
      targetUnit.keywords.push("Dodge");
    }

    targetUnit.dodgeUsed = false;

    reactingPlayer.hand.splice(gameState.selectedReactionCardIndex, 1);

    reactingPlayer.playedReactionThisReactionPhase = true;

    showMessage(`${reactionCard.name} gave Dodge to ${targetUnit.name}.`);

    gameState.selectedReactionCardIndex = null;

    renderGame();
    return;
  }

  if (reactionCard.reactionType === "destroy_friendly_unit_draw_cards") {
    reactingPlayer.currentChi -= reactionCard.cost;

    const destroyedUnitName = targetUnit.name;
    const drawAmount = reactionCard.drawAmount || 0;

    reactingPlayer.board.splice(friendlyUnitIndex, 1);
    reactingPlayer.hand.splice(gameState.selectedReactionCardIndex, 1);

    const drawMessages = [];

    for (let i = 0; i < drawAmount; i++) {
      const drawResult = drawCard(reactingPlayer);

      if (drawResult.drewCard) {
        drawMessages.push(`drew ${drawResult.cardName}`);
      }

      if (drawResult.burnedCard) {
        drawMessages.push(`hand was full, ${drawResult.cardName} was burned`);
      }

      if (drawResult.fatigueDamage > 0) {
        drawMessages.push(`took ${drawResult.fatigueDamage} fatigue damage`);
      }
    }

    reactingPlayer.playedReactionThisReactionPhase = true;

    gameState.selectedReactionCardIndex = null;

    let message = `${reactionCard.name} destroyed ${destroyedUnitName}.`;

    if (drawMessages.length > 0) {
      message += ` ${drawMessages.join(", ")}.`;
    }

    showMessage(message);

    checkGameOver();

    renderGame();
    return;
  }

  showMessage("This friendly reaction effect is not implemented yet.");
}

function endTurn() {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.phase === "action") {
    startReactionPhase();
  } else if (gameState.phase === "reaction") {
    startActionPhase();
  }
}

function startReactionPhase() {
  logGameStateSnapshot("END ACTION PHASE");

  gameState.selectedAttackerIndex = null;
  gameState.selectedReactionCardIndex = null;
  gameState.selectedSpellCardIndex = null;
  gameState.selectedWindSliceTargets = [];

  gameState.currentPlayerIndex = getEnemyPlayerIndex();
  gameState.phase = "reaction";

  const reactingPlayer = gameState.players[gameState.currentPlayerIndex];

  if (!reactingPlayer.hasHadActionPhase && reactingPlayer.maxChi === 0) {
    reactingPlayer.maxChi = 1;
    reactingPlayer.currentChi = 1;
  }

  showMessage(`${reactingPlayer.name}'s Reaction Phase. React or pass.`);

  renderGame();
}

function startActionPhase() {
  gameState.turnNumber += 1;

  gameState.selectedAttackerIndex = null;
  gameState.selectedReactionCardIndex = null;
  gameState.selectedSpellCardIndex = null;
  gameState.selectedWindSliceTargets = [];

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const previousActionPlayer = gameState.players[getEnemyPlayerIndex()];

  clearSummonedThisTurn(previousActionPlayer);

  currentPlayer.momentumActive = currentPlayer.playedReactionThisReactionPhase;
  currentPlayer.playedReactionThisReactionPhase = false;

  gameState.phase = "action";

  currentPlayer.damagedEnemyHeroThisTurn = false;

  if (TEST_MODE) {
    currentPlayer.maxChi = 10;
    currentPlayer.currentChi = 10;
    currentPlayer.hasHadActionPhase = true;
  } else {
    if (!currentPlayer.hasHadActionPhase) {
      currentPlayer.maxChi = 1;
      currentPlayer.hasHadActionPhase = true;
    } else if (currentPlayer.maxChi < 10) {
      currentPlayer.maxChi += 1;
    }

    currentPlayer.currentChi = currentPlayer.maxChi;
  }

  const drawResult = drawCard(currentPlayer);
  const fortifyMessages = applyFortifyBonuses(currentPlayer);
  prepareUnitsForTurn(currentPlayer);

  let actionPhaseMessage = `${currentPlayer.name}'s Action Phase started.`;

  if (drawResult.burnedCard) {
    actionPhaseMessage += ` Hand is full, ${drawResult.cardName} was burned.`;
  }

  if (drawResult.fatigueDamage > 0) {
    actionPhaseMessage += ` Deck is empty. ${currentPlayer.name} takes ${drawResult.fatigueDamage} fatigue damage.`;
  }

  if (
    !drawResult.drewCard &&
    !drawResult.burnedCard &&
    drawResult.fatigueDamage === 0
  ) {
    actionPhaseMessage += " Deck is empty.";
  }

  if (currentPlayer.momentumActive) {
    actionPhaseMessage += " Momentum is active!";
  }

  if (fortifyMessages.length > 0) {
    actionPhaseMessage += ` Fortify: ${fortifyMessages.join(", ")}.`;
  }

  checkGameOver();

  if (gameState.gameOver) {
    renderGame();
    return;
  }

  showMessage(actionPhaseMessage);
  logGameStateSnapshot("START ACTION PHASE");

  renderGame();
}

function applyFortifyBonuses(player) {
  const fortifyMessages = [];

  player.board.forEach(function (unit) {
    if (!hasKeyword(unit, "Fortify")) {
      return;
    }

    if (!unit.fortifyBuff) {
      return;
    }

    if (unit.summonedThisTurn) {
      return;
    }

    if (unit.fortifyUsed) {
      return;
    }

    const attackBuff = unit.fortifyBuff.attack || 0;
    const healthBuff = unit.fortifyBuff.health || 0;

    unit.attack += attackBuff;
    unit.maxHealth += healthBuff;
    unit.currentHealth += healthBuff;

    unit.fortifyUsed = true;

    fortifyMessages.push(`${unit.name} gained +${attackBuff}/+${healthBuff}`);
  });

  return fortifyMessages;
}

function clearSummonedThisTurn(player) {
  player.board.forEach(function (unit) {
    unit.summonedThisTurn = false;
  });
}

function prepareUnitsForTurn(player) {
  player.board.forEach(function (unit) {
    if (unit.skipNextAttack) {
      unit.canAttack = false;
      unit.hasAttacked = true;
      unit.skipNextAttack = false;
      unit.frozenThisTurn = true;
      return;
    }

    unit.canAttack = true;
    unit.hasAttacked = false;
    unit.frozenThisTurn = false;
  });
}

function selectAttacker(unitIndex) {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.phase !== "action") {
    showMessage("You cannot attack during Reaction Phase.");
    return;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const unit = currentPlayer.board[unitIndex];

  if (!unit) {
    return;
  }

  if (gameState.selectedAttackerIndex === unitIndex) {
    clearSelection(`${unit.name} is no longer selected.`);
    return;
  }

  if (!unit.canAttack || unit.hasAttacked) {
    showMessage(`${unit.name} cannot attack right now.`);
    return;
  }

  if (unit.attack <= 0) {
    showMessage(`${unit.name} has 0 Attack and cannot attack.`);
    return;
  }

  gameState.selectedSpellCardIndex = null;
  gameState.selectedAttackerIndex = unitIndex;

  showMessage(`${unit.name} is ready to attack. Click the enemy hero or enemy unit.`);

  renderGame();
}

function castSpellOnEnemyUnit(enemyUnitIndex) {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.selectedSpellCardIndex === null) {
    showMessage("Select a spell first.");
    return;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const enemyPlayer = gameState.players[getEnemyPlayerIndex()];

  const spellCard = currentPlayer.hand[gameState.selectedSpellCardIndex];
  const targetUnit = enemyPlayer.board[enemyUnitIndex];

  if (!spellCard || spellCard.type !== "spell") {
    showMessage("Selected card is not a spell.");
    gameState.selectedSpellCardIndex = null;
    return;
  }

  const canCastDuringAction = gameState.phase === "action";
  const canCastDuringReaction =
    gameState.phase === "reaction" && hasKeyword(spellCard, "Flow");

  if (!canCastDuringAction && !canCastDuringReaction) {
    showMessage("This spell cannot be played during this phase.");
    return;
  }

  if (!targetUnit) {
    showMessage("No target found.");
    return;
  }

  if (currentPlayer.currentChi < spellCard.cost) {
    showMessage("Not enough Chi for this spell.");
    return;
  }

  if (spellCard.spellType === "damage_enemy_unit") {
    currentPlayer.currentChi -= spellCard.cost;

    const damageResult = dealDamageToUnit(targetUnit, spellCard.damage);

    let message = "";

    if (damageResult.wasDodged) {
      message = `${targetUnit.name} dodged ${spellCard.name}.`;
    } else {
      message = `${spellCard.name} dealt ${damageResult.actualDamage} damage to ${targetUnit.name}.`;
    }

    if (spellCard.preventsNextAttack && targetUnit.currentHealth > 0) {
      targetUnit.skipNextAttack = true;
      message += ` ${targetUnit.name} can't attack next turn.`;
    }

    currentPlayer.hand.splice(gameState.selectedSpellCardIndex, 1);

    if (targetUnit.currentHealth <= 0) {
      enemyPlayer.board.splice(enemyUnitIndex, 1);
      message += ` ${targetUnit.name} was destroyed.`;
    }

    gameState.selectedSpellCardIndex = null;
    gameState.selectedWindSliceTargets = [];

    showMessage(message);
    renderGame();
    return;
  }

  showMessage("This spell cannot target an enemy unit.");
}

function selectWindSliceTarget(enemyUnitIndex) {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.selectedSpellCardIndex === null) {
    showMessage("Select Wind Slice first.");
    return;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const enemyPlayer = gameState.players[getEnemyPlayerIndex()];

  const spellCard = currentPlayer.hand[gameState.selectedSpellCardIndex];
  const targetUnit = enemyPlayer.board[enemyUnitIndex];

  if (!spellCard || spellCard.spellType !== "damage_two_enemy_units") {
    showMessage("Selected move does not choose two targets.");
    return;
  }

  const canCastDuringAction = gameState.phase === "action";
  const canCastDuringReaction =
    gameState.phase === "reaction" && hasKeyword(spellCard, "Flow");

  if (!canCastDuringAction && !canCastDuringReaction) {
    showMessage("This move cannot be played during this phase.");
    return;
  }

  if (enemyPlayer.board.length < 2) {
    showMessage(`${spellCard.name} needs at least two enemy units.`);
    return;
  }

  if (!targetUnit) {
    showMessage("No target found.");
    return;
  }

  if (currentPlayer.currentChi < spellCard.cost) {
    showMessage("Not enough Chi for this move.");
    return;
  }

  if (gameState.selectedWindSliceTargets.includes(enemyUnitIndex)) {
    showMessage("You already selected that unit. Choose a different one.");
    return;
  }

  gameState.selectedWindSliceTargets.push(enemyUnitIndex);

  if (gameState.selectedWindSliceTargets.length === 1) {
    showMessage(`${targetUnit.name} selected. Choose one more enemy unit.`);
    renderGame();
    return;
  }

  currentPlayer.currentChi -= spellCard.cost;

  const hitMessages = [];

  gameState.selectedWindSliceTargets.forEach(function (targetIndex) {
    const unit = enemyPlayer.board[targetIndex];

    if (!unit) {
      return;
    }

    const damageResult = dealDamageToUnit(unit, spellCard.damage);

    if (damageResult.wasDodged) {
      hitMessages.push(`${unit.name} dodged`);
    } else {
      hitMessages.push(`${unit.name} took ${damageResult.actualDamage}`);
    }
  });

  const destroyedUnits = [];

  for (let i = enemyPlayer.board.length - 1; i >= 0; i--) {
    if (enemyPlayer.board[i].currentHealth <= 0) {
      destroyedUnits.push(enemyPlayer.board[i].name);
      enemyPlayer.board.splice(i, 1);
    }
  }

  currentPlayer.hand.splice(gameState.selectedSpellCardIndex, 1);

  gameState.selectedSpellCardIndex = null;
  gameState.selectedWindSliceTargets = [];

  let message = `${spellCard.name}: ${hitMessages.join(", ")}.`;

  if (destroyedUnits.length > 0) {
    message += ` Destroyed: ${destroyedUnits.join(", ")}.`;
  }

  showMessage(message);
  renderGame();
}

function castNoTargetSpell() {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.selectedSpellCardIndex === null) {
    showMessage("Select a spell first.");
    return;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const enemyPlayer = gameState.players[getEnemyPlayerIndex()];

  const spellCard = currentPlayer.hand[gameState.selectedSpellCardIndex];

  if (!isNoTargetSpell(spellCard)) {
    showMessage("This spell needs a target.");
    return;
  }

  const canCastDuringAction = gameState.phase === "action";
  const canCastDuringReaction =
    gameState.phase === "reaction" && hasKeyword(spellCard, "Flow");

  if (!canCastDuringAction && !canCastDuringReaction) {
    showMessage("This spell cannot be played during this phase.");
    return;
  }

  if (currentPlayer.currentChi < spellCard.cost) {
    showMessage("Not enough Chi for this spell.");
    return;
  }

  if (spellCard.spellType === "damage_enemy_units") {
    if (enemyPlayer.board.length === 0) {
      showMessage("No enemy units to hit.");
      return;
    }

    currentPlayer.currentChi -= spellCard.cost;

    let numberOfHits = 1;

    if (hasKeyword(spellCard, "Momentum") && currentPlayer.momentumActive) {
      numberOfHits = 2;
    }

    for (let hit = 0; hit < numberOfHits; hit++) {
      enemyPlayer.board.forEach(function (unit) {
        dealDamageToUnit(unit, spellCard.damage);
      });
    }

    const destroyedUnits = [];

    for (let i = enemyPlayer.board.length - 1; i >= 0; i--) {
      if (enemyPlayer.board[i].currentHealth <= 0) {
        destroyedUnits.push(enemyPlayer.board[i].name);
        enemyPlayer.board.splice(i, 1);
      }
    }

    currentPlayer.hand.splice(gameState.selectedSpellCardIndex, 1);
    gameState.selectedSpellCardIndex = null;

    let message = `${spellCard.name} dealt ${spellCard.damage} damage to all enemy units.`;

    if (hasKeyword(spellCard, "Momentum") && currentPlayer.momentumActive) {
      message += ` Momentum activated: dealt ${spellCard.damage} damage again.`;
    }

    if (destroyedUnits.length > 0) {
      message += ` Destroyed: ${destroyedUnits.join(", ")}.`;
    }

    showMessage(message);
    renderGame();
    return;
  }

  if (spellCard.spellType === "damage_enemy_hero") {
    currentPlayer.currentChi -= spellCard.cost;

    let damage = spellCard.damage;

    const igniteWasActive = isIgniteActive(currentPlayer);

    if (igniteWasActive && spellCard.igniteDamage) {
      damage = spellCard.igniteDamage;
    }

    enemyPlayer.hp -= damage;
    currentPlayer.damagedEnemyHeroThisTurn = true;

    currentPlayer.hand.splice(gameState.selectedSpellCardIndex, 1);
    gameState.selectedSpellCardIndex = null;

    let message = `${spellCard.name} dealt ${damage} damage to ${enemyPlayer.name}.`;

    if (igniteWasActive && spellCard.igniteDamage) {
      message += " Ignite activated.";
    }

    showMessage(message);

    checkGameOver();
    renderGame();
    return;
  }

  if (spellCard.spellType === "draw_cards") {
    currentPlayer.currentChi -= spellCard.cost;

    let drawAmount = spellCard.drawAmount || 0;
    const igniteWasActive = isIgniteActive(currentPlayer);

    if (igniteWasActive && spellCard.igniteDrawAmount) {
      drawAmount += spellCard.igniteDrawAmount;
    }

    const momentumWasActive =
      hasKeyword(spellCard, "Momentum") &&
      currentPlayer.momentumActive &&
      spellCard.momentumDrawAmount;

    if (momentumWasActive) {
      drawAmount += spellCard.momentumDrawAmount;
    }

    const drawMessages = [];

    currentPlayer.hand.splice(gameState.selectedSpellCardIndex, 1);
    gameState.selectedSpellCardIndex = null;

    for (let i = 0; i < drawAmount; i++) {
      const drawResult = drawCard(currentPlayer);

      if (drawResult.drewCard) {
        drawMessages.push(`drew ${drawResult.cardName}`);
      }

      if (drawResult.burnedCard) {
        drawMessages.push(`hand was full, ${drawResult.cardName} was burned`);
      }

      if (drawResult.fatigueDamage > 0) {
        drawMessages.push(`took ${drawResult.fatigueDamage} fatigue damage`);
      }
    }

    let message = `${spellCard.name}: drew ${drawAmount} card(s).`;

    if (igniteWasActive && spellCard.igniteDrawAmount) {
      message += " Ignite activated.";
    }

    if (momentumWasActive) {
      message += " Momentum activated.";
    }

    if (drawMessages.length > 0) {
      message += ` ${drawMessages.join(", ")}.`;
    }

    showMessage(message);

    checkGameOver();
    renderGame();
    return;
  }

  if (spellCard.spellType === "gain_hero_health") {
    currentPlayer.currentChi -= spellCard.cost;

    currentPlayer.hp += spellCard.heal;

    currentPlayer.hand.splice(gameState.selectedSpellCardIndex, 1);
    gameState.selectedSpellCardIndex = null;

    showMessage(`${spellCard.name}: ${currentPlayer.name} gained ${spellCard.heal} HP.`);

    renderGame();
    return;
  }

  showMessage("This no-target spell effect is not implemented yet.");
}

function castSpellOnFriendlyHero() {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.selectedSpellCardIndex === null) {
    return;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const spellCard = currentPlayer.hand[gameState.selectedSpellCardIndex];

  if (!selectedSpellCanTargetFriendlyHero(spellCard)) {
    return;
  }

  const canCastDuringAction = gameState.phase === "action";
  const canCastDuringReaction =
    gameState.phase === "reaction" && hasKeyword(spellCard, "Flow");

  if (!canCastDuringAction && !canCastDuringReaction) {
    showMessage("This move cannot be played during this phase.");
    return;
  }

  if (currentPlayer.currentChi < spellCard.cost) {
    showMessage("Not enough Chi for this move.");
    return;
  }

  currentPlayer.currentChi -= spellCard.cost;
  currentPlayer.hp += spellCard.heal;

  currentPlayer.hand.splice(gameState.selectedSpellCardIndex, 1);
  gameState.selectedSpellCardIndex = null;

  showMessage(`${spellCard.name} restored ${spellCard.heal} HP to ${currentPlayer.name}.`);

  renderGame();
}

function castSpellOnFriendlyUnit(friendlyUnitIndex) {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.selectedSpellCardIndex === null) {
    showMessage("Select a move first.");
    return;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const spellCard = currentPlayer.hand[gameState.selectedSpellCardIndex];
  const targetUnit = currentPlayer.board[friendlyUnitIndex];

  if (!spellCard || spellCard.type !== "spell") {
    showMessage("Selected card is not a move.");
    gameState.selectedSpellCardIndex = null;
    return;
  }

  const canCastDuringAction = gameState.phase === "action";
  const canCastDuringReaction =
    gameState.phase === "reaction" && hasKeyword(spellCard, "Flow");

  if (!canCastDuringAction && !canCastDuringReaction) {
    showMessage("This move cannot be played during this phase.");
    return;
  }

  if (!targetUnit) {
    showMessage("No target found.");
    return;
  }

  if (currentPlayer.currentChi < spellCard.cost) {
    showMessage("Not enough Chi for this move.");
    return;
  }

  if (spellCard.spellType === "heal_friendly_unit") {
    currentPlayer.currentChi -= spellCard.cost;

    targetUnit.currentHealth += spellCard.heal;

    if (targetUnit.currentHealth > targetUnit.maxHealth) {
      targetUnit.currentHealth = targetUnit.maxHealth;
    }

    currentPlayer.hand.splice(gameState.selectedSpellCardIndex, 1);
    gameState.selectedSpellCardIndex = null;

    showMessage(`${spellCard.name} restored ${spellCard.heal} HP to ${targetUnit.name}.`);

    renderGame();
    return;
  }

  if (spellCard.spellType === "buff_friendly_unit") {
    currentPlayer.currentChi -= spellCard.cost;

    targetUnit.attack += spellCard.buff.attack;
    targetUnit.maxHealth += spellCard.buff.health;
    targetUnit.currentHealth += spellCard.buff.health;

    currentPlayer.hand.splice(gameState.selectedSpellCardIndex, 1);
    gameState.selectedSpellCardIndex = null;

    showMessage(
      `${spellCard.name} gave ${targetUnit.name} +${spellCard.buff.attack}/+${spellCard.buff.health}.`
    );

    renderGame();
    return;
  }

  showMessage("This move cannot target a friendly unit.");
}

function attackEnemyUnit(enemyUnitIndex) {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.phase !== "action") {
    showMessage("You cannot attack during Reaction Phase.");
    return;
  }

  if (gameState.selectedAttackerIndex === null) {
    showMessage("Select one of your units first.");
    return;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const enemyPlayer = gameState.players[getEnemyPlayerIndex()];

  const attacker = currentPlayer.board[gameState.selectedAttackerIndex];
  const defender = enemyPlayer.board[enemyUnitIndex];

  if (!attacker) {
    showMessage("Selected unit no longer exists.");
    gameState.selectedAttackerIndex = null;
    return;
  }

  if (!defender) {
    showMessage("Enemy unit no longer exists.");
    gameState.selectedAttackerIndex = null;
    return;
  }

  if (!attacker.canAttack || attacker.hasAttacked) {
    showMessage(`${attacker.name} cannot attack right now.`);
    gameState.selectedAttackerIndex = null;
    return;
  }

  if (attacker.attack <= 0) {
    showMessage(`${attacker.name} has 0 Attack and cannot attack.`);
    gameState.selectedAttackerIndex = null;
    renderGame();
    return;
  }

  if (playerHasGuardUnit(enemyPlayer) && !hasKeyword(defender, "Guard")) {
    showMessage("Enemy has a Guard unit. You must attack it first.");
    return;
  }

  const defenderDamageResult = dealDamageToUnit(defender, attacker.attack);
  const attackerDamageResult = dealDamageToUnit(attacker, defender.attack);

  attacker.hasAttacked = true;
  attacker.canAttack = false;

  let message = `${attacker.name} attacked ${defender.name}. `;

  if (defenderDamageResult.wasDodged) {
    message += `${defender.name} dodged the attack. `;
  } else {
    message += `${defender.name} took ${defenderDamageResult.actualDamage} damage. `;
  }

  if (attackerDamageResult.wasDodged) {
    message += `${attacker.name} dodged the counterattack. `;
  } else {
    message += `${attacker.name} took ${attackerDamageResult.actualDamage} damage. `;
  }

  if (attacker.currentHealth <= 0) {
    message += `${attacker.name} was destroyed. `;
  }

  if (defender.currentHealth <= 0) {
    message += `${defender.name} was destroyed.`;
  }

  if (defender.currentHealth <= 0) {
    enemyPlayer.board.splice(enemyUnitIndex, 1);
  }

  if (attacker.currentHealth <= 0) {
    currentPlayer.board.splice(gameState.selectedAttackerIndex, 1);
  }

  gameState.selectedAttackerIndex = null;

  showMessage(message);

  renderGame();
}

function attackEnemyHero() {
  if (gameState.gameOver) {
    return;
  }

  if (gameState.phase !== "action") {
    showMessage("You cannot attack during Reaction Phase.");
    return;
  }

  if (gameState.selectedSpellCardIndex !== null) {
    const selectedSpell = getSelectedSpell();

    if (isNoTargetSpell(selectedSpell)) {
      showMessage(`${selectedSpell.name} does not need a target. Click the card again to confirm.`);
      return;
    }

    showMessage("This move cannot target the enemy hero.");
    return;
  }

  if (gameState.selectedAttackerIndex === null) {
    showMessage("Select one of your units first.");
    return;
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const enemyPlayer = gameState.players[getEnemyPlayerIndex()];

  const attacker = currentPlayer.board[gameState.selectedAttackerIndex];

  if (!attacker) {
    showMessage("Selected unit no longer exists.");
    gameState.selectedAttackerIndex = null;
    return;
  }

  if (!attacker.canAttack || attacker.hasAttacked) {
    showMessage(`${attacker.name} cannot attack right now.`);
    gameState.selectedAttackerIndex = null;
    return;
  }

  if (attacker.attack <= 0) {
    showMessage(`${attacker.name} has 0 Attack and cannot attack.`);
    gameState.selectedAttackerIndex = null;
    renderGame();
    return;
  }

  if (playerHasGuardUnit(enemyPlayer)) {
    showMessage("Enemy has a Guard unit. You must attack it first.");
    return;
  }

  enemyPlayer.hp -= attacker.attack;
  currentPlayer.damagedEnemyHeroThisTurn = true;

  attacker.hasAttacked = true;
  attacker.canAttack = false;

  showMessage(`${attacker.name} attacked ${enemyPlayer.name} for ${attacker.attack} damage!`);

  gameState.selectedAttackerIndex = null;

  checkGameOver();

  renderGame();
}

function checkGameOver() {
  const player1 = gameState.players[0];
  const player2 = gameState.players[1];

  if (player1.hp <= 0) {
    gameState.gameOver = true;
    showMessage(`${player2.name} wins!`);
    showWinScreen(player2, player1);
    return;
  }

  if (player2.hp <= 0) {
    gameState.gameOver = true;
    showMessage(`${player1.name} wins!`);
    showWinScreen(player1, player2);
    return;
  }
}

function getPhaseName() {
  if (gameState.phase === "action") {
    return "Action Phase";
  }

  return "Reaction Phase";
}

function renderGame() {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const enemyPlayer = gameState.players[getEnemyPlayerIndex()];

  document.getElementById("player-name").textContent = currentPlayer.name;
  document.getElementById("player-hp").textContent = currentPlayer.hp;
  document.getElementById("player-chi").textContent = currentPlayer.currentChi;
  document.getElementById("player-max-chi").textContent = currentPlayer.maxChi;
  document.getElementById("player-deck-count").textContent = currentPlayer.deck.length;
  document.getElementById("player-hand-count").textContent = currentPlayer.hand.length;

  document.getElementById("enemy-name").textContent = enemyPlayer.name;
  document.getElementById("enemy-hp").textContent = enemyPlayer.hp;
  document.getElementById("enemy-chi").textContent = enemyPlayer.currentChi;
  document.getElementById("enemy-max-chi").textContent = enemyPlayer.maxChi;
  document.getElementById("enemy-deck-count").textContent = enemyPlayer.deck.length;
  document.getElementById("enemy-hand-count").textContent = enemyPlayer.hand.length;

  const phaseElement = document.getElementById("phase-name");

  if (phaseElement) {
    phaseElement.textContent = getPhaseName();
  }

  const endTurnButton = document.getElementById("end-turn-button");

  if (gameState.phase === "action") {
    endTurnButton.textContent = "End Action Phase";
  } else {
    endTurnButton.textContent = "Pass Reaction";
  }

  const enemyArea = document.querySelector(".enemy");

  if (enemyArea) {
    enemyArea.classList.remove("valid-hero-target", "blocked-hero-target");

    const selectedSpell = getSelectedSpell();

    if (
      gameState.phase === "action" &&
      gameState.selectedAttackerIndex !== null &&
      !selectedSpell
    ) {
      if (playerHasGuardUnit(enemyPlayer)) {
        enemyArea.classList.add("blocked-hero-target");
      } else {
        enemyArea.classList.add("valid-hero-target");
      }
    }
  }

  renderHand(currentPlayer);
  renderBoard(currentPlayer, "player-board");
  renderBoard(enemyPlayer, "enemy-board");
}

function getCardTypeLabel(type) {
  if (type === "spell") {
    return "Move";
  }

  if (type === "unit") {
    return "Unit";
  }

  if (type === "reaction") {
    return "Reaction";
  }

  return type;
}

function renderHand(player) {
  const handElement = document.getElementById("player-hand");

  handElement.innerHTML = "";

  player.hand.forEach(function (card, index) {
    const cardElement = document.createElement("div");

    cardElement.classList.add("card");
    cardElement.classList.add(`${card.type}-card`);
    addElementClassToCard(cardElement, card);

    if (
      gameState.phase === "reaction" &&
      gameState.selectedReactionCardIndex === index
    ) {
      cardElement.classList.add("selected-reaction-card");
    }

    if (gameState.selectedSpellCardIndex === index) {
      cardElement.classList.add("selected-spell-card");
    }

    cardElement.addEventListener("click", function (event) {
      event.stopPropagation();
      playCard(index);
    });
    let cardDetails = "";

    if (card.type === "unit") {
      cardDetails = `
        <p>Attack: ${card.attack}</p>
        <p>HP: ${card.health}</p>
      `;
    }

    if (card.type === "reaction") {
      cardDetails = `
        <p>Timing: Reaction Phase</p>
      `;
    }

    let keywordText = "";

    if (card.keywords) {
      keywordText = `<p>Keywords: ${card.keywords.join(", ")}</p>`;
    }

    let elementText = "";

    if (card.element) {
      elementText = `<p>Element: ${card.element}</p>`;
    }

    let schoolText = "";

    if (card.school) {
      schoolText = `<p>School: ${card.school}</p>`;
    }

    cardElement.innerHTML = `
      <h4>${card.name}</h4>
      <p>Cost: ${card.cost} Chi</p>
      <p>Type: ${getCardTypeLabel(card.type)}</p>
      ${cardDetails}
      ${keywordText}
      ${elementText}
      ${schoolText}
      <p>${card.text}</p>
    `;

    handElement.appendChild(cardElement);
  });
}

function renderBoard(player, boardId) {
  const boardElement = document.getElementById(boardId);

  boardElement.innerHTML = "";

  player.board.forEach(function (unit, index) {
    const cardElement = document.createElement("div");

    cardElement.classList.add("card");
    cardElement.classList.add("unit-card");
    addElementClassToCard(cardElement, unit);

    if (hasKeyword(unit, "Guard")) {
      cardElement.classList.add("guard-unit");
    }

    if (boardId === "player-board") {
      const selectedSpell = getSelectedSpell();

      cardElement.addEventListener("click", function (event) {
        event.stopPropagation();
        const selectedSpell = getSelectedSpell();
        const selectedReaction =
          gameState.selectedReactionCardIndex !== null
            ? gameState.players[gameState.currentPlayerIndex].hand[gameState.selectedReactionCardIndex]
            : null;

        if (selectedReaction) {
          if (selectedReactionTargetsFriendlyUnits(selectedReaction)) {
            playReactionOnFriendlyUnit(index);
            return;
          }

          showMessage("This reaction cannot target a friendly unit.");
          return;
        }

        if (selectedSpell) {
          if (selectedSpellTargetsFriendlyUnits(selectedSpell)) {
            castSpellOnFriendlyUnit(index);
            return;
          }

          showMessage("This move cannot target a friendly unit.");
          return;
        }

        selectAttacker(index);
      });

      if (gameState.selectedAttackerIndex === index) {
        cardElement.classList.add("selected-card");
      }

      if (selectedSpellTargetsFriendlyUnits(selectedSpell)) {
        cardElement.classList.add("valid-target");
      }

      const selectedReaction =
        gameState.selectedReactionCardIndex !== null
          ? gameState.players[gameState.currentPlayerIndex].hand[gameState.selectedReactionCardIndex]
          : null;

      if (selectedReactionTargetsFriendlyUnits(selectedReaction)) {
        cardElement.classList.add("valid-target");
      }
    }

    if (boardId === "enemy-board" && gameState.phase === "action") {
      cardElement.addEventListener("click", function (event) {
        event.stopPropagation();

        const selectedSpell = getSelectedSpell();

        if (selectedSpell) {
          if (isNoTargetSpell(selectedSpell)) {
            showMessage(`${selectedSpell.name} does not need a target. Click the card again to confirm.`);
            return;
          }

          if (selectedSpellTargetsEnemyUnits(selectedSpell)) {
            if (selectedSpell.spellType === "damage_enemy_unit") {
              castSpellOnEnemyUnit(index);
              return;
            }

            if (selectedSpell.spellType === "damage_two_enemy_units") {
              selectWindSliceTarget(index);
              return;
            }
          }

          showMessage("This spell cannot target an enemy unit.");
          return;
        }

        attackEnemyUnit(index);
      });

      const selectedSpell = getSelectedSpell();

      if (selectedSpellTargetsEnemyUnits(selectedSpell)) {
        cardElement.classList.add("valid-target");
      }

      if (!selectedSpell && gameState.selectedAttackerIndex !== null) {
        if (playerHasGuardUnit(player)) {
          if (hasKeyword(unit, "Guard")) {
            cardElement.classList.add("valid-target");
          } else {
            cardElement.classList.add("blocked-target");
          }
        } else {
          cardElement.classList.add("valid-target");
        }
      }

      if (gameState.selectedWindSliceTargets.includes(index)) {
        cardElement.classList.add("multi-target-selected");
      }
    }

    if (boardId === "enemy-board" && gameState.phase === "reaction") {
      const selectedSpell = getSelectedSpell();

      cardElement.addEventListener("click", function (event) {
        event.stopPropagation();

        if (selectedSpell) {
          if (selectedSpellTargetsEnemyUnits(selectedSpell)) {
            if (selectedSpell.spellType === "damage_enemy_unit") {
              castSpellOnEnemyUnit(index);
              return;
            }

            if (selectedSpell.spellType === "damage_two_enemy_units") {
              selectWindSliceTarget(index);
              return;
            }
          }

          showMessage("This move cannot target an enemy unit.");
          return;
        }

        playReactionOnEnemyUnit(index);
      });

      if (selectedSpellTargetsEnemyUnits(selectedSpell)) {
        cardElement.classList.add("valid-target");
      }

      if (
        !selectedSpell &&
        gameState.selectedReactionCardIndex !== null
      ) {
        if (unit.summonedThisTurn) {
          cardElement.classList.add("valid-target");
        } else {
          cardElement.classList.add("blocked-target");
        }
      }

      if (gameState.selectedWindSliceTargets.includes(index)) {
        cardElement.classList.add("multi-target-selected");
      }
    }

    const attackStatus = unit.canAttack && !unit.hasAttacked ? "Ready" : "Exhausted";
    const summonStatus = unit.summonedThisTurn ? "New summon" : "Stable";

    let keywordText = "";

    if (unit.keywords) {
      const visibleKeywords = unit.keywords.filter(function (keyword) {
        return keyword !== "Dodge" && keyword !== "Guard";
      });

      if (visibleKeywords.length > 0) {
        keywordText = `<p>Keywords: ${visibleKeywords.join(", ")}</p>`;
      }
    }

    let guardText = "";

    if (hasKeyword(unit, "Guard")) {
      guardText = `<p class="guard-badge">🛡 Guard</p>`;
    }

    let dodgeText = "";

    if (hasKeyword(unit, "Dodge")) {
      dodgeText = `<p>Dodge: ${unit.dodgeUsed ? "Used" : "Ready"}</p>`;
    }

    let fortifyText = "";

    if (hasKeyword(unit, "Fortify") && unit.fortifyBuff) {
      const fortifyStatus = unit.fortifyUsed ? "Used" : "Ready";
      const attackBuff = unit.fortifyBuff.attack || 0;
      const healthBuff = unit.fortifyBuff.health || 0;

      fortifyText = `<p>Fortify: +${attackBuff}/+${healthBuff} (${fortifyStatus})</p>`;
    }

    let frozenText = "";

    if (unit.skipNextAttack) {
      frozenText = `<p>Frozen: next attack skipped</p>`;
    }

    if (unit.frozenThisTurn) {
      frozenText = `<p>Frozen this turn</p>`;
    }

    cardElement.innerHTML = `
      <h4>${unit.name}</h4>
      <p>Attack: ${unit.attack}</p>
      <p>HP: ${unit.currentHealth}/${unit.maxHealth}</p>
${guardText}
${keywordText}
${fortifyText}
${dodgeText}
${frozenText}
      <p>Status: ${attackStatus}</p>
      <p>${summonStatus}</p>
    `;

    boardElement.appendChild(cardElement);
  });
}

document.getElementById("end-turn-button").addEventListener("click", endTurn);
document.getElementById("restart-button").addEventListener("click", startGame);
document.getElementById("win-restart-button").addEventListener("click", startGame);
document.querySelector(".enemy").addEventListener("click", attackEnemyHero);
document.querySelector(".current").addEventListener("click", castSpellOnFriendlyHero);
document.getElementById("copy-log-button").addEventListener("click", copyGameLog);
document.getElementById("win-copy-log-button").addEventListener("click", copyGameLog);

setupMatchupSelector();
startGame();