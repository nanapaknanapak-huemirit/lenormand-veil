# Lenormand Veil

A bilingual (English / Hebrew) Lenormand readings website. It includes the full
36-card deck, seven reading spreads, and a combined interpretation generated for
every draw. The site is fully static: the build writes plain HTML, CSS, JS and
JSON with no runtime dependencies.

## Features

- All 36 Lenormand cards with English and Hebrew meanings: keywords, core
  meaning, love, work, health, advice, timing, yes/no, polarity and playing-card
  inset.
- Seven spreads: Daily Card (1), Three Cards (3), Five Cards (5), Love Seven
  (7), Nine Cards (3x3), Thirteen Cards (4/5/4) and Grand Tableau (9x4 with
  houses and a significator).
- Interactive draw, shuffle and reveal with a deterministic combined reading
  for the whole spread.
- Localized routes (`/en/...`, `/he/...`), RTL support for Hebrew, canonical
  URLs, hreflang alternates, sitemap, robots and JSON-LD.
- Responsive dark theme, keyboard-friendly controls and reduced-motion support.

## Requirements

- Node.js 22 or newer. There are no npm dependencies.

## Commands

```bash
npm run build   # generate the static site into dist/
npm run serve   # preview dist/ at http://127.0.0.1:4173
npm test        # run the summary unit tests
npm run check   # validate routes, links, sitemap and localized data
```

`npm run check` expects a fresh build in `dist/`, so run `npm run build` first.

## Configuration

The build reads two optional environment variables:

| Variable   | Default                  | Purpose                                      |
| ---------- | ------------------------ | -------------------------------------------- |
| `SITE_URL` | `https://lenormand.example` | Canonical origin, sitemap and robots URLs |
| `BASE`     | empty                    | Subpath prefix, e.g. `/lenormand`            |

Examples:

```bash
SITE_URL=https://example.com npm run build
BASE=/lenormand SITE_URL=https://example.com npm run build
```

Deploy the contents of `dist/` to any static host or CDN. For local preview the
server honours the current `dist/`.

## Project structure

```text
assets/               Browser CSS and JavaScript, icons, favicon
src/build.mjs         Static site generator
src/serve.mjs         Local preview server
src/data/cards.mjs    All 36 cards in English and Hebrew
src/data/spreads.mjs  Seven spreads, positions, houses and copy
src/data/ui.mjs       UI strings and summary templates
src/data/locales.mjs  Locale registry and site configuration
src/templates/        Layout and shared components
scripts/check.mjs     Post-build route and link checker
test/                 Unit tests for the summary engine
dist/                 Generated output (not source)
```

## Editing content

Card and spread copy lives in `src/data/`. Each entry has a `content.en` and
`content.he` object, so adding another locale means adding a locale to
`src/data/locales.mjs` and a matching `content` object plus UI strings and
summary templates. No template changes are required for a new right-to-left or
left-to-right locale beyond its direction and font class.

## Notes

- The readings are for reflection and entertainment only and are not a
  substitute for medical, legal or financial advice.
- The footer links to the author's GitHub profile and shows a static QR code
  stored at `assets/github-qr.svg`. Regenerate that file if the profile URL
  changes.
- The `?demo=1` query parameter draws and reveals a spread automatically. It is
  used for visual screenshots and development previews.
