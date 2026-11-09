import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { locales, defaultLocale, site } from "./data/locales.mjs";
import { ui, summaryTemplates } from "./data/ui.mjs";
import { cards } from "./data/cards.mjs";
import { spreads } from "./data/spreads.mjs";
import { page, redirectPage } from "./templates/layout.mjs";
import {
  esc,
  icon,
  cardFace,
  cardGrid,
  spreadTile,
  cardCountLabel,
  breadcrumbs,
  sectionHeader,
  playingCard,
  yesNoLabel,
  polarityLabel
} from "./templates/components.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const BASE = (process.env.BASE || "").replace(/\/+$/, "");
const SITE_URL = (process.env.SITE_URL || site.url).replace(/\/+$/, "");

function routePath(locale, route) {
  const code = typeof locale === "string" ? locale : locale.code;
  switch (route.type) {
    case "home":
      return `/${code}/`;
    case "spreads":
      return `/${code}/spreads/`;
    case "spread":
      return `/${code}/spreads/${route.slug}/`;
    case "cards":
      return `/${code}/cards/`;
    case "card":
      return `/${code}/cards/${route.slug}/`;
    case "about":
      return `/${code}/about/`;
    default:
      return `/${code}/`;
  }
}

function href(locale, route) {
  return `${BASE}${routePath(locale, route)}`;
}

function canonicalUrl(locale, route) {
  return `${SITE_URL}${BASE}${routePath(locale, route)}`;
}

function alternatesFor(route) {
  const list = locales.map((locale) => ({
    locale: locale.code,
    name: locale.name,
    hreflang: locale.htmlLang,
    href: href(locale, route)
  }));
  list.push({
    hreflang: "x-default",
    href: href(defaultLocale, route)
  });
  return list;
}

