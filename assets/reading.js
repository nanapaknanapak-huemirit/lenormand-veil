import { buildSummary, hashString } from "./summary.js";

const BASE = window.LENORMAND_BASE || "/assets";
const LOCALE = window.LENORMAND_LOCALE || "en";

const suitSymbols = {
  hearts: "♥",
  diamonds: "♦",
  clubs: "♣",
  spades: "♠"
};

const suitNames = {
  en: { hearts: "Hearts", diamonds: "Diamonds", clubs: "Clubs", spades: "Spades" },
  he: { hearts: "לבבות", diamonds: "יהלומים", clubs: "תלתנים", spades: "עלים" }
};

let dataPromise = null;

function loadData() {
  if (!dataPromise) {
    dataPromise = fetch(`${BASE}/data-${LOCALE}.json`).then((response) => {
      if (!response.ok) throw new Error(`Could not load reading data (${response.status})`);
      return response.json();
    });
  }
  return dataPromise;
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isRed(suit) {
  return suit === "hearts" || suit === "diamonds";
}

function cardFace(card, { mini = false, href = "" } = {}) {
  const suit = card.playingCard.suit;
  const face = `<article class="card-face ${mini ? "card-face--slot" : ""}">
    <span class="card-corner card-corner--start">
      <span class="card-number">${card.number}</span>
      <span class="card-playing ${isRed(suit) ? "is-red" : ""}" aria-label="${esc(
        `${card.playingCard.rank} of ${suitNames[LOCALE][suit]}`
      )}">${esc(card.playingCard.rank)}${suitSymbols[suit]}</span>
    </span>
    <span class="card-icon"><svg class="card-symbol" aria-hidden="true"><use href="${BASE}/icons.svg#icon-${esc(
      card.icon
    )}"></use></svg></span>
    <span class="card-name">${esc(card.name)}</span>
    ${mini ? "" : `<span class="card-keywords">${esc(card.keywords.join(" · "))}</span>`}
  </article>`;
  if (!href) return face;
  return `<a class="card-face-link" href="${href}" aria-label="${esc(card.name)}">${face}</a>`;
}

function cardBack() {
  return `<div class="card-back" aria-hidden="true"><span class="card-back-inner"><svg class="card-back-icon"><use href="${BASE}/icons.svg#icon-moon-star"></use></svg></span></div>`;
}

function shuffle(list) {
  const copy = list.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function cardHref(data, card) {
  return `${data.pageBase}cards/${card.slug}/`;
}

function initDaily(data) {
  const root = document.querySelector("[data-daily]");
  if (!root) return;
  const holder = root.querySelector("[data-daily-holder]");
  const button = root.querySelector("[data-daily-button]");
  const result = root.querySelector("[data-daily-result]");
  if (!holder || !button || !result) return;

  const dayKey = `${new Date().toISOString().slice(0, 10)}|${LOCALE}`;
  const card = data.cards[hashString(dayKey) % data.cards.length];
  let revealed = false;

  const reveal = () => {
    if (revealed) return;
    revealed = true;
    holder.innerHTML = cardFace(card, { href: cardHref(data, card) });
    holder.classList.add("is-revealed");
    result.hidden = false;
    result.innerHTML = `<p class="daily-card-name">${esc(card.name)}</p>
      <p>${esc(card.core)}</p>
      <p class="daily-advice"><strong>${esc(data.ui.cards.adviceTitle)}:</strong> ${esc(card.advice)}</p>
      <a class="text-link" href="${cardHref(data, card)}">${esc(data.ui.home.dailyLink)} →</a>`;
    button.hidden = true;
  };

  button.addEventListener("click", reveal);

  if (new URLSearchParams(window.location.search).get("demo") === "1") reveal();
}

function initReading(data) {
  const root = document.querySelector("[data-reading]");
  if (!root) return;
  const spread = data.spreads.find((item) => item.slug === root.dataset.spread);
  if (!spread) return;

  const board = root.querySelector("[data-board]");
  const drawButton = root.querySelector("[data-draw]");
  const revealButton = root.querySelector("[data-reveal]");
  const resetButton = root.querySelector("[data-reset]");
  const questionInput = root.querySelector("[data-question]");
  const summary = root.querySelector("[data-summary]");
  const summaryBody = root.querySelector("[data-summary-body]");
  const summaryQuestion = root.querySelector("[data-summary-question]");
  const hint = root.querySelector("[data-board-hint]");
  const significatorRoot = root.querySelector("[data-significator]");
  const isGrand = Boolean(spread.houses);

  const state = {
    cards: [],
    revealed: 0,
    revealedSet: new Set(),
    timers: [],
    significator: "woman",
    drawing: false
  };

  const slots = [];

  function positionLabel(index) {
    if (isGrand) {
      const house = spread.houses[index];
      return {
        number: String(index + 1).padStart(2, "0"),
        name: house ? house.name : ""
      };
    }
    const position = spread.positions[index] || { name: "" };
    return {
      number: String(index + 1).padStart(2, "0"),
      name: position.name
    };
  }

  function createBoard() {
    board.innerHTML = "";
    slots.length = 0;
    board.dataset.layout = spread.layout;
    for (let index = 0; index < spread.count; index += 1) {
      const label = positionLabel(index);
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.dataset.slot = String(index);
      slot.innerHTML = `<span class="slot-position"><span class="slot-number">${label.number}</span><span class="slot-name">${esc(
        label.name
      )}</span></span><div class="slot-card">${cardBack()}</div>`;
      board.appendChild(slot);
      slots.push(slot);
    }
  }

  function clearTimers() {
    state.timers.forEach((timer) => window.clearTimeout(timer));
    state.timers = [];
  }

  function reset() {
    clearTimers();
    state.cards = [];
    state.revealed = 0;
    state.revealedSet = new Set();
    state.drawing = false;
    createBoard();
    summary.hidden = true;
    summaryBody.innerHTML = "";
    summaryQuestion.hidden = true;
    summaryQuestion.textContent = "";
    drawButton.disabled = false;
    drawButton.hidden = false;
    revealButton.hidden = true;
    resetButton.hidden = true;
    if (hint) hint.textContent = data.ui.spreads.drawLede;
    if (significatorRoot) significatorRoot.hidden = false;
    root.classList.remove("is-complete");
  }

  function revealSlot(index) {
    if (state.revealedSet.has(index)) return;
    const slot = slots[index];
    const card = state.cards[index];
    if (!slot || !card) return;
    const slotCard = slot.querySelector(".slot-card");
    slotCard.innerHTML = cardFace(card, {
      mini: isGrand,
      href: cardHref(data, card)
    });
    slot.classList.add("is-revealed");
    state.revealedSet.add(index);
    state.revealed += 1;
    if (state.revealed === spread.count) {
      finish();
    }
  }

  function finish() {
    state.drawing = false;
    root.classList.add("is-complete");
    revealButton.hidden = true;
    drawButton.hidden = true;
    resetButton.hidden = false;
    if (hint) hint.textContent = data.ui.spreads.readingComplete;
    renderSummary();
  }

  function revealAll() {
    clearTimers();
    for (let index = 0; index < spread.count; index += 1) revealSlot(index);
    finish();
  }

  function renderSummary() {
    if (!state.cards.length) return;
    const result = buildSummary({
      cards: state.cards,
      spread,
      templates: data.templates,
      significator: state.significator
    });

    summaryBody.innerHTML = "";
    result.paragraphs.forEach((paragraph) => {
      const p = document.createElement("p");
      p.textContent = paragraph;
      summaryBody.appendChild(p);
    });

    const question = (questionInput?.value || "").trim();
    if (question) {
      summaryQuestion.hidden = false;
      summaryQuestion.innerHTML = `<span>${esc(data.ui.spreads.summaryQuestion)}</span><q>${esc(
        question
      )}</q>`;
    } else {
      summaryQuestion.hidden = true;
      summaryQuestion.textContent = "";
    }

    summary.hidden = false;
    summary.classList.add("is-visible");
  }

  function draw() {
    if (state.drawing) return;
    reset();
    state.drawing = true;
    drawButton.disabled = true;
    drawButton.hidden = true;
    revealButton.hidden = true;
    resetButton.hidden = true;
    board.classList.add("is-shuffling");
    if (hint) hint.textContent = data.ui.spreads.drawLede;

    state.cards = shuffle(data.cards).slice(0, spread.count);

    state.timers.push(
      window.setTimeout(() => {
        board.classList.remove("is-shuffling");
        state.cards.forEach((card, index) => {
          state.timers.push(
            window.setTimeout(() => {
              revealSlot(index);
            }, 120 * index + 120)
          );
        });
        revealButton.hidden = false;
      }, 520)
    );
  }

  drawButton.addEventListener("click", draw);
  revealButton.addEventListener("click", revealAll);
  resetButton.addEventListener("click", reset);

  if (significatorRoot) {
    significatorRoot.addEventListener("change", (event) => {
      if (event.target && event.target.name === "significator") {
        state.significator = event.target.value;
        if (state.revealed === spread.count) renderSummary();
      }
    });
  }

  createBoard();
  if (significatorRoot) significatorRoot.hidden = false;

  if (new URLSearchParams(window.location.search).get("demo") === "1") {
    document.documentElement.classList.add("is-demo");
    state.cards = shuffle(data.cards).slice(0, spread.count);
    revealAll();
  }
}

loadData()
  .then((data) => {
    initDaily(data);
    initReading(data);
  })
  .catch((error) => {
    const reading = document.querySelector("[data-reading]");
    if (reading) {
      const hint = reading.querySelector("[data-board-hint]");
      if (hint) hint.textContent = "The interactive reading could not load. Please refresh the page.";
    }
    console.error(error);
  });
