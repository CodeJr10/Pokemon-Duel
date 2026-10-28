# Pokémon Card Battle Game

A fast-paced, turn-based card game built with vanilla HTML, CSS, and JavaScript. Battle against the computer using real Pokémon data fetched from the PokéAPI.

## Game Overview

Compete against the computer in a card-based duel. Each player draws from a shared deck of Pokémon cards. Select your card each round, and the Pokémon with the higher base stat total wins points. First player to reach 20 points wins the game.

## Game Rules

### Setup
- The game starts with a shuffled deck of 100 unique Pokémon cards (from generations 1-5).
- Each player (user and computer) is dealt 5 cards face-down.
- Starting score: 0–0.

### Gameplay
1. **Click Start** to begin the game. Your hand becomes clickable.
2. **Select a card** from your hand by clicking it. The card flips face-up in the battle arena.
3. **Computer's turn** — the computer automatically selects one of its cards (without seeing yours).
4. **Compare stats** — the Pokémon with the higher base stat total (sum of all six base stats) wins the round.
5. **Award points**:
   - **Win**: +2 points
   - **Tie**: +1 point to both players
   - **Loss**: 0 points
6. **Refill hands** — both players draw a new card from the remaining deck to maintain 5 cards each.
7. **Repeat** steps 2–6 until one player reaches 20 points.

### Card Rules
- Once a card is played, it is permanently removed from the game (no reshuffle).
- Each card appears only once in the deck (no duplicates).
- Cards are compared using their **base stat total** (the sum of HP, Attack, Defense, Special Attack, Special Defense, and Speed).

### Winning
- The first player to accumulate **20 points** wins the game.
- A result screen displays the winner and offers a **Restart** button to play again.

## Features

- **Real Pokémon data** fetched from [PokéAPI](https://pokeapi.co/)
- **Fair shuffling** using the Fisher-Yates algorithm
- **Responsive design** with gradient backgrounds and smooth card animations
- **Game state management** with clear phase transitions (loading → ready → awaiting-user → resolving → cleanup)
- **Face-down cards** during play for strategic tension
- **Live score tracking** and round history

## Tech Stack

- **HTML5** — semantic markup and game structure
- **CSS3** — flexbox layout, gradients, and card styling
- **JavaScript (Vanilla)** — no frameworks, pure ES6+
- **PokéAPI** — real Pokémon data (name, sprite, base stats)

## How to Run

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- An internet connection (to fetch Pokémon data from PokéAPI)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pokemon-card-game.git
   cd pokemon-card-game
   ```

2. Open `index.html` in your browser:
   ```bash
   open index.html
   # or simply double-click the file
   ```

3. If you prefer a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if http-server is installed)
   npx http-server
   ```

   Then navigate to `http://localhost:8000` in your browser.

## Project Structure

```
pokemon-card-game/
├── index.html          # Main HTML file with game layout
├── styles.css          # All CSS styling
├── script.js           # Game logic and event handlers
└── README.md           # This file
```

## Key Functions

### State Management
- `state` — global object holding game data (hands, scores, phase)
- `setPhase(newPhase)` — transitions between game phases and triggers UI updates

### Card Operations
- `fetchPokemon(id)` — fetches a single Pokémon's data from PokéAPI
- `buildCardPool(size, maxId)` — generates a pool of unique Pokémon cards
- `shuffle(array)` — Fisher-Yates shuffle for fair randomization

### Rendering
- `renderHand(handArray, containerEl, clickable)` — draws a hand of cards to the screen
- `createCardElement(card, options)` — creates a single card DOM element
- `renderPhaseUI()` — updates button visibility and card clickability based on current phase

### Game Logic
- `cardClicked(event)` — handles user card selection
- `disableUserHand()` — locks user's hand after a card is played
- `clickStartButton()` — transitions from ready phase to awaiting-user

## Game Flow

```
1. Load game (initGame)
   ↓
2. Fetch 100 unique Pokémon from PokéAPI (buildCardPool)
   ↓
3. Shuffle the deck (shuffle)
   ↓
4. Deal 5 cards to each player
   ↓
5. Show Start button → ready phase
   ↓
6. User clicks Start → awaiting-user phase
   ↓
7. User clicks a card → resolving phase
   ↓
8. Computer picks a card (hidden)
   ↓
9. Compare stats, award points
   ↓
10. Remove played cards, refill hands
    ↓
11. Check if anyone reached 20 points
    ├─ No → back to step 7 (awaiting-user)
    └─ Yes → game-over (show winner)
```

## Design Decisions

### Why Fisher-Yates?
The Fisher-Yates algorithm guarantees every permutation of the deck is equally likely, unlike naive `sort(() => Math.random() - 0.5)` which produces biased shuffles.

### Why Permanent Card Removal?
Cards that have been played are gone for good (no discard pile or reshuffle). This creates a finite game with strategic implications — you can't rely on seeing rare cards twice.

### Why State-Driven Rendering?
The game state (`state` object) is the single source of truth. The UI always reflects state, never the other way around. This keeps logic predictable and bugs easy to trace.

### Why Face-Down Cards?
Cards are face-down to the player during selection, creating tension and preventing the game from becoming "always pick the highest card." The computer's card choice is also hidden, keeping the game fair.

## Computer Difficulty

Currently, the computer picks a card randomly from its hand. Future versions could add:
- **Easy mode**: random picks (current behavior)
- **Medium mode**: weighted towards higher stats with occasional randomness
- **Hard mode**: always picks the highest stat card available

## Future Enhancements

- [ ] Add computer difficulty levels
- [ ] Implement card animations and flip effects
- [ ] Add sound effects for wins/losses
- [ ] Create a lobby to select player names
- [ ] Persist win/loss statistics to localStorage
- [ ] Add a card collection/pokedex view
- [ ] Multiplayer mode (two human players)
- [ ] Ability to choose which stat to compare (instead of always total)
- [ ] Card rarity system with visual indicators

## Known Limitations

- Cards are limited to generations 1–5 (Pokémon IDs 1–151) by default. This can be changed by adjusting the `maxId` parameter in `buildCardPool()`.
- The game requires an internet connection to fetch Pokémon data from PokéAPI.
- No offline mode or caching of card data yet.
- Computer opponent has no strategic intelligence (always picks randomly).

## Troubleshooting

### Cards aren't loading
- Check your internet connection — the game needs to fetch from PokéAPI.
- Open the browser console (F12) and check for network errors.
- If PokéAPI is down, the game won't work. Try again later.

### Cards appear blank or with broken images
- Some Pokémon may not have official artwork. Check the console for which IDs failed to fetch.
- The `buildCardPool()` function filters out failed requests, so the game should still work with fewer cards.

### Clicks aren't registering
- Make sure you've clicked the Start button first to enter the awaiting-user phase.
- Check the browser console for JavaScript errors.

## Contributing

This is a learning project. Feel free to fork, modify, and improve! Some ideas:
- Optimize the card pool fetching with batch requests or caching
- Add visual polish with CSS animations
- Implement advanced AI for the computer player
- Add tests for game logic

## License

This project is open source and available under the [MIT License](LICENSE).

## Credits

- **Pokémon data**: [PokéAPI](https://pokeapi.co/) — a free, open REST API
- **Inspiration**: Classic Top Trumps and card battle mechanics
- **Built with**: Vanilla JavaScript, HTML5, CSS3

## Author

Created as a learning project to master JavaScript state management, DOM manipulation, and async data fetching.

---

**Enjoy the game! May your Pokémon always have the highest base stats.** 🎮