function outFile(locale, route) {
  return path.join(dist, routePath(locale, route).replace(/^\//, ""), "index.html");
}

async function writePage(locale, route, html) {
  const file = outFile(locale, route);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html);
}

function cardsHref(locale, slug) {
  return href(locale, { type: "card", slug });
}

function spreadHref(locale, slug) {
  return href(locale, { type: "spread", slug });
}

function localizedContent(card, locale) {
  return card.content[locale.code];
}

function searchText(card, locale) {
  const content = localizedContent(card, locale);
  return [content.name, ...content.keywords, content.core].join(" ").toLowerCase();
}

function cardMeta(card, locale, uiLocale) {
  return `<div class="card-meta">
    <div class="meta-item"><span class="meta-label">${esc(uiLocale.cards.playingCardTitle)}</span>${playingCard(card, locale.code)}</div>
    <div class="meta-item"><span class="meta-label">${esc(uiLocale.cards.yesNoTitle)}</span><span class="meta-value">${esc(yesNoLabel(card.yesNo, uiLocale))}</span></div>
    <div class="meta-item"><span class="meta-label">${esc(uiLocale.cards.polarityTitle)}</span><span class="meta-value polarity polarity--${esc(card.polarity)}">${esc(polarityLabel(card.polarity, uiLocale))}</span></div>
  </div>`;
}

function cardDetailBody(card, locale, uiLocale) {
  const content = localizedContent(card, locale);
  const prev = cards[(card.number - 2 + cards.length) % cards.length];
  const next = cards[card.number % cards.length];
  const related = spreads.slice(0, 3);

  return `<div class="wrap">
    ${breadcrumbs([
      { label: uiLocale.nav.home, href: href(locale, { type: "home" }) },
      { label: uiLocale.nav.cards, href: href(locale, { type: "cards" }) },
      { label: content.name }
    ])}
    <section class="card-hero">
      <div class="card-hero-visual">
        ${cardFace(card, { base: BASE, locale: locale.code, extraClass: "card-face--hero" })}
      </div>
      <div class="card-hero-copy">
        <p class="eyebrow">${esc(uiLocale.cards.cardNumber.replace("{n}", card.number))}</p>
        <h1>${esc(content.name)}</h1>
        <ul class="keyword-list">${content.keywords
          .map((word) => `<li>${esc(word)}</li>`)
          .join("")}</ul>
        <p class="card-hero-lede">${esc(content.core)}</p>
        ${cardMeta(card, locale, uiLocale)}
      </div>
    </section>

    <section class="section">
      <div class="reading-grid">
        <article class="prose-card prose-card--wide">
          <h2>${esc(uiLocale.cards.meaningTitle)}</h2>
          <p>${esc(content.core)}</p>
        </article>
        <article class="prose-card">
          <h2>${esc(uiLocale.cards.loveTitle)}</h2>
          <p>${esc(content.love)}</p>
        </article>
        <article class="prose-card">
          <h2>${esc(uiLocale.cards.workTitle)}</h2>
          <p>${esc(content.work)}</p>
        </article>
        <article class="prose-card">
          <h2>${esc(uiLocale.cards.healthTitle)}</h2>
          <p>${esc(content.health)}</p>
        </article>
        <article class="prose-card prose-card--accent">
          <h2>${esc(uiLocale.cards.adviceTitle)}</h2>
          <p>${esc(content.advice)}</p>
        </article>
        <article class="prose-card">
          <h2>${esc(uiLocale.cards.timingTitle)}</h2>
          <p>${esc(content.timing)}</p>
        </article>
      </div>
    </section>

    <section class="section in-reading">
      <div class="in-reading-card">
        <div>
          <p class="eyebrow">${esc(uiLocale.cards.inReadingTitle)}</p>
          <h2>${esc(content.name)} ${esc(uiLocale.common.keywords.toLowerCase())}</h2>
        </div>
        <p>${esc(
          uiLocale.cards.inReading.replace("{name}", content.name)
        )}</p>
      </div>
    </section>

    <section class="section">
      ${sectionHeader({ eyebrow: uiLocale.nav.spreads, title: uiLocale.cards.relatedSpreads })}
      <div class="spread-grid">${related
        .map((spread) =>
          spreadTile(spread, {
            base: BASE,
            locale: locale.code,
            href: spreadHref(locale, spread.slug),
            ui: uiLocale
          })
        )
        .join("")}</div>
    </section>

    <nav class="card-pager" aria-label="${esc(uiLocale.nav.cards)}">
      <a class="pager-link" href="${cardsHref(locale, prev.slug)}">
        <span class="pager-label">${esc(uiLocale.cards.previous)}</span>
        <span class="pager-name">← ${esc(localizedContent(prev, locale).name)}</span>
      </a>
      <a class="pager-link pager-link--end" href="${cardsHref(locale, next.slug)}">
        <span class="pager-label">${esc(uiLocale.cards.next)}</span>
        <span class="pager-name">${esc(localizedContent(next, locale).name)} →</span>
      </a>
    </nav>
  </div>`;
}

function homeBody(locale, uiLocale) {
  const featured = ["star", "moon", "key"].map((slug) => cards.find((card) => card.slug === slug));
  const preview = cards.slice(0, 12);
  const steps = uiLocale.home.steps
    .map(
      (step, index) => `<article class="step-card">
        <span class="step-number">${String(index + 1).padStart(2, "0")}</span>
        <h3>${esc(step.title)}</h3>
        <p>${esc(step.text)}</p>
      </article>`
    )
    .join("");

  return `<div class="wrap">
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">${esc(uiLocale.home.eyebrow)}</p>
        <h1>${esc(uiLocale.home.title)}</h1>
        <p class="hero-lede">${esc(uiLocale.home.lede)}</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="#daily">${esc(uiLocale.home.ctaPrimary)}</a>
          <a class="btn btn-ghost" href="${href(locale, { type: "spreads" })}">${esc(uiLocale.home.ctaSecondary)}</a>
        </div>
        <ul class="hero-badges">
          <li>${icon("shuffle", BASE, "badge-icon")}${esc(uiLocale.home.badgeSpreads)}</li>
          <li>${icon("book", BASE, "badge-icon")}${esc(uiLocale.common.cardCount.replace("{n}", "36"))}</li>
          <li>${icon("moon", BASE, "badge-icon")}${esc(uiLocale.common.free)} · ${esc(uiLocale.common.noSignup)}</li>
        </ul>
      </div>
      <div class="hero-visual" aria-hidden="true">
        ${featured
          .map((card, index) =>
            cardFace(card, {
              base: BASE,
              locale: locale.code,
              extraClass: `hero-card hero-card--${index + 1}`
            })
          )
          .join("")}
        <span class="hero-glow"></span>
      </div>
    </section>

    <section class="section daily-section" id="daily">
      <div class="daily-widget" data-daily>
        <div class="daily-card-holder" data-daily-holder>
          <div class="card-back">
            <span class="card-back-inner">${icon("moon-star", BASE, "card-back-icon")}</span>
          </div>
        </div>
        <div class="daily-copy">
          <p class="eyebrow">${esc(uiLocale.home.dailyEyebrow)}</p>
          <h2>${esc(uiLocale.home.dailyTitle)}</h2>
          <p>${esc(uiLocale.home.dailyLede)}</p>
          <button class="btn btn-primary" type="button" data-daily-button>${esc(uiLocale.home.dailyButton)}</button>
          <div class="daily-result" data-daily-result hidden></div>
          <p class="daily-note">${esc(uiLocale.home.dailyNote)}</p>
        </div>
      </div>
    </section>

    <section class="section">
      ${sectionHeader({
        eyebrow: uiLocale.home.spreadsEyebrow,
        title: uiLocale.home.spreadsTitle,
        lede: uiLocale.home.spreadsLede
      })}
      <div class="spread-grid">${spreads
        .map((spread) =>
          spreadTile(spread, {
            base: BASE,
            locale: locale.code,
            href: spreadHref(locale, spread.slug),
            ui: uiLocale
          })
        )
        .join("")}</div>
    </section>

    <section class="section cards-preview">
      ${sectionHeader({
        eyebrow: uiLocale.home.cardsEyebrow,
        title: uiLocale.home.cardsTitle,
        lede: uiLocale.home.cardsLede
      })}
      ${cardGrid(preview, {
        base: BASE,
        locale: locale.code,
        cardHref: (card) => cardsHref(locale, card.slug),
        compact: true
      })}
      <div class="section-action">
        <a class="btn btn-ghost" href="${href(locale, { type: "cards" })}">${esc(uiLocale.nav.cards)} →</a>
      </div>
    </section>

    <section class="section">
      ${sectionHeader({
        eyebrow: uiLocale.home.howEyebrow,
        title: uiLocale.home.howTitle
      })}
      <div class="steps-grid">${steps}</div>
    </section>

    <section class="section about-band">
      <div>
        <p class="eyebrow">${esc(uiLocale.home.aboutEyebrow)}</p>
        <h2>${esc(uiLocale.home.aboutTitle)}</h2>
        <p>${esc(uiLocale.home.aboutText)}</p>
      </div>
      <a class="btn btn-primary" href="${href(locale, { type: "about" })}">${esc(uiLocale.home.aboutCta)}</a>
    </section>
  </div>`;
}

function spreadsIndexBody(locale, uiLocale) {
  return `<div class="wrap">
    ${breadcrumbs([
      { label: uiLocale.nav.home, href: href(locale, { type: "home" }) },
      { label: uiLocale.nav.spreads }
    ])}
    <section class="page-hero">
      <p class="eyebrow">${esc(uiLocale.spreads.eyebrow)}</p>
      <h1>${esc(uiLocale.spreads.title)}</h1>
      <p class="page-lede">${esc(uiLocale.spreads.lede)}</p>
      <p class="page-note">${esc(uiLocale.spreads.note)}</p>
    </section>
    <section class="section">
      <div class="spread-grid spread-grid--all">${spreads
        .map((spread) =>
          spreadTile(spread, {
            base: BASE,
            locale: locale.code,
            href: spreadHref(locale, spread.slug),
            ui: uiLocale
          })
        )
        .join("")}</div>
    </section>
  </div>`;
}

function boardMarkup(spread, locale) {
  const content = spread.content[locale.code];
  const labels = spread.houses
    ? cards.map((card) => card.content[locale.code].name)
    : content.positions.map((position) => position.name);
  const back = `<div class="card-back" aria-hidden="true"><span class="card-back-inner">${icon(
    "moon-star",
    BASE,
    "card-back-icon"
  )}</span></div>`;

  return Array.from({ length: spread.count }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `<div class="slot" data-slot="${index}">
      <span class="slot-position"><span class="slot-number">${number}</span><span class="slot-name">${esc(
        labels[index] || ""
      )}</span></span>
      <div class="slot-card">${back}</div>
    </div>`;
  }).join("");
}

