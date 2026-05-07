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

  const startingHandSize = TEST_MODE ? 8 : 3;

  for (let i = 0; i < startingHandSize; i++) {
    drawCard(player1);
    drawCard(player2);
  }

  if (TEST_MODE) {
    player1.maxChi = 10;
    player1.currentChi = 10;
  } else {
    player1.maxChi = 1;
    player1.currentChi = 1;
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

  if (gameState.phase === "reaction") {
    if (card.type !== "reaction") {
      showMessage("Only reaction cards can be played during Reaction Phase.");
      return;
    }

    selectReactionCard(cardIndex);
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
    canAttack: false,
    hasAttacked: false,
    summonedThisTurn: true
  };

  currentPlayer.board.push(unit);
  currentPlayer.hand.splice(cardIndex, 1);

  showMessage(`${card.name} was played. It can attack next turn.`);

  renderGame();
}

function selectSpellCard(cardIndex) {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const card = currentPlayer.hand[cardIndex];

  if (!card || card.type !== "spell") {
    return;
  }

  if (currentPlayer.currentChi < card.cost) {
    showMessage("Not enough Chi for this spell.");
    return;
  }

  gameState.selectedAttackerIndex = null;
  gameState.selectedReactionCardIndex = null;
  gameState.selectedSpellCardIndex = cardIndex;

  showMessage(`${card.name} selected. Click an enemy unit.`);

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

  if (gameState.phase !== "action") {
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

  showMessage("This spell effect is not implemented yet.");
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
    showMessage("This spell can only target an enemy unit.");
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

function renderHand(player) {
  const handElement = document.getElementById("player-hand");

  handElement.innerHTML = "";

  player.hand.forEach(function (card, index) {
    const cardElement = document.createElement("div");

    cardElement.classList.add("card");
    cardElement.classList.add(`${card.type}-card`);

    if (
      gameState.phase === "reaction" &&
      gameState.selectedReactionCardIndex === index
    ) {
      cardElement.classList.add("selected-reaction-card");
    }

    if (
      gameState.phase === "action" &&
      gameState.selectedSpellCardIndex === index
    ) {
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

    if (card.type === "spell") {
      cardDetails = `
        <p>Spell: ${card.damage} damage</p>
      `;
    }

    cardElement.innerHTML = `
      <h4>${card.name}</h4>
      <p>Cost: ${card.cost} Chi</p>
      <p>Type: ${card.type}</p>
      ${cardDetails}
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
    cardElement.classList.add(`${unit.element.toLowerCase()}-element`);

    if (boardId === "player-board") {
      cardElement.addEventListener("click", function () {
        selectAttacker(index);
      });

      if (gameState.selectedAttackerIndex === index) {
        cardElement.classList.add("selected-card");
      }
    }

    if (boardId === "enemy-board" && gameState.phase === "action") {
      cardElement.addEventListener("click", function (event) {
        event.stopPropagation();

        if (gameState.selectedSpellCardIndex !== null) {
          castSpellOnEnemyUnit(index);
        } else {
          attackEnemyUnit(index);
        }
      });
    }

    if (boardId === "enemy-board" && gameState.phase === "reaction") {
      cardElement.addEventListener("click", function (event) {
        event.stopPropagation();
        playReactionOnEnemyUnit(index);
      });

      if (unit.summonedThisTurn) {
        cardElement.classList.add("reaction-target");
      }
    }

    const attackStatus = unit.canAttack && !unit.hasAttacked ? "Ready" : "Exhausted";
    const summonStatus = unit.summonedThisTurn ? "New summon" : "Stable";

    cardElement.innerHTML = `
      <h4>${unit.name}</h4>
      <p>Attack: ${unit.attack}</p>
      <p>HP: ${unit.currentHealth}/${unit.maxHealth}</p>
      <p>Status: ${attackStatus}</p>
      <p>${summonStatus}</p>
    `;

    boardElement.appendChild(cardElement);
  });
}

document.getElementById("end-turn-button").addEventListener("click", endTurn);
document.querySelector(".enemy").addEventListener("click", attackEnemyHero);

startGame();