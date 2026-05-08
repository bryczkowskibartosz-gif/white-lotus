const TEST_MODE = true;
const MAX_BOARD_SIZE = 5;

const gameState = {
  currentPlayerIndex: 0,
  phase: "action",
  selectedAttackerIndex: null,
  selectedReactionCardIndex: null,
  selectedSpellCardIndex: null,
  gameOver: false,

  players: [
    {
      name: "Player 1",
      hp: 30,
      maxChi: 0,
      currentChi: 0,
      deck: [],
      hand: [],
      board: []
    },
    {
      name: "Player 2",
      hp: 30,
      maxChi: 0,
      currentChi: 0,
      deck: [],
      hand: [],
      board: []
    }
  ]
};

function startGame() {
  const player1 = gameState.players[0];
  const player2 = gameState.players[1];

  player1.deck = [...cards, ...cards, ...cards];
  player2.deck = [...cards, ...cards, ...cards];

  const startingHandSize = TEST_MODE ? cards.length : 3;

  for (let i = 0; i < startingHandSize; i++) {
    drawCard(player1);
    drawCard(player2);
  }

  if (TEST_MODE) {
    player1.maxChi = 10;
    player1.currentChi = 10;

    player2.maxChi = 10;
    player2.currentChi = 10;
  } else {
    player1.maxChi = 1;
    player1.currentChi = 1;

    player2.maxChi = 0;
    player2.currentChi = 0;
  }

  showMessage("Player 1 starts the game. Action Phase.");

  renderGame();
}

function drawCard(player) {
  const card = player.deck.shift();

  if (card) {
    player.hand.push(card);
  }
}

function showMessage(message) {
  const messageElement = document.getElementById("game-message");
  messageElement.textContent = message;
}

function clearSelection(message) {
  gameState.selectedAttackerIndex = null;
  gameState.selectedReactionCardIndex = null;
  gameState.selectedSpellCardIndex = null;

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

function getSelectedSpell() {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  return currentPlayer.hand[gameState.selectedSpellCardIndex];
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

  const unit = {
    ...card,
    maxHealth: card.health,
    currentHealth: card.health,
    canAttack: hasKeyword(card, "Swift"),
    hasAttacked: false,
    summonedThisTurn: true
  };

  currentPlayer.board.push(unit);
  currentPlayer.hand.splice(cardIndex, 1);

  if (hasKeyword(card, "Swift")) {
    showMessage(`${card.name} was played. It can attack immediately!`);
  } else {
    showMessage(`${card.name} was played. It can attack next turn.`);
  }

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

  if (card.spellType === "damage_enemy_unit") {
    showMessage(`${card.name} selected. Click an enemy unit.`);
  }

  if (card.spellType === "heal_friendly_unit") {
    showMessage(`${card.name} selected. Click one of your units.`);
  }

  if (card.spellType === "buff_friendly_unit") {
    showMessage(`${card.name} selected. Click one of your units.`);
  }

  if (
    card.spellType !== "damage_enemy_unit" &&
    card.spellType !== "heal_friendly_unit" &&
    card.spellType !== "buff_friendly_unit"
  ) {
    showMessage(`${card.name} selected. Choose a target.`);
  }
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

    showMessage(`${reactionCard.name} destroyed ${targetUnit.name}.`);

    gameState.selectedReactionCardIndex = null;

    renderGame();
    return;
  }

  showMessage("This reaction effect is not implemented yet.");
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
  gameState.selectedAttackerIndex = null;
  gameState.selectedReactionCardIndex = null;
  gameState.selectedSpellCardIndex = null;

  gameState.currentPlayerIndex = getEnemyPlayerIndex();
  gameState.phase = "reaction";

  const reactingPlayer = gameState.players[gameState.currentPlayerIndex];

  showMessage(`${reactingPlayer.name}'s Reaction Phase. React or pass.`);

  renderGame();
}

function startActionPhase() {
  gameState.selectedAttackerIndex = null;
  gameState.selectedReactionCardIndex = null;
  gameState.selectedSpellCardIndex = null;

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const previousActionPlayer = gameState.players[getEnemyPlayerIndex()];

  clearSummonedThisTurn(previousActionPlayer);

  gameState.phase = "action";

  if (TEST_MODE) {
    currentPlayer.maxChi = 10;
    currentPlayer.currentChi = 10;
  } else {
    if (currentPlayer.maxChi < 10) {
      currentPlayer.maxChi += 1;
    }

    currentPlayer.currentChi = currentPlayer.maxChi;
  }

  drawCard(currentPlayer);
  prepareUnitsForTurn(currentPlayer);

  showMessage(`${currentPlayer.name}'s Action Phase started.`);

  renderGame();
}

function clearSummonedThisTurn(player) {
  player.board.forEach(function (unit) {
    unit.summonedThisTurn = false;
  });
}