function spreadBody(spread, locale, uiLocale) {
  const content = spread.content[locale.code];
  const related = spreads.filter((item) => item.slug !== spread.slug).slice(0, 3);
  const firstHref = href(locale, { type: "spread", slug: spread.slug });
  const positions =
    spread.houses
      ? `<details class="houses">
          <summary>${esc(uiLocale.spreads.positionsTitle)} (36)</summary>
          <ol class="house-list">
            ${cards
              .map(
                (card, index) =>
                  `<li><span class="house-number">${index + 1}</span><span><strong>${esc(
                    card.content[locale.code].name
                  )}</strong> — ${esc(card.content[locale.code].core)}</span></li>`
              )
              .join("")}
          </ol>
        </details>`
      : `<ol class="position-list">${content.positions
          .map(
            (position, index) =>
              `<li><span class="position-number">${String(index + 1).padStart(2, "0")}</span><div><strong>${esc(
                position.name
              )}</strong><p>${esc(position.meaning)}</p></div></li>`
          )
          .join("")}</ol>`;

  const countLabel =
    spread.count === 1
      ? uiLocale.common.cardCountOne
      : uiLocale.common.cardCount.replace("{n}", String(spread.count));
  const howSteps = uiLocale.spreads.howSteps
    .map((step) => `<li>${esc(step.replace("{countLabel}", countLabel))}</li>`)
    .join("");

  const faqs = [
    { q: uiLocale.spreads.faqFreeQ, a: uiLocale.spreads.faqFreeA },
    {
      q: uiLocale.spreads.faqCountQ.replace("{name}", content.name),
      a: uiLocale.spreads.faqCountA.replace("{countLabel}", countLabel)
    },
    { q: uiLocale.spreads.faqQuestionQ, a: uiLocale.spreads.faqQuestionA },
    { q: uiLocale.spreads.faqUprightQ, a: uiLocale.spreads.faqUprightA }
  ];

  const faqHtml = faqs
    .map(
      (item) => `<details class="faq"><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`
    )
    .join("");

  const significator = spread.houses
    ? `<div class="significator" data-significator>
        <span class="significator-label">${esc(uiLocale.spreads.significatorLabel)}</span>
        <label><input type="radio" name="significator" value="woman" checked> ${esc(uiLocale.spreads.significatorWoman)}</label>
        <label><input type="radio" name="significator" value="man"> ${esc(uiLocale.spreads.significatorMan)}</label>
        <p>${esc(uiLocale.spreads.significatorHint)}</p>
      </div>`
    : "";

  return `<div class="wrap">
    ${breadcrumbs([
      { label: uiLocale.nav.home, href: href(locale, { type: "home" }) },
      { label: uiLocale.nav.spreads, href: href(locale, { type: "spreads" }) },
      { label: content.name }
    ])}
    <section class="page-hero">
      <p class="eyebrow">${esc(uiLocale.spreads.eyebrow)} · ${esc(cardCountLabel(spread.count, uiLocale))}</p>
      <h1>${esc(content.name)}</h1>
      <p class="page-lede">${esc(content.lede)}</p>
      <p class="page-note">${esc(content.intro)}</p>
    </section>

    <section class="section reading-shell" data-reading data-spread="${esc(spread.slug)}" data-locale="${esc(locale.code)}">
      <div class="reading-head">
        <div>
          <h2>${esc(uiLocale.spreads.drawTitle)}</h2>
          <p>${esc(uiLocale.spreads.drawLede)}</p>
        </div>
        <p class="free-pill">${esc(uiLocale.common.free)} · ${esc(uiLocale.common.noSignup)}</p>
      </div>
      <div class="reading-controls">
        <label class="field">
          <span>${esc(uiLocale.spreads.questionLabel)}</span>
          <textarea data-question rows="2" placeholder="${esc(uiLocale.spreads.questionPlaceholder)}"></textarea>
        </label>
        <div class="reading-actions">
          <button class="btn btn-primary" type="button" data-draw>${esc(uiLocale.spreads.shuffle)}</button>
          <button class="btn btn-ghost" type="button" data-reveal hidden>${esc(uiLocale.spreads.revealAll)}</button>
          <button class="btn btn-ghost" type="button" data-reset hidden>${esc(uiLocale.spreads.newReading)}</button>
        </div>
      </div>
      ${significator}
      <div class="board-scroll">
        <div class="board" data-board data-layout="${esc(spread.layout)}" data-count="${spread.count}">${boardMarkup(
          spread,
          locale
        )}</div>
      </div>
      ${
        spread.layout === "grand" || spread.layout === "cross13"
          ? `<p class="board-scroll-hint">${esc(uiLocale.spreads.scrollHint)}</p>`
          : ""
      }
      <p class="board-hint" data-board-hint>${esc(uiLocale.spreads.drawLede)}</p>
      <div class="summary" data-summary hidden>
        <div class="summary-head">
          <p class="eyebrow">${esc(uiLocale.spreads.summaryEyebrow)}</p>
          <h3>${esc(uiLocale.spreads.summaryTitle)}</h3>
        </div>
        <p class="summary-question" data-summary-question hidden></p>
        <div class="summary-body" data-summary-body></div>
      </div>
      <noscript><p class="board-hint">Enable JavaScript to draw cards interactively. Every card meaning and spread position is still available below.</p></noscript>
    </section>

    <section class="section split-section">
      <div>
        ${sectionHeader({ eyebrow: uiLocale.spreads.eyebrow, title: uiLocale.spreads.positionsTitle })}
        ${positions}
      </div>
      <aside class="how-card">
        <h2>${esc(uiLocale.spreads.howTitle)}</h2>
        <ol>${howSteps}</ol>
        <div class="reading-note">
          <h3>${esc(uiLocale.spreads.noteTitle)}</h3>
          <p>${esc(content.note)}</p>
        </div>
      </aside>
    </section>

    <section class="section">
      ${sectionHeader({ eyebrow: uiLocale.spreads.faqEyebrow, title: uiLocale.spreads.faqTitle })}
      <div class="faq-list">${faqHtml}</div>
    </section>

    <section class="section">
      ${sectionHeader({ eyebrow: uiLocale.nav.spreads, title: uiLocale.spreads.relatedTitle })}
      <div class="spread-grid">${related
        .map((item) =>
          spreadTile(item, {
            base: BASE,
            locale: locale.code,
            href: spreadHref(locale, item.slug),
            ui: uiLocale
          })
        )
        .join("")}</div>
      <div class="section-action">
        <a class="btn btn-ghost" href="${href(locale, { type: "spreads" })}">${esc(uiLocale.common.allSpreads)} →</a>
      </div>
    </section>
  </div>

  <script type="application/json" data-spread-faq>${JSON.stringify(faqs)}</script>`;
}

