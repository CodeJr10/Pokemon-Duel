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

async function setPhase(newPhase) {
  state.phase = newPhase;
  renderPhaseUI(); // decides what's visible/clickable based on state.phase

  function renderPhaseUI() {
    const startButton = document.getElementById("start-button");
    const userHandEl = document.querySelector(".user--box .hand-cards");
    console.log(startButton);
    console.log(userHandEl);

    // Hide/show start button
    startButton.style.display =
      state.phase === "awaiting-user" ? "inline-block" : "none";

    // Enable/disable clicking on the user's hand
    const userCards = userHandEl.querySelectorAll(".card");
    userCards.forEach((card) => {
      card.disabled = state.phase !== "awaiting-user";
    });
  }
}

// =======================================
// DOM
// =======================================

// =======================================
// DATA FUNCTIONS
// =======================================

// =======================================
// GAME FUNCTIONS
// =======================================

// =======================================
// RENDER FUNCTIONS
// =======================================

// render card function

function createCardElement(card, { clickable = false } = {}) {
  const el = document.createElement(clickable ? "button" : "div");

  el.className = clickable ? "card card--user" : "card card--computer";

  el.innerHTML = ` <div class="card-back"></div>
            <div class="card-front">
            <img src="${card.image}" alt="${card.name}"
            class="pokemon-image"/>
            <div class="card-info">
                <p class="card-name">Name</p>
                <p class="card-stat">Stat</p>`;

  return el;
}

// =======================================
// INIT FUNCTION
// =======================================
