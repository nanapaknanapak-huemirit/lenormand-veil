export function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function icon(name, base, className = "icon") {
  return `<svg class="${className}" aria-hidden="true" focusable="false"><use href="${base}/assets/icons.svg#icon-${esc(name)}"></use></svg>`;
}

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

export function playingCard(card, locale, className = "") {
  const suit = card.playingCard.suit;
  const red = suit === "hearts" || suit === "diamonds";
  return `<span class="playing-card ${red ? "is-red" : ""} ${className}" aria-label="${esc(`${card.playingCard.rank} of ${suitNames[locale][suit]}`)}"><span>${esc(card.playingCard.rank)}</span><span>${suitSymbols[suit]}</span></span>`;
}

export function cardFace(card, { base, locale, href = "", compact = false, extraClass = "" }) {
  const content = card.content[locale];
  const keywords = compact ? "" : `<span class="card-keywords">${esc(content.keywords.join(" · "))}</span>`;
  const face = `
    <article class="card-face ${compact ? "card-face--compact" : ""} ${extraClass}">
      <span class="card-corner card-corner--start">
        <span class="card-number">${card.number}</span>
        ${playingCard(card, locale, "card-playing")}
      </span>
      <span class="card-icon">${icon(card.icon, base, "card-symbol")}</span>
      <span class="card-name">${esc(content.name)}</span>
      ${keywords}
    </article>`;
  if (!href) return face;
  return `<a class="card-face-link" href="${href}" aria-label="${esc(content.name)}">${face}</a>`;
}

export function cardGrid(cards, { base, locale, cardHref, compact = false }) {
  return `<div class="card-grid">${cards
    .map((card) => cardFace(card, { base, locale, href: cardHref(card), compact }))
    .join("")}</div>`;
}

export function cardCountLabel(count, ui) {
  return count === 1 ? ui.common.cardCountOne : ui.common.cardCount.replace("{n}", String(count));
}

export function spreadTile(spread, { base, locale, href, ui }) {
  const content = spread.content[locale];
  return `
    <a class="spread-tile" href="${href}">
      <span class="spread-tile-top">
        <span class="spread-tile-icon">${icon(spread.icon, base, "tile-icon")}</span>
        <span class="spread-tile-count">${esc(cardCountLabel(spread.count, ui))}</span>
      </span>
      <h3>${esc(content.name)}</h3>
      <p>${esc(content.short)}</p>
      <span class="spread-tile-cta">${esc(ui.common.openSpread)} <span aria-hidden="true">→</span></span>
    </a>`;
}

export function breadcrumbs(items) {
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items
    .map((item, index) =>
      index === items.length - 1
        ? `<li aria-current="page">${esc(item.label)}</li>`
        : `<li><a href="${item.href}">${esc(item.label)}</a></li>`
    )
    .join("")}</ol></nav>`;
}

export function sectionHeader({ eyebrow, title, lede, id = "" }) {
  return `<header class="section-head"${id ? ` id="${id}"` : ""}>
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
    <h2>${esc(title)}</h2>
    ${lede ? `<p class="section-lede">${esc(lede)}</p>` : ""}
  </header>`;
}

export function yesNoLabel(value, ui) {
  return ui.common[value] || value;
}

export function polarityLabel(value, ui) {
  return ui.common[value] || value;
}