function cardsIndexBody(locale, uiLocale) {
  return `<div class="wrap">
    ${breadcrumbs([
      { label: uiLocale.nav.home, href: href(locale, { type: "home" }) },
      { label: uiLocale.nav.cards }
    ])}
    <section class="page-hero">
      <p class="eyebrow">${esc(uiLocale.cards.eyebrow)}</p>
      <h1>${esc(uiLocale.cards.title)}</h1>
      <p class="page-lede">${esc(uiLocale.cards.lede)}</p>
    </section>
    <section class="section">
      <div class="cards-toolbar">
        <label class="search-field">
          <span class="visually-hidden">${esc(uiLocale.cards.searchPlaceholder)}</span>
          ${icon("search", BASE, "search-icon")}
          <input type="search" data-card-search placeholder="${esc(uiLocale.cards.searchPlaceholder)}" autocomplete="off">
        </label>
        <p class="cards-count" data-card-count data-template="${esc(uiLocale.cards.showing)}">${esc(
          uiLocale.cards.showing.replace("{shown}", String(cards.length)).replace("{total}", String(cards.length))
        )}</p>
      </div>
      <div class="card-grid" data-card-grid>
        ${cards
          .map(
            (card) => `<div class="card-grid-item" data-card-item data-search="${esc(
              searchText(card, locale)
            )}">
              ${cardFace(card, {
                base: BASE,
                locale: locale.code,
                href: cardsHref(locale, card.slug)
              })}
            </div>`
          )
          .join("")}
      </div>
      <p class="no-results" data-no-results hidden>${esc(uiLocale.cards.noResults)}</p>
    </section>
  </div>`;
}

