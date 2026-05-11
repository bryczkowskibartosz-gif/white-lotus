# The White Lotus

Simple browser-based 1v1 card game prototype inspired by tactical card games.

The goal is to build a small playable card game MVP first, then improve balance, card variety and presentation step by step.

## Current version

MVP prototype with:

- Action Phase and Reaction Phase
- shared Chi system
- unit cards, spell/move cards and reaction cards
- unit combat
- attacks against enemy units and enemy hero
- spells targeting enemy or friendly units
- Flow keyword
- Ignite keyword
- Momentum keyword
- Guard keyword
- Dodge keyword
- Swift keyword
- board limit
- max hand size
- deck and hand counters
- card burning when drawing with a full hand
- fatigue damage when drawing from an empty deck
- basic win screen
- restart game button
- basic visual card clarity:
  - card type shown by background color
  - element shown by border color
  - Guard shown with a visual badge
  - valid and blocked targets highlighted
- element and school card data

## Current mechanics

- Players have HP, Chi, deck, hand and board.
- Each player has one shared Chi pool.
- Chi refreshes at the start of the player's Action Phase.
- Unspent Chi can be used during the player's next Reaction Phase.
- Reaction cards spend the same Chi as normal cards.
- Flow cards can be played during both Action Phase and Reaction Phase.
- Board limit is 5 units.
- Hand limit is 10 cards.
- If a player draws with a full hand, the drawn card is burned.
- If a player draws from an empty deck, they take fatigue damage.
- Fatigue damage starts at 1 and increases by 1 each time that player draws from an empty deck.

## Current card pool

The current card pool is small and mainly exists to test mechanics.

Because of that, the project is not ready for a full balance pass yet.

The next goal is to add a small number of new cards for each element, especially more Air reaction cards and more Earth cards.

## Current development focus

1. Keep the prototype stable.
2. Add a few more cards using existing mechanics.
3. Add at least one simple Air reaction card to support Momentum.
4. Build small fixed test decks for Player 1 and Player 2.
5. Then start proper balance testing.

## How to run

Open `index.html` in a browser.

## Files

- `index.html` — page structure
- `style.css` — visual styling
- `cards.js` — card data
- `main.js` — game logic
- `notes.txt` — design notes and roadmap