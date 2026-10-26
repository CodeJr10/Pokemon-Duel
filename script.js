// CURRENT FLOW

// 1) START WITH STATE: loading

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

// fetch pokemon data from API

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

// fetchPokemon(1).then(console.log());

// generate unique id for each pokemon object fetched/created

function generateUniqueIds(count, maxId) {
  const ids = new Set();

  while (ids.size < count) {
    const randomId = Math.floor(Math.random() * maxId) + 1;
    ids.add(randomId);

    // console.log([...ids]);
  }
  return [...ids];
}

// builds card pool with pokemon ids to create card structure
async function buildCardPool(size, maxId = 151) {
  const ids = generateUniqueIds(size, maxId);

  const results = await Promise.allSettled(ids.map(fetchPokemon));

  // console.log(results);

  const pool = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value);

  // console.log(pool);
  return pool;
}

// buildCardPool(100, 151);

// =======================================
// GAME FUNCTIONS
// =======================================

// using fisher-yates algorithm for fair shuffling
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [array[i], array[random]] = [array[random], array[i]];
  }
}
// const numbers = [1, 2, 3, 5, 8];
// index -->     0  1  2  3  4

// Iteration1:
// length = i = 5
// the range applied by math.random will be from 0-4
// i and the random chosen index will switch places till the end of array

// shuffle(numbers);
// console.log(numbers);

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
                <p class="card-stat">${card.stat}</p>
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

async function initGame() {
  setPhase("loading");

  const pool = await buildCardPool(100);
  shuffle(pool);

  state.pile = pool;
  state.userHand = state.pile.splice(0, 5);
  state.computerHand = state.pile.splice(0, 5);

  const userContainer = document.querySelector(".user--box .hand-cards");
  const computerContainer = document.querySelector(
    ".computer--box .hand-cards",
  );

  renderHand(state.userHand, userContainer, true);
  renderHand(state.computerHand, computerContainer, false);

  // Test to check whether the cards are generating the pokemon data face up
  // userContainer.querySelectorAll(".card").forEach((card) => {
  //   card.classList.add("is-revealed");
  // });
  // computerContainer.querySelectorAll(".card").forEach((card) => {
  //   card.classList.add("is-revealed");
  // });

  setPhase("ready");
}

initGame();