function aboutBody(locale, uiLocale) {
  const sections = uiLocale.about.sections
    .map(
      (section) => `<article class="prose-card prose-card--wide">
        <h2>${esc(section.title)}</h2>
        <p>${esc(section.text)}</p>
      </article>`
    )
    .join("");
  const faqHtml = uiLocale.about.faqs
    .map(
      (item) => `<details class="faq"><summary>${esc(item.q)}</summary><p>${esc(item.a)}</p></details>`
    )
    .join("");

  return `<div class="wrap">
    ${breadcrumbs([
      { label: uiLocale.nav.home, href: href(locale, { type: "home" }) },
      { label: uiLocale.nav.about }
    ])}
    <section class="page-hero">
      <p class="eyebrow">${esc(uiLocale.about.eyebrow)}</p>
      <h1>${esc(uiLocale.about.title)}</h1>
      <p class="page-lede">${esc(uiLocale.about.lede)}</p>
    </section>
    <section class="section reading-grid">${sections}</section>
    <section class="section">
      ${sectionHeader({ eyebrow: uiLocale.about.faqEyebrow, title: uiLocale.about.faqTitle })}
      <div class="faq-list">${faqHtml}</div>
    </section>
    <section class="section">
      <div class="disclaimer-card">
        <h2>${esc(uiLocale.about.disclaimerTitle)}</h2>
        <p>${esc(uiLocale.about.disclaimerText)}</p>
      </div>
    </section>
  </div>`;
}

