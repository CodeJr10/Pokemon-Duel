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

## Author

Created as a learning project to master JavaScript state management, DOM manipulation, and async data fetching.

---

**Enjoy the game! May your Pokémon always have the highest base stats.** 🎮
