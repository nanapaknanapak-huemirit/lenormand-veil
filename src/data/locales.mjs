export const locales = [
  {
    code: "en",
    name: "English",
    dir: "ltr",
    htmlLang: "en",
    dateLocale: "en-GB",
    fontClass: "lang-en",
    ogLocale: "en_GB"
  },
  {
    code: "he",
    name: "עברית",
    dir: "rtl",
    htmlLang: "he",
    dateLocale: "he-IL",
    fontClass: "lang-he",
    ogLocale: "he_IL"
  }
];

export const defaultLocale = "en";

export const site = {
  name: "Lenormand Veil",
  url: process.env.SITE_URL || "https://lenormand.example",
  base: process.env.BASE || "",
  github: "https://github.com/nanapaknanapak-huemirit",
  repository: "https://github.com/nanapaknanapak-huemirit/lenormand-veil"
};

export function localeByCode(code) {
  return locales.find((locale) => locale.code === code) || locales[0];
}