function dataForLocale(locale) {
  const houses = cards.map((card, index) => ({
    number: index + 1,
    slug: card.slug,
    name: card.content[locale.code].name,
    meaning: card.content[locale.code].core,
    keywords: card.content[locale.code].keywords
  }));

  return {
    locale: locale.code,
    dir: locale.dir,
    pageBase: `${BASE}/${locale.code}/`,
    cards: cards.map((card) => ({
      number: card.number,
      slug: card.slug,
      icon: card.icon,
      playingCard: card.playingCard,
      polarity: card.polarity,
      yesNo: card.yesNo,
      ...card.content[locale.code]
    })),
    spreads: spreads.map((spread) => {
      const content = spread.content[locale.code];
      return {
        slug: spread.slug,
        layout: spread.layout,
        count: spread.count,
        focusIndex: spread.focusIndex,
        adviceIndex: spread.adviceIndex,
        outcomeIndex: spread.outcomeIndex,
        houses: spread.houses ? houses : undefined,
        name: content.name,
        short: content.short,
        lede: content.lede,
        intro: content.intro,
        note: content.note,
        positions: content.positions
      };
    }),
    templates: summaryTemplates[locale.code],
    ui: {
      home: ui[locale.code].home,
      spreads: ui[locale.code].spreads,
      cards: ui[locale.code].cards,
      common: ui[locale.code].common
    }
  };
}

function jsonLdBreadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

async function buildHome(locale) {
  const uiLocale = ui[locale.code];
  const route = { type: "home" };
  const canonical = canonicalUrl(locale, route);
  const body = homeBody(locale, uiLocale);
  const html = page({
    locale,
    ui: uiLocale,
    base: BASE,
    title: `${uiLocale.siteName} — ${uiLocale.tagline}`,
    description: uiLocale.home.lede,
    canonical,
    alternates: alternatesFor(route),
    body,
    routeType: "home",
    scripts: ["reading"],
    jsonLd: [
      {
        "@type": "WebSite",
        name: uiLocale.siteName,
        url: canonical,
        description: uiLocale.home.lede,
        inLanguage: locale.htmlLang,
        sameAs: [site.github, site.repository]
      },
      {
        "@type": "ItemList",
        name: uiLocale.home.spreadsTitle,
        itemListElement: spreads.map((spread, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: spread.content[locale.code].name,
          url: canonicalUrl(locale, { type: "spread", slug: spread.slug })
        }))
      }
    ]
  });
  await writePage(locale, route, html);
}

async function buildSpreads(locale) {
  const uiLocale = ui[locale.code];
  const route = { type: "spreads" };
  const canonical = canonicalUrl(locale, route);
  const html = page({
    locale,
    ui: uiLocale,
    base: BASE,
    title: `${uiLocale.spreads.title} — ${uiLocale.siteName}`,
    description: uiLocale.spreads.lede,
    canonical,
    alternates: alternatesFor(route),
    body: spreadsIndexBody(locale, uiLocale),
    routeType: "spreads",
    jsonLd: [
      {
        "@type": "CollectionPage",
        name: uiLocale.spreads.title,
        description: uiLocale.spreads.lede,
        url: canonical,
        inLanguage: locale.htmlLang
      },
      {
        "@type": "ItemList",
        itemListElement: spreads.map((spread, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: spread.content[locale.code].name,
          url: canonicalUrl(locale, { type: "spread", slug: spread.slug })
        }))
      }
    ]
  });
  await writePage(locale, route, html);
}

