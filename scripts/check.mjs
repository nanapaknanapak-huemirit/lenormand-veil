import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { locales, defaultLocale, localeByCode, site } from "../src/data/locales.mjs";
import { cards } from "../src/data/cards.mjs";
import { spreads } from "../src/data/spreads.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const failures = [];
const passes = [];

function pass(message) {
  passes.push(message);
}

function fail(message) {
  failures.push(message);
}

function assert(condition, message) {
  if (condition) pass(message);
  else fail(message);
}

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir) {
  const result = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...(await walk(full)));
    else result.push(full);
  }
  return result;
}

function routePath(locale, route) {
  switch (route.type) {
    case "home":
      return `/${locale.code}/`;
    case "spreads":
      return `/${locale.code}/spreads/`;
    case "spread":
      return `/${locale.code}/spreads/${route.slug}/`;
    case "cards":
      return `/${locale.code}/cards/`;
    case "card":
      return `/${locale.code}/cards/${route.slug}/`;
    case "about":
      return `/${locale.code}/about/`;
    default:
      throw new Error(`Unknown route type: ${route.type}`);
  }
}

function expectedRoutes() {
  const routes = [{ locale: localeByCode(defaultLocale), route: { type: "home" }, file: "index.html" }];
  for (const locale of locales) {
    routes.push({ locale, route: { type: "home" } });
    routes.push({ locale, route: { type: "spreads" } });
    for (const spread of spreads) routes.push({ locale, route: { type: "spread", slug: spread.slug } });
    routes.push({ locale, route: { type: "cards" } });
    for (const card of cards) routes.push({ locale, route: { type: "card", slug: card.slug } });
    routes.push({ locale, route: { type: "about" } });
  }
  return routes.map(({ locale, route, file }) => ({
    locale,
    route,
    file: file || path.join(routePath(locale, route).replace(/^\//, ""), "index.html")
  }));
}

async function main() {
  assert(await exists(dist), "dist/ exists (run npm run build first)");
  if (failures.length) {
    report();
    return;
  }

  const files = await walk(dist);
  const fileSet = new Set(files.map((file) => path.normalize(file)));

  let base = "";
  const redirectHtml = await readFile(path.join(dist, "index.html"), "utf8");
  const redirectMatch = redirectHtml.match(/url=([^"]+)"/);
  if (redirectMatch) {
    const target = redirectMatch[1];
    base = target.replace(new RegExp(`/${defaultLocale}/$`), "");
    const targetPath = base ? target.slice(base.length) : target;
    assert(
      fileSet.has(path.normalize(path.join(dist, targetPath.replace(/^\//, ""), "index.html"))),
      "root redirect points to an existing default-locale page"
    );
  } else {
    fail("root index.html contains a redirect target");
  }

  const routes = expectedRoutes();
  for (const { file } of routes) {
    assert(fileSet.has(path.normalize(path.join(dist, file))), `expected page exists: ${file}`);
  }

  assert(fileSet.has(path.normalize(path.join(dist, "404.html"))), "expected page exists: 404.html");
  assert(fileSet.has(path.normalize(path.join(dist, "sitemap.xml"))), "sitemap.xml exists");
  assert(fileSet.has(path.normalize(path.join(dist, "robots.txt"))), "robots.txt exists");

  const assetFiles = [
    "style.css",
    "reading.js",
    "cards.js",
    "summary.js",
    "icons.svg",
    "favicon.svg",
    "github-qr.svg",
    "cards/ATTRIBUTION.md",
    ...locales.map((locale) => `data-${locale.code}.json`)
  ];
  for (const asset of assetFiles) {
    assert(fileSet.has(path.normalize(path.join(dist, "assets", asset))), `asset exists: assets/${asset}`);
  }

  const missingArt = cards.filter(
    (card) => !fileSet.has(path.normalize(path.join(dist, "assets", "cards", `${card.art}.webp`)))
  );
  assert(
    missingArt.length === 0,
    `all ${cards.length} card art files exist (${cards.length - missingArt.length}/${cards.length})`
  );
  assert(
    new Set(cards.map((card) => card.art)).size === cards.length,
    "every card has a unique artwork file"
  );

  function resolveInternal(url, fromFile) {
    const clean = url.split("#")[0].split("?")[0];
    if (!clean) return null;
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(clean)) return null;

    let target;
    if (clean.startsWith("/")) {
      let relative = clean;
      if (base && relative.startsWith(`${base}/`)) relative = relative.slice(base.length);
      else if (base && relative === base) relative = "/";
      target = path.join(dist, relative.replace(/^\//, ""));
    } else {
      target = path.resolve(path.dirname(fromFile), clean);
    }

    if (clean.endsWith("/") || target.endsWith(path.sep)) target = path.join(target, "index.html");
    else if (!path.extname(target)) target = path.join(target, "index.html");
    return path.normalize(target);
  }

  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  let linkCount = 0;
  let githubPageCount = 0;
  let repoPageCount = 0;
  let livePageCount = 0;
  let qrPageCount = 0;
  let deckPageCount = 0;
  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    const relativeFile = path.relative(dist, file);

    const localeCode = relativeFile.split(path.sep)[0];
    const locale = locales.find((item) => item.code === localeCode);
    if (locale && relativeFile !== "404.html") {
      assert(
        new RegExp(`<html[^>]+lang="${locale.htmlLang}"[^>]+dir="${locale.dir}"`).test(html) ||
          new RegExp(`<html[^>]+dir="${locale.dir}"[^>]+lang="${locale.htmlLang}"`).test(html),
        `${relativeFile}: html lang/dir match ${locale.code}`
      );
    }

    if (relativeFile !== "index.html") {
      const h1Count = (html.match(/<h1[\s>]/g) || []).length;
      assert(h1Count === 1, `${relativeFile}: exactly one h1 (found ${h1Count})`);
      assert(/<link rel="canonical" href="https?:\/\//.test(html), `${relativeFile}: canonical URL is absolute`);
      if (html.includes(`href="${site.github}"`)) githubPageCount += 1;
      if (html.includes(`href="${site.repository}"`)) repoPageCount += 1;
      if (html.includes(`href="${site.live}"`)) livePageCount += 1;
      if (html.includes("github-qr.svg")) qrPageCount += 1;
      if (html.includes("data-deck-fan") && html.includes("data-deck-status")) deckPageCount += 1;
    }

    const hrefs = [...html.matchAll(/\b(href|src)="([^"]+)"/g)].map((match) => match[2]);
    for (const url of hrefs) {
      const target = resolveInternal(url, file);
      if (!target) continue;
      linkCount += 1;
      if (!fileSet.has(target)) {
        fail(`${relativeFile}: broken internal link ${url} -> ${path.relative(dist, target)}`);
      }
    }
  }
  assert(linkCount > 0, `checked ${linkCount} internal links across ${htmlFiles.length} pages`);
  if (!failures.some((message) => message.includes("broken internal link"))) {
    pass(`all internal links resolve (${linkCount} checked)`);
  }

  const contentPageCount = htmlFiles.filter((file) => path.relative(dist, file) !== "index.html").length;
  assert(githubPageCount === contentPageCount, `GitHub link appears on every page (${githubPageCount}/${contentPageCount})`);
  assert(repoPageCount === contentPageCount, `Repository link appears on every page (${repoPageCount}/${contentPageCount})`);
  assert(livePageCount === contentPageCount, `Live-site link appears on every page (${livePageCount}/${contentPageCount})`);
  assert(qrPageCount === contentPageCount, `Live-site QR appears on every page (${qrPageCount}/${contentPageCount})`);
  const spreadPageCount = locales.length * spreads.length;
  assert(deckPageCount === spreadPageCount, `Deck picker appears on every spread page (${deckPageCount}/${spreadPageCount})`);

  const localeCodes = locales.map((locale) => locale.code).join("|");
  const articleHref = new RegExp(`href="/?(?:.*?)/(?:${localeCodes})/(?:spreads|cards)/`);
  let localizedLinks = 0;
  for (const file of htmlFiles) {
    const html = await readFile(file, "utf8");
    if (articleHref.test(html)) localizedLinks += 1;
  }
  assert(localizedLinks > 0, "pages link to localized spread or card pages");

  const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
  const expectedSitemapCount = locales.length * (2 + spreads.length + 1 + cards.length + 1);
  const locCount = (sitemap.match(/<loc>/g) || []).length;
  assert(
    locCount === expectedSitemapCount,
    `sitemap has ${expectedSitemapCount} URLs (found ${locCount})`
  );
  assert(
    (sitemap.match(/hreflang="x-default"/g) || []).length === expectedSitemapCount,
    "sitemap includes an x-default alternate for every URL"
  );
  const sitemapPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
    try {
      return new URL(match[1]).pathname;
    } catch {
      fail(`sitemap contains an invalid URL: ${match[1]}`);
      return "";
    }
  });
  for (const pathname of sitemapPaths.filter(Boolean)) {
    const target = resolveInternal(pathname, path.join(dist, "index.html"));
    if (!target || !fileSet.has(target)) fail(`sitemap URL has no built page: ${pathname}`);
  }
  if (!failures.some((message) => message.includes("sitemap URL has no built page"))) {
    pass(`all ${sitemapPaths.length} sitemap URLs resolve to built pages`);
  }

  const robots = await readFile(path.join(dist, "robots.txt"), "utf8");
  assert(/Sitemap: https?:\/\/.+\/sitemap\.xml/.test(robots), "robots.txt declares the sitemap");

  for (const locale of locales) {
    const data = JSON.parse(await readFile(path.join(dist, "assets", `data-${locale.code}.json`), "utf8"));
    assert(data.locale === locale.code, `data-${locale.code}.json has the right locale`);
    assert(data.cards.length === cards.length, `data-${locale.code}.json has all ${cards.length} cards`);
    assert(data.spreads.length === spreads.length, `data-${locale.code}.json has all ${spreads.length} spreads`);
    assert(Boolean(data.templates), `data-${locale.code}.json has summary templates`);
    assert(
      data.cards.every((card) => card.name && card.core && card.keywords?.length),
      `data-${locale.code}.json has complete card content`
    );
    assert(
      data.spreads.every(
        (spread) =>
          spread.name &&
          (spread.positions?.length === spread.count || spread.houses?.length === spread.count)
      ),
      `data-${locale.code}.json has complete spread content`
    );
  }

  const about = await readFile(path.join(dist, defaultLocale, "about", "index.html"), "utf8");
  assert(/FAQPage/.test(about), "about page includes FAQ structured data");
  const home = await readFile(path.join(dist, defaultLocale, "index.html"), "utf8");
  assert(/WebSite/.test(home), "home page includes WebSite structured data");
  assert(/ItemList/.test(home), "home page includes an ItemList of spreads");
  assert(home.includes(site.github), "home structured data references the GitHub profile");
  assert(home.includes(site.repository), "home structured data references the source repository");

  report();
}

function report() {
  for (const message of passes) console.log(`ok   ${message}`);
  for (const message of failures) console.error(`FAIL ${message}`);
  console.log(`\n${passes.length} passed, ${failures.length} failed`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