function prepareUnitsForTurn(player) {
  player.board.forEach(function (unit) {
    unit.canAttack = true;
    unit.hasAttacked = false;
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
    showMessage("Select a move first.");
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

  if (spellCard.spellType === "damage_enemy_unit") {
    currentPlayer.currentChi -= spellCard.cost;

    targetUnit.currentHealth -= spellCard.damage;

    currentPlayer.hand.splice(gameState.selectedSpellCardIndex, 1);

    let message = `${spellCard.name} dealt ${spellCard.damage} damage to ${targetUnit.name}.`;

    if (targetUnit.currentHealth <= 0) {
      enemyPlayer.board.splice(enemyUnitIndex, 1);
      message += ` ${targetUnit.name} was destroyed.`;
    }

    gameState.selectedSpellCardIndex = null;

    showMessage(message);
    renderGame();
    return;
  }

  showMessage("This move effect is not implemented yet.");
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

  if (playerHasGuardUnit(enemyPlayer) && !hasKeyword(defender, "Guard")) {
    showMessage("Enemy has a Guard unit. You must attack it first.");
    return;
  }

  defender.currentHealth -= attacker.attack;
  attacker.currentHealth -= defender.attack;

  attacker.hasAttacked = true;
  attacker.canAttack = false;

  let message = `${attacker.name} attacked ${defender.name}. `;

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

  if (playerHasGuardUnit(enemyPlayer)) {
    showMessage("Enemy has a Guard unit. You must attack it first.");
    return;
  }

  enemyPlayer.hp -= attacker.attack;

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
    showMessage("Player 2 wins!");
  }

  if (player2.hp <= 0) {
    gameState.gameOver = true;
    showMessage("Player 1 wins!");
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

  document.getElementById("enemy-name").textContent = enemyPlayer.name;
  document.getElementById("enemy-hp").textContent = enemyPlayer.hp;
  document.getElementById("enemy-chi").textContent = enemyPlayer.currentChi;
  document.getElementById("enemy-max-chi").textContent = enemyPlayer.maxChi;

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

    cardElement.addEventListener("click", function () {
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

    if (boardId === "player-board") {
      const selectedSpell = getSelectedSpell();

      cardElement.addEventListener("click", function () {
        const selectedSpell = getSelectedSpell();

        if (selectedSpell) {
          if (
            selectedSpell.spellType === "heal_friendly_unit" ||
            selectedSpell.spellType === "buff_friendly_unit"
          ) {
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

      if (
        selectedSpell &&
        (
          selectedSpell.spellType === "heal_friendly_unit" ||
          selectedSpell.spellType === "buff_friendly_unit"
        )
      ) {
        cardElement.classList.add("reaction-target");
      }
    }

    if (boardId === "enemy-board" && gameState.phase === "action") {
      cardElement.addEventListener("click", function (event) {
        event.stopPropagation();

        const selectedSpell = getSelectedSpell();

        if (selectedSpell) {
          if (selectedSpell.spellType === "damage_enemy_unit") {
            castSpellOnEnemyUnit(index);
            return;
          }

          showMessage("This move cannot target an enemy unit.");
          return;
        }

        attackEnemyUnit(index);
      });
    }

    if (boardId === "enemy-board" && gameState.phase === "reaction") {
      const selectedSpell = getSelectedSpell();

      cardElement.addEventListener("click", function (event) {
        event.stopPropagation();

        if (selectedSpell) {
          if (selectedSpell.spellType === "damage_enemy_unit") {
            castSpellOnEnemyUnit(index);
            return;
          }

          showMessage("This move cannot target an enemy unit.");
          return;
        }

        playReactionOnEnemyUnit(index);
      });

      if (
        unit.summonedThisTurn ||
        (selectedSpell && selectedSpell.spellType === "damage_enemy_unit")
      ) {
        cardElement.classList.add("reaction-target");
      }
    }

    const attackStatus = unit.canAttack && !unit.hasAttacked ? "Ready" : "Exhausted";
    const summonStatus = unit.summonedThisTurn ? "New summon" : "Stable";

    let keywordText = "";

    if (unit.keywords) {
      keywordText = `<p>Keywords: ${unit.keywords.join(", ")}</p>`;
    }

    cardElement.innerHTML = `
      <h4>${unit.name}</h4>
      <p>Attack: ${unit.attack}</p>
      <p>HP: ${unit.currentHealth}/${unit.maxHealth}</p>
      ${keywordText}
      <p>Status: ${attackStatus}</p>
      <p>${summonStatus}</p>
    `;

    boardElement.appendChild(cardElement);
  });
}

document.getElementById("end-turn-button").addEventListener("click", endTurn);
document.querySelector(".enemy").addEventListener("click", attackEnemyHero);

startGame();