async function buildSpread(spread, locale) {
  const uiLocale = ui[locale.code];
  const content = spread.content[locale.code];
  const route = { type: "spread", slug: spread.slug };
  const canonical = canonicalUrl(locale, route);
  const countLabel =
    spread.count === 1
      ? uiLocale.common.cardCountOne
      : uiLocale.common.cardCount.replace("{n}", String(spread.count));
  const faqs = [
    { q: uiLocale.spreads.faqFreeQ, a: uiLocale.spreads.faqFreeA },
    {
      q: uiLocale.spreads.faqCountQ.replace("{name}", content.name),
      a: uiLocale.spreads.faqCountA.replace("{countLabel}", countLabel)
    },
    { q: uiLocale.spreads.faqQuestionQ, a: uiLocale.spreads.faqQuestionA },
    { q: uiLocale.spreads.faqUprightQ, a: uiLocale.spreads.faqUprightA }
  ];

  const html = page({
    locale,
    ui: uiLocale,
    base: BASE,
    title: `${content.name} — ${uiLocale.siteName}`,
    description: content.lede,
    canonical,
    alternates: alternatesFor(route),
    body: spreadBody(spread, locale, uiLocale),
    routeType: "spread",
    scripts: ["reading"],
    jsonLd: [
      {
        "@type": "Article",
        headline: `${content.name} — Lenormand`,
        description: content.lede,
        inLanguage: locale.htmlLang,
        mainEntityOfPage: canonical,
        author: { "@type": "Organization", name: uiLocale.siteName }
      },
      jsonLdBreadcrumb([
        { name: uiLocale.nav.home, url: canonicalUrl(locale, { type: "home" }) },
        { name: uiLocale.nav.spreads, url: canonicalUrl(locale, { type: "spreads" }) },
        { name: content.name, url: canonical }
      ]),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a }
        }))
      }
    ]
  });
  await writePage(locale, route, html);
}

async function buildCards(locale) {
  const uiLocale = ui[locale.code];
  const route = { type: "cards" };
  const canonical = canonicalUrl(locale, route);
  const html = page({
    locale,
    ui: uiLocale,
    base: BASE,
    title: `${uiLocale.cards.title} — ${uiLocale.siteName}`,
    description: uiLocale.cards.lede,
    canonical,
    alternates: alternatesFor(route),
    body: cardsIndexBody(locale, uiLocale),
    routeType: "cards",
    scripts: ["cards"],
    jsonLd: [
      {
        "@type": "CollectionPage",
        name: uiLocale.cards.title,
        description: uiLocale.cards.lede,
        url: canonical,
        inLanguage: locale.htmlLang
      },
      {
        "@type": "ItemList",
        itemListElement: cards.map((card, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: card.content[locale.code].name,
          url: canonicalUrl(locale, { type: "card", slug: card.slug })
        }))
      }
    ]
  });
  await writePage(locale, route, html);
}

async function buildCard(card, locale) {
  const uiLocale = ui[locale.code];
  const content = card.content[locale.code];
  const route = { type: "card", slug: card.slug };
  const canonical = canonicalUrl(locale, route);
  const html = page({
    locale,
    ui: uiLocale,
    base: BASE,
    title: `${content.name} — ${uiLocale.cards.cardNumber.replace("{n}", card.number)} — ${uiLocale.siteName}`,
    description: content.core,
    canonical,
    alternates: alternatesFor(route),
    body: cardDetailBody(card, locale, uiLocale),
    routeType: "card",
    jsonLd: [
      {
        "@type": "Article",
        headline: `${content.name} — Lenormand card ${card.number}`,
        description: content.core,
        inLanguage: locale.htmlLang,
        mainEntityOfPage: canonical,
        author: { "@type": "Organization", name: uiLocale.siteName }
      },
      jsonLdBreadcrumb([
        { name: uiLocale.nav.home, url: canonicalUrl(locale, { type: "home" }) },
        { name: uiLocale.nav.cards, url: canonicalUrl(locale, { type: "cards" }) },
        { name: content.name, url: canonical }
      ])
    ]
  });
  await writePage(locale, route, html);
}

