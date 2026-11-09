import test from "node:test";
import assert from "node:assert/strict";

import { buildSummary, hashString } from "../assets/summary.js";
import { cards } from "../src/data/cards.mjs";
import { spreads } from "../src/data/spreads.mjs";
import { summaryTemplates } from "../src/data/ui.mjs";

function localizeCard(card, locale = "en") {
  return {
    number: card.number,
    slug: card.slug,
    polarity: card.polarity,
    yesNo: card.yesNo,
    ...card.content[locale]
  };
}

function localizeSpread(spread, locale = "en") {
  const content = spread.content[locale];
  return {
    slug: spread.slug,
    layout: spread.layout,
    count: spread.count,
    focusIndex: spread.focusIndex,
    adviceIndex: spread.adviceIndex,
    outcomeIndex: spread.outcomeIndex,
    houses: spread.houses
      ? cards.map((card, index) => ({
          number: index + 1,
          slug: card.slug,
          name: card.content[locale].name,
          meaning: card.content[locale].core,
          keywords: card.content[locale].keywords
        }))
      : undefined,
    positions: content.positions
  };
}

function drawFor(spread, slots) {
  return slots.map((slug) => localizeCard(cards.find((card) => card.slug === slug)));
}

test("hashString is deterministic", () => {
  assert.equal(hashString("lenormand"), hashString("lenormand"));
  assert.notEqual(hashString("lenormand"), hashString("lenormand!"));
});

test("five-card summary includes every card and the advice", () => {
  const spread = localizeSpread(spreads.find((item) => item.slug === "five-cards"));
  const drawn = drawFor(spread, ["rider", "clouds", "heart", "key", "sun"]);
  const result = buildSummary({
    cards: drawn,
    spread,
    templates: summaryTemplates.en
  });
  const text = result.paragraphs.join(" ");

  assert.ok(result.paragraphs.length >= 6);
  drawn.forEach((card) => assert.ok(text.includes(card.core), `${card.slug} core missing`));
  assert.ok(text.includes(drawn[3].advice), "advice missing");
  assert.ok(text.includes("Sun"), "outcome card missing");
});

test("single-card summary stays focused", () => {
  const spread = localizeSpread(spreads.find((item) => item.slug === "daily-card"));
  const drawn = drawFor(spread, ["moon"]);
  const result = buildSummary({
    cards: drawn,
    spread,
    templates: summaryTemplates.en
  });
  const text = result.paragraphs.join(" ");

  assert.ok(text.includes("Moon"));
  assert.ok(text.includes(drawn[0].core));
  assert.ok(result.paragraphs.length >= 2);
});

test("grand tableau highlights significator, corners and fate line", () => {
  const spread = localizeSpread(spreads.find((item) => item.slug === "grand-tableau"));
  const drawn = cards.map((card) => localizeCard(card));
  const result = buildSummary({
    cards: drawn,
    spread,
    templates: summaryTemplates.en,
    significator: "woman"
  });
  const text = result.paragraphs.join(" ");

  assert.ok(text.includes("Woman"));
  assert.ok(text.includes("Rider"));
  assert.ok(text.includes("Cross"));
  assert.ok(result.paragraphs.length >= 6);
});

test("summary output is deterministic for the same draw", () => {
  const spread = localizeSpread(spreads.find((item) => item.slug === "three-cards"));
  const drawn = drawFor(spread, ["clover", "birds", "anchor"]);
  const one = buildSummary({ cards: drawn, spread, templates: summaryTemplates.en });
  const two = buildSummary({ cards: drawn, spread, templates: summaryTemplates.en });
  assert.deepEqual(one.paragraphs, two.paragraphs);
});

test("Hebrew summaries use Hebrew card names", () => {
  const spread = localizeSpread(spreads.find((item) => item.slug === "three-cards"), "he");
  const drawn = drawFor(spread, ["rider", "tree", "key"]).map((card) => {
    const original = cards.find((item) => item.slug === card.slug);
    return localizeCard(original, "he");
  });
  const result = buildSummary({
    cards: drawn,
    spread,
    templates: summaryTemplates.he
  });
  const text = result.paragraphs.join(" ");

  assert.ok(text.includes("רוכב"));
  assert.ok(text.includes("מפתח"));
});
