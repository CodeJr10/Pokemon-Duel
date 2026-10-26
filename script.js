// =======================================
// STATE
// =======================================
// loading → fetching the pool
// ready → pool loaded, Start button visible, nothing clickable
// awaiting-user → user can click a card
// resolving → both cards chosen, comparing, showing result
// cleanup → removing used cards, refilling, resetting slots
// game-over → someone hit 20 points

const state = {
  phase: "loading", // loading || ready || awaiting-user | resolving | clean-up | game-over

  pile: [],
  computerHand: [],
  userHand: [],

  computerScore: 0,
  userScore: 0,

  computerActiveCard: null,
  userActiveCard: null,
};

// =======================================
// STATE/PHASE HANDLING
//========================================

function setPhase(newPhase) {
  state.phase = newPhase;
  renderPhaseUI(); // decides what's visible/clickable based on state.phase
}

function renderPhaseUI() {
  const startButton = document.getElementById("start-button");
  const userHandEl = document.querySelector(".user--box .hand-cards");
  console.log(startButton);
  console.log(userHandEl);

  // Hide/show start button
  startButton.style.display = state.phase === "ready" ? "inline-block" : "none";

  // Enable/disable clicking on the user's hand
  const userCards = userHandEl.querySelectorAll(".card");
  userCards.forEach((card) => {
    card.disabled = state.phase !== "awaiting-user";
  });
}

// =======================================
// DOM
// =======================================

// =======================================
// DATA FUNCTIONS
// =======================================

async function fetchPokemon(id) {
  const POKE_API = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const response = await fetch(POKE_API);

  if (!response.ok) {
    throw new Error(`failed to fetch Poke API`);
  }

  const data = await response.json();

  const totalStats = data.stats.reduce((sum, stat) => sum + stat.base_stat, 0);

  return {
    id: id,
    name: data.name,
    image: data.sprites.front_default,
    stat: totalStats,
  };
}

fetchPokemon(1);

// =======================================
// GAME FUNCTIONS
// =======================================

// =======================================
// RENDER FUNCTIONS
// =======================================

// render card function

function createCardElement(card, { clickable = false } = {}) {
  const el = document.createElement(clickable ? "button" : "div");

  el.className = clickable ? "card user-card" : "card computer-card";

  el.innerHTML = ` <div class="card-back"></div>
            <div class="card-front">
            <img src="${card.image}" alt="${card.name}"
            class="pokemon-image"/>
            <div class="card-info">
                <p class="card-name">${card.name}</p>
                <p class="card-stat">${card.name}</p>
                </div>
                </div>`;

  return el;
}

// render hand function

function renderHand(handArray, containerEl, clickable) {
  containerEl.innerHTML = "";

  handArray.forEach((card) => {
    const cardEl = createCardElement(card, { clickable });
    containerEl.appendChild(cardEl);
  });
}
// =======================================
// INIT FUNCTION
// =======================================
