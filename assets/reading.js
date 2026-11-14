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
const preloadedArt = new Set();
const artPreloads = [];

function preloadCardArt(cards) {
  cards.forEach((card) => {
    if (!card.art || preloadedArt.has(card.art)) return;
    preloadedArt.add(card.art);
    const image = new Image();
    image.decoding = "async";
    image.src = `${BASE}/cards/${card.art}.webp`;
    artPreloads.push(image);
  });
}

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
  const face = `<article class="card-face ${mini ? "card-face--slot" : ""}" style="--card-accent: ${esc(
    card.accent
  )}">
    <span class="card-corner card-corner--start">
      <span class="card-number">${card.number}</span>
      <span class="card-playing ${isRed(suit) ? "is-red" : ""}" aria-label="${esc(
        `${card.playingCard.rank} of ${suitNames[LOCALE][suit]}`
      )}">${esc(card.playingCard.rank)}${suitSymbols[suit]}</span>
    </span>
    <span class="card-art" aria-hidden="true">
      <img src="${BASE}/cards/${esc(card.art)}.webp" alt="" width="384" height="384" loading="eager" decoding="async">
    </span>
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

function prefersReducedMotion() {
  return Boolean(
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
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
  preloadCardArt([card]);
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

  preloadCardArt(data.cards);

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
  const deckStage = root.querySelector("[data-deck]");
  const deckFan = root.querySelector("[data-deck-fan]");
  const deckStatus = root.querySelector("[data-deck-status]");
  const deckSkipHint = root.querySelector("[data-deck-skip-hint]");
  const deckCaption = root.querySelector("[data-deck-caption]");
  const isGrand = Boolean(spread.houses);
  const isLarge = spread.count > 10;

  if (!board || !drawButton || !revealButton || !resetButton || !deckStage || !deckFan) return;
  if (!deckStatus || !deckCaption) return;

  const state = {
    cards: [],
    deck: [],
    revealed: 0,
    revealedSet: new Set(),
    nextIndex: 0,
    deckStarted: false,
    locked: false,
    skipDwell: null,
    skipRequested: false,
    animations: [],
    flying: null,
    runId: 0,
    significator: "woman"
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

  function positionText(index) {
    const label = positionLabel(index);
    return label.name || label.number;
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

  function setStatus(text) {
    deckStatus.textContent = text;
  }

  function updateStatus() {
    if (!state.deckStarted) return;
    if (state.nextIndex >= spread.count) {
      setStatus(data.ui.spreads.deckAllChosen);
      return;
    }
    const position = positionText(state.nextIndex);
    const remaining = spread.count - state.nextIndex;
    setStatus(
      remaining === spread.count
        ? data.ui.spreads.deckReady.replace("{position}", position)
        : data.ui.spreads.deckLeft
            .replace("{n}", String(remaining))
            .replace("{position}", position)
    );
  }

  function hideCaption() {
    deckCaption.classList.remove("is-visible");
    if (deckSkipHint) deckSkipHint.hidden = true;
  }

  function showCaption(index, stage) {
    const label = positionLabel(index);
    deckCaption.textContent = data.ui.spreads.deckCaption
      .replace("{number}", label.number)
      .replace("{name}", label.name || label.number);
    deckCaption.style.top = `${Math.min(
      stage.top + stage.height + 20,
      window.innerHeight - 84
    )}px`;
    deckCaption.classList.add("is-visible");
    if (deckSkipHint) deckSkipHint.hidden = false;
  }

  function clearAnimations() {
    state.skipRequested = false;
    if (state.skipDwell) {
      const finishDwell = state.skipDwell;
      state.skipDwell = null;
      finishDwell();
    }
    state.animations.forEach((animation) => {
      try {
        animation.cancel();
      } catch (error) {
        // Animation may already have completed.
      }
    });
    state.animations = [];
    if (state.flying) {
      state.flying.remove();
      state.flying = null;
    }
    state.locked = false;
    deckStage.classList.remove("is-locked");
  }

  function reset() {
    state.runId += 1;
    clearAnimations();
    state.cards = Array(spread.count).fill(null);
    state.deck = [];
    state.revealed = 0;
    state.revealedSet = new Set();
    state.nextIndex = 0;
    state.deckStarted = false;
    state.skipRequested = false;
    createBoard();
    deckFan.innerHTML = "";
    deckStage.hidden = true;
    hideCaption();
    summary.hidden = true;
    summaryBody.innerHTML = "";
    summaryQuestion.hidden = true;
    summaryQuestion.textContent = "";
    drawButton.disabled = false;
    drawButton.hidden = false;
    revealButton.hidden = true;
    revealButton.disabled = false;
    resetButton.hidden = true;
    if (hint) hint.textContent = data.ui.spreads.drawLede;
    if (significatorRoot) significatorRoot.hidden = false;
    root.classList.remove("is-complete");
  }

  function renderDeck() {
    deckFan.innerHTML = "";
    const total = state.deck.length;
    if (!total) return;

    const spreadWidth = 58;
    const start = 50 - spreadWidth / 2;
    const step = total > 1 ? spreadWidth / (total - 1) : 0;
    const rotationStep = total > 1 ? Math.min(2.5, 40 / total) : 0;

    state.deck.forEach((card, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "deck-pick";
      button.style.setProperty("--deck-left", `${start + step * index}%`);
      button.style.setProperty(
        "--deck-rot",
        `${(index - (total - 1) / 2) * rotationStep}deg`
      );
      button.style.setProperty("--deck-z", String(index + 1));
      button.setAttribute(
        "aria-label",
        data.ui.spreads.deckCardAria.replace("{n}", String(index + 1))
      );
      button.innerHTML = cardBack();
      button.addEventListener("click", (event) => {
        if (state.locked) {
          skipCurrent();
          return;
        }
        pickCard(card, button, event.detail === 0);
      });
      deckFan.appendChild(button);
    });
  }

  function skipCurrent() {
    if (!state.locked) return;
    if (state.skipDwell) {
      state.skipDwell();
      return;
    }
    state.skipRequested = true;
  }

  function setRect(element, rect) {
    element.style.left = `${rect.left}px`;
    element.style.top = `${rect.top}px`;
    element.style.width = `${rect.width}px`;
    element.style.height = `${rect.height}px`;
  }

  function runAnimation(element, frames, options) {
    if (prefersReducedMotion() || typeof element.animate !== "function") {
      return Promise.resolve(false);
    }
    const animation = element.animate(frames, options);
    state.animations.push(animation);
    return animation.finished
      .then(
        () => true,
        () => false
      )
      .finally(() => {
        state.animations = state.animations.filter((item) => item !== animation);
      });
  }

  function animateGeometry(element, from, to, duration) {
    setRect(element, from);
    if (prefersReducedMotion() || typeof element.animate !== "function") {
      setRect(element, to);
      return Promise.resolve();
    }
    return runAnimation(
      element,
      [
        { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` },
        { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px` }
      ],
      {
        duration,
        easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
        fill: "forwards"
      }
    );
  }

  function stageRect(size) {
    const width = Math.max(72, Math.min(size.width || 140, window.innerWidth - 40));
    return {
      left: Math.max(20, (window.innerWidth - width) / 2),
      top: Math.max(64, window.innerHeight * 0.08),
      width,
      height: width * 1.6
    };
  }

  function createFlyingCard(card, rect) {
    const flying = document.createElement("div");
    flying.className = "flying-card";
    setRect(flying, rect);
    flying.tabIndex = 0;
    flying.setAttribute("role", "button");
    flying.setAttribute("aria-label", data.ui.spreads.deckContinueAria);
    flying.innerHTML = `<div class="flying-card-inner">
      <div class="flying-face flying-face--back">${cardBack()}</div>
      <div class="flying-face flying-face--front">${cardFace(card, { mini: isGrand })}</div>
    </div>`;
    const skip = (event) => {
      event.preventDefault();
      skipCurrent();
    };
    flying.addEventListener("click", skip);
    flying.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") skip(event);
    });
    document.body.appendChild(flying);
    state.flying = flying;
    return flying;
  }

  function flipCard(flying) {
    const inner = flying.querySelector(".flying-card-inner");
    if (!inner) return Promise.resolve();
    return runAnimation(
      inner,
      [{ transform: "rotateY(0deg)" }, { transform: "rotateY(180deg)" }],
      { duration: 550, easing: "ease-in-out", fill: "forwards" }
    );
  }

  function waitForDwell(duration) {
    if (prefersReducedMotion()) return Promise.resolve();
    return new Promise((resolve) => {
      const finishDwell = () => {
        window.clearTimeout(timer);
        if (state.skipDwell === finishDwell) state.skipDwell = null;
        resolve();
      };
      const timer = window.setTimeout(finishDwell, duration);
      state.skipDwell = finishDwell;
    });
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
  }

  function ensureSlotVisible(slot) {
    const previousBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    try {
      slot.scrollIntoView({ block: "center", inline: "center" });
      const rect = slot.getBoundingClientRect();
      const deckRect = deckStage.hidden ? null : deckStage.getBoundingClientRect();
      const safeTop = deckRect ? deckRect.bottom + 16 : 16;
      const safeBottom = window.innerHeight - 16;
      if (rect.top < safeTop) {
        window.scrollBy(0, rect.top - safeTop);
      } else if (rect.bottom > safeBottom) {
        window.scrollBy(0, rect.bottom - safeBottom);
      }
    } finally {
      document.documentElement.style.scrollBehavior = previousBehavior;
    }
  }

  function syncDeckStickyTop() {
    const header = document.querySelector(".site-header");
    const top = header ? header.offsetHeight + 8 : 84;
    document.documentElement.style.setProperty("--deck-sticky-top", `${top}px`);
  }

  syncDeckStickyTop();
  window.addEventListener("resize", syncDeckStickyTop, { passive: true });
  if ("ResizeObserver" in window) {
    const header = document.querySelector(".site-header");
    if (header) new ResizeObserver(syncDeckStickyTop).observe(header);
  }

  function finish() {
    state.deckStarted = false;
    state.locked = false;
    state.nextIndex = spread.count;
    state.deck = [];
    deckFan.innerHTML = "";
    deckStage.hidden = true;
    deckStage.classList.remove("is-locked");
    hideCaption();
    root.classList.add("is-complete");
    revealButton.hidden = true;
    revealButton.disabled = false;
    drawButton.hidden = true;
    resetButton.hidden = false;
    if (hint) hint.textContent = data.ui.spreads.readingComplete;
    renderSummary();
  }

  function renderSummary() {
    if (state.cards.some((card) => !card)) return;
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

  async function pickCard(card, sourceElement, fromKeyboard) {
    if (state.locked || !state.deckStarted || state.nextIndex >= spread.count) return;
    const runId = state.runId;
    const index = state.nextIndex;
    const slot = slots[index];
    const targetCard = slot ? slot.querySelector(".slot-card") : null;
    if (!slot || !targetCard) return;

    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = targetCard.getBoundingClientRect();
    const stage = stageRect(targetRect);
    const label = positionLabel(index);

    state.locked = true;
    state.skipRequested = false;
    deckStage.classList.add("is-locked");
    revealButton.disabled = true;

    state.deck = state.deck.filter((item) => item !== card);
    renderDeck();
    if (fromKeyboard) {
      const nextButton = deckFan.querySelector(".deck-pick");
      if (nextButton) nextButton.focus();
    }

    setStatus(data.ui.spreads.deckRevealing.replace("{position}", label.name || label.number));

    const flying = createFlyingCard(card, sourceRect);

    if (prefersReducedMotion()) {
      state.cards[index] = card;
      revealSlot(index);
      ensureSlotVisible(slot);
      flying.remove();
      state.flying = null;
      state.locked = false;
      deckStage.classList.remove("is-locked");
      revealButton.disabled = false;
      state.nextIndex += 1;
      updateStatus();
      if (state.nextIndex >= spread.count) finish();
      return;
    }

    await animateGeometry(flying, sourceRect, stage, 400);
    if (runId !== state.runId) return;

    await flipCard(flying);
    if (runId !== state.runId) return;

    state.cards[index] = card;
    revealSlot(index);

    if (!isLarge && !state.skipRequested) {
      showCaption(index, stage);
      await waitForDwell(1100);
      if (runId !== state.runId) return;
      hideCaption();
    }
    state.skipRequested = false;

    ensureSlotVisible(slot);
    if (runId !== state.runId) return;
    const landingRect = targetCard.getBoundingClientRect();
    await animateGeometry(
      flying,
      stage,
      {
        left: landingRect.left,
        top: landingRect.top,
        width: landingRect.width,
        height: landingRect.height
      },
      500
    );
    if (runId !== state.runId) return;

    flying.remove();
    state.flying = null;
    state.locked = false;
    deckStage.classList.remove("is-locked");
    revealButton.disabled = false;
    state.nextIndex += 1;
    updateStatus();
    if (state.nextIndex >= spread.count) finish();
  }

  function draw() {
    if (state.locked) return;
    reset();
    state.deckStarted = true;
    state.deck = shuffle(data.cards);
    state.cards = Array(spread.count).fill(null);
    state.nextIndex = 0;
    renderDeck();
    deckStage.hidden = false;
    deckStage.classList.remove("is-locked");
    drawButton.disabled = true;
    drawButton.hidden = true;
    revealButton.hidden = false;
    revealButton.disabled = false;
    resetButton.hidden = false;
    if (hint) hint.textContent = data.ui.spreads.drawLede;
    updateStatus();
  }

  function revealRemaining() {
    if (!state.deckStarted || state.locked) return;
    while (state.nextIndex < spread.count && state.deck.length) {
      const card = state.deck.shift();
      state.cards[state.nextIndex] = card;
      revealSlot(state.nextIndex);
      state.nextIndex += 1;
    }
    state.deck = [];
    deckFan.innerHTML = "";
    finish();
  }

  drawButton.addEventListener("click", draw);
  revealButton.addEventListener("click", revealRemaining);
  resetButton.addEventListener("click", reset);

  if (significatorRoot) {
    significatorRoot.addEventListener("change", (event) => {
      if (event.target && event.target.name === "significator") {
        state.significator = event.target.value;
        if (state.revealed === spread.count) renderSummary();
      }
    });
  }

  reset();

  if (new URLSearchParams(window.location.search).get("demo") === "1") {
    document.documentElement.classList.add("is-demo");
    draw();
    revealRemaining();
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