async function buildAbout(locale) {
  const uiLocale = ui[locale.code];
  const route = { type: "about" };
  const canonical = canonicalUrl(locale, route);
  const html = page({
    locale,
    ui: uiLocale,
    base: BASE,
    title: `${uiLocale.about.title} — ${uiLocale.siteName}`,
    description: uiLocale.about.lede,
    canonical,
    alternates: alternatesFor(route),
    body: aboutBody(locale, uiLocale),
    routeType: "about",
    jsonLd: [
      {
        "@type": "AboutPage",
        name: uiLocale.about.title,
        description: uiLocale.about.lede,
        url: canonical,
        inLanguage: locale.htmlLang
      },
      {
        "@type": "FAQPage",
        mainEntity: uiLocale.about.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a }
        }))
      }
    ]
  });
  await writePage(locale, route, html);
}

async function buildSitemap() {
  const routes = [];
  for (const locale of locales) {
    routes.push({ locale, route: { type: "home" } });
    routes.push({ locale, route: { type: "spreads" } });
    for (const spread of spreads) routes.push({ locale, route: { type: "spread", slug: spread.slug } });
    routes.push({ locale, route: { type: "cards" } });
    for (const card of cards) routes.push({ locale, route: { type: "card", slug: card.slug } });
    routes.push({ locale, route: { type: "about" } });
  }

  const urls = routes
    .map(({ locale, route }) => {
      const links = locales
        .map(
          (alt) =>
            `<xhtml:link rel="alternate" hreflang="${esc(alt.htmlLang)}" href="${esc(
              canonicalUrl(alt, route)
            )}"/>`
        )
        .join("");
      return `<url><loc>${esc(canonicalUrl(locale, route))}</loc>${links}<xhtml:link rel="alternate" hreflang="x-default" href="${esc(
        canonicalUrl(defaultLocale, route)
      )}"/></url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;
  await writeFile(path.join(dist, "sitemap.xml"), xml);

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}${BASE}/sitemap.xml\n`;
  await writeFile(path.join(dist, "robots.txt"), robots);
}

async function build404() {
  const locale = locales.find((item) => item.code === defaultLocale);
  const uiLocale = ui[locale.code];
  const body = `<div class="wrap page-hero">
    <p class="eyebrow">404</p>
    <h1>${esc(uiLocale.siteName)}</h1>
    <p class="page-lede">This page could not be found.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="${href(locale, { type: "home" })}">${esc(uiLocale.nav.home)}</a>
      <a class="btn btn-ghost" href="${href(locale, { type: "spreads" })}">${esc(uiLocale.nav.spreads)}</a>
    </div>
  </div>`;
  const html = page({
    locale,
    ui: uiLocale,
    base: BASE,
    title: "404 — " + uiLocale.siteName,
    description: "This page could not be found.",
    canonical: `${SITE_URL}${BASE}/404.html`,
    alternates: [{ hreflang: locale.htmlLang, href: `${BASE}/${locale.code}/` }],
    body,
    routeType: "home"
  });
  await writeFile(path.join(dist, "404.html"), html);
}

async function build() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  await cp(path.join(root, "assets"), path.join(dist, "assets"), { recursive: true });

  for (const locale of locales) {
    await buildHome(locale);
    await buildSpreads(locale);
    for (const spread of spreads) await buildSpread(spread, locale);
    await buildCards(locale);
    for (const card of cards) await buildCard(card, locale);
    await buildAbout(locale);
    await writeFile(
      path.join(dist, "assets", `data-${locale.code}.json`),
      JSON.stringify(dataForLocale(locale))
    );
  }

  await writeFile(path.join(dist, "index.html"), redirectPage(`${BASE}/${defaultLocale}/`));
  await build404();
  await buildSitemap();

  const pageCount = locales.length * (1 + 1 + spreads.length + 1 + cards.length + 1);
  console.log(`Built ${pageCount} localized pages + 404, sitemap, robots and data files.`);
  console.log(`Output: ${dist}`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
