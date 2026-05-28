# The White Lotus

Simple browser-based 1v1 card game prototype inspired by tactical card games.

The goal is to build a small playable card game MVP first, then improve balance, card variety and presentation step by step.

## Current version

MVP prototype with:

- Action Phase and Reaction Phase
- shared Chi system
- fixed test decks for Fire, Air, Earth and Water
- matchup selector for quick element-vs-element testing
- unit cards, move cards and reaction cards
- unit combat
- attacks against enemy units and enemy hero
- moves targeting enemy units, friendly units or heroes
- no-target moves such as draw, hero damage and board damage
- Battlecry effects
- Flow keyword
- Ignite keyword
- Momentum keyword
- Guard keyword
- Dodge keyword
- Swift keyword
- Fortify keyword
- board limit
- max hand size
- deck and hand counters
- card burning when drawing with a full hand
- fatigue damage when drawing from an empty deck
- basic win screen
- match summary after the game
- restart game button
- copy game log button
- basic visual card clarity:
  - card type shown by background color
  - element shown by border color
  - non-neutral element shown by badge
  - Chi cost shown as a blue diamond badge
  - keywords shown as small pills
  - Guard shown with a visual badge and glow
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

The current card pool is still small and mainly exists to test mechanics, class identity and game flow.

The project is now ready for small matchup tests, but not for a final balance pass yet.

Neutral spells are currently inactive for fixed-deck testing. They can stay in `cards.js` as future experiment cards, but they should not be used in the current Fire, Air, Earth or Water test decks.

Current deck direction:

- Fire: pressure, direct damage, Ignite and card refill.
- Air: reactions, Dodge, Momentum and tempo tools.
- Earth: Guard, Fortify, buffs and stabilization.
- Water: Flow, healing, flexible removal and sticky units.
- Neutral: mostly units that help smooth early turns or provide generic board presence.

## Current development focus

1. Keep the prototype stable.
2. Test fixed matchups with the matchup selector.
3. Keep neutral spells out of test decks for now.
4. Tune deck composition before changing card numbers too much.
5. Watch if Air gets enough useful Momentum turns.
6. Watch if Water can stabilize without feeling too passive.
7. Watch if Earth Guard/Fortify creates board locks too easily.
8. Watch if Fire has enough card refill without becoming too explosive.

## How to run

Open `index.html` in a browser.

Recommended local workflow:

1. Open the project folder in VS Code.
2. Open `index.html` with Live Server.
3. Pick a matchup in the matchup selector.
4. Play the game.
5. Use Copy Game Log after the game and paste the log into balance notes.

## Files

- `index.html` — page structure
- `style.css` — visual styling
- `cards.js` — card data
- `main.js` — game logic and fixed test decks
- `notes.txt` — design notes, roadmap and playtest history
