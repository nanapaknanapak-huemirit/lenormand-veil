import { esc, icon } from "./components.mjs";
import { site } from "../data/locales.mjs";

function navClass(isActive) {
  return isActive ? "is-active" : "";
}

export function page({
  locale,
  ui,
  base,
  title,
  description,
  canonical,
  alternates,
  body,
  routeType,
  jsonLd = [],
  scripts = [],
  bodyClass = ""
}) {
  const nav = [
    { type: "home", label: ui.nav.home, href: `${base}/${locale.code}/` },
    { type: "spreads", label: ui.nav.spreads, href: `${base}/${locale.code}/spreads/` },
    { type: "cards", label: ui.nav.cards, href: `${base}/${locale.code}/cards/` },
    { type: "about", label: ui.nav.about, href: `${base}/${locale.code}/about/` }
  ];

  const active = (type) => {
    if (type === routeType) return true;
    if (type === "spreads" && routeType === "spread") return true;
    if (type === "cards" && routeType === "card") return true;
    return false;
  };

  const alternateLinks = alternates
    .map(
      (item) =>
        `<link rel="alternate" hreflang="${esc(item.hreflang)}" href="${esc(item.href)}">`
    )
    .join("\n");

  const languageLinks = alternates
    .filter((item) => item.locale)
    .map(
      (item) =>
        `<a class="lang-link ${item.locale === locale.code ? "is-active" : ""}" href="${item.href}" lang="${esc(item.hreflang)}" ${
          item.locale === locale.code ? 'aria-current="true"' : ""
        }>${esc(item.name)}</a>`
    )
    .join("");

  const jsonLdScript = jsonLd.length
    ? `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@graph": jsonLd
      })}</script>`
    : "";

  const scriptTags = scripts
    .map((name) => `<script type="module" src="${base}/assets/${esc(name)}.js"></script>`)
    .join("\n");

  const githubHandle = site.github.replace(/^https?:\/\/github\.com\//, "@").replace(/\/$/, "");

  return `<!doctype html>
<html lang="${esc(locale.htmlLang)}" dir="${esc(locale.dir)}" class="${esc(locale.fontClass)}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${esc(canonical)}">
${alternateLinks}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(ui.siteName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:locale" content="${esc(locale.ogLocale)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="theme-color" content="#0b0914">
<link rel="icon" href="${base}/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Frank+Ruhl+Libre:wght@400;500;700&family=Noto+Sans+Hebrew:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${base}/assets/style.css">
${jsonLdScript}
</head>
<body class="${esc(bodyClass)}">
<a class="skip-link" href="#main">${esc(ui.skip)}</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${base}/${locale.code}/">
      <span class="brand-mark">${icon("moon-star", base, "brand-icon")}</span>
      <span class="brand-text"><strong>${esc(ui.siteName)}</strong><small>${esc(ui.tagline)}</small></span>
    </a>
    <nav class="site-nav" aria-label="${esc(ui.nav.home)}">
      ${nav
        .map(
          (item) =>
            `<a class="nav-link ${navClass(active(item.type))}" href="${item.href}" ${
              active(item.type) ? 'aria-current="page"' : ""
            }>${esc(item.label)}</a>`
        )
        .join("")}
    </nav>
    <div class="lang-switch" aria-label="${esc(ui.language)}">${languageLinks}</div>
  </div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
  <div class="wrap footer-inner">
    <div class="footer-brand">
      <span class="brand-mark">${icon("moon-star", base, "brand-icon")}</span>
      <div>
        <strong>${esc(ui.siteName)}</strong>
        <p>${esc(ui.footer.madeFor)}</p>
      </div>
    </div>
    <nav class="footer-nav" aria-label="${esc(ui.footer.explore)}">
      ${nav.map((item) => `<a href="${item.href}">${esc(item.label)}</a>`).join("")}
    </nav>
    <div class="footer-connect">
      <div class="footer-connect-copy">
        <p class="footer-connect-eyebrow">${esc(ui.footer.githubLabel)}</p>
        <div class="footer-github-links">
          <a class="footer-github" href="${esc(site.github)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(
            ui.footer.githubLinkAria
          )}">
            ${icon("github", base, "footer-github-icon")}
            <span class="footer-github-handle" dir="ltr">${esc(githubHandle)}</span>
          </a>
          <a class="footer-repo" href="${esc(site.repository)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(
            ui.footer.githubRepoAria
          )}">
            ${esc(ui.footer.githubRepo)}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <p class="footer-connect-hint">${esc(ui.footer.githubHint)}</p>
      </div>
      <a class="footer-qr" href="${esc(site.github)}" target="_blank" rel="noopener noreferrer">
        <img src="${base}/assets/github-qr.svg" width="104" height="104" alt="${esc(ui.footer.githubQrAlt)}">
      </a>
    </div>
    <p class="footer-disclaimer">${esc(ui.footer.disclaimer)}</p>
    <p class="footer-copy">${esc(ui.footer.copyright.replace("{year}", String(new Date().getFullYear())))}</p>
  </div>
</footer>
<script>window.LENORMAND_BASE = ${JSON.stringify(`${base}/assets`)}; window.LENORMAND_LOCALE = ${JSON.stringify(locale.code)};</script>
${scriptTags}
</body>
</html>`;
}

export function redirectPage(target) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=${esc(target)}">
<title>Lenormand Veil</title>
</head>
<body>
<p><a href="${esc(target)}">Continue to Lenormand Veil</a></p>
</body>
</html>`;
}
