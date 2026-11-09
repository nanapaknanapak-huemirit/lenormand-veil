export function hashString(input) {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function pick(list, seed) {
  if (!Array.isArray(list) || list.length === 0) return "";
  return list[Math.abs(seed) % list.length];
}

function fill(template, values) {
  return String(template || "").replace(/\{(\w+)\}/g, (match, key) => {
    const value = values[key];
    return value === undefined || value === null ? match : String(value);
  });
}

function keywords(card, separator) {
  return (card.keywords || []).join(separator || ", ");
}

function balanceOf(cards, templates, seed) {
  const positive = cards.filter((card) => card.polarity === "positive").length;
  const challenging = cards.filter((card) => card.polarity === "challenging").length;
  if (positive > challenging) {
    return { key: "positive", text: pick(templates.balancePositive, seed) };
  }
  if (challenging > positive) {
    return { key: "challenging", text: pick(templates.balanceNegative, seed) };
  }
  return { key: "mixed", text: pick(templates.balanceMixed, seed) };
}

function grandSummary({ cards, spread, templates, significator }) {
  const separator = templates.listSep || ", ";
  const seed = hashString(`${cards.map((card) => card.slug).join("-")}|${spread.slug}|${significator}`);
  const houses = spread.houses || [];
  const paragraphs = [];

  const sigSlug = significator === "man" ? "man" : "woman";
  const sigIndex = cards.findIndex((card) => card.slug === sigSlug);
  const sigCard = sigIndex >= 0 ? cards[sigIndex] : cards[0];
  const sigHouse = houses[sigIndex] || { name: "", meaning: "" };

  paragraphs.push(
    fill(pick(templates.grandOpening, seed), {
      card: sigCard.name,
      house: sigHouse.name,
      houseMeaning: sigHouse.meaning
    })
  );
  paragraphs.push(fill(pick(templates.grandSigMessage, seed + 1), { core: sigCard.core }));

  const heart = cards[spread.focusIndex] || cards[13];
  if (heart) {
    const heartHouse = houses[spread.focusIndex] || houses[13] || { name: "" };
    paragraphs.push(
      fill(pick(templates.grandHeart, seed + 2), {
        card: heart.name,
        house: heartHouse.name,
        keywords: keywords(heart, separator)
      })
    );
  }

  const cornerIndexes = [0, 8, 27, 35];
  const cornerCards = cornerIndexes.map((index) => cards[index]).filter(Boolean);
  if (cornerCards.length) {
    paragraphs.push(
      fill(pick(templates.grandCorners, seed + 3), {
        cards: cornerCards.map((card) => card.name).join(separator),
        keywords: cornerCards.map((card) => keywords(card, separator)).join(separator)
      })
    );
  }

  const fateIndexes = [0, 10, 20, 30];
  const fateCards = fateIndexes.map((index) => cards[index]).filter(Boolean);
  if (fateCards.length) {
    paragraphs.push(
      fill(pick(templates.grandFate, seed + 4), {
        cards: fateCards.map((card) => card.name).join(separator)
      })
    );
  }

  const balance = balanceOf(cards, templates, seed + 5);
  paragraphs.push(balance.text);
  paragraphs.push(
    fill(pick(templates.grandAdvice, seed + 6), {
      advice: sigCard.advice
    })
  );

  return { paragraphs, balance: balance.key, significator: sigSlug };
}

export function buildSummary({ cards, spread, templates, significator = "woman" }) {
  if (!cards || !cards.length || !spread || !templates) {
    return { paragraphs: [], balance: "mixed" };
  }

  if (spread.houses) {
    return grandSummary({ cards, spread, templates, significator });
  }

  const separator = templates.listSep || ", ";
  const seed = hashString(`${cards.map((card) => card.slug).join("-")}|${spread.slug}`);
  const positions = spread.positions || [];
  const paragraphs = [];

  if (cards.length > 1) {
    paragraphs.push(
      fill(pick(templates.thread, seed), {
        first: cards[0].name,
        last: cards[cards.length - 1].name
      })
    );
  }

  cards.forEach((card, index) => {
    const position = positions[index] || { name: "" };
    paragraphs.push(
      fill(pick(templates.position, seed + index + 1), {
        card: card.name,
        position: position.name,
        core: card.core,
        keywords: keywords(card, separator)
      })
    );
  });

  const focusCard = spread.focusIndex !== null ? cards[spread.focusIndex] : null;
  if (focusCard && cards.length > 1) {
    paragraphs.push(
      fill(pick(templates.focus, seed + 21), {
        card: focusCard.name,
        keywords: keywords(focusCard, separator)
      })
    );
  }

  const balance = balanceOf(cards, templates, seed + 22);
  paragraphs.push(balance.text);

  if (cards.length >= 3) {
    paragraphs.push(
      fill(pick(templates.mirror, seed + 23), {
        a: cards[0].name,
        b: cards[cards.length - 1].name,
        aKeywords: keywords(cards[0], separator),
        bKeywords: keywords(cards[cards.length - 1], separator)
      })
    );
  }

  if (cards.length >= 5 && cards.length <= 9) {
    paragraphs.push(
      fill(pick(templates.mirror, seed + 24), {
        a: cards[1].name,
        b: cards[cards.length - 2].name,
        aKeywords: keywords(cards[1], separator),
        bKeywords: keywords(cards[cards.length - 2], separator)
      })
    );
  }

  const adviceCard =
    spread.adviceIndex !== null && cards[spread.adviceIndex] ? cards[spread.adviceIndex] : null;
  if (adviceCard) {
    paragraphs.push(
      fill(pick(templates.advice, seed + 25), {
        advice: adviceCard.advice
      })
    );
  }

  const outcomeCard =
    spread.outcomeIndex !== null && cards[spread.outcomeIndex] ? cards[spread.outcomeIndex] : null;
  if (outcomeCard && cards.length > 1) {
    paragraphs.push(
      fill(pick(templates.outcome, seed + 26), {
        card: outcomeCard.name,
        keywords: keywords(outcomeCard, separator)
      })
    );
  }

  if (adviceCard) {
    paragraphs.push(
      fill(pick(templates.closing, seed + 27), {
        advice: adviceCard.advice
      })
    );
  }

  return { paragraphs, balance: balance.key };
}
