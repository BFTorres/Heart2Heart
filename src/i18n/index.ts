import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import en from "@/i18n/locales/en/common.json";
import de from "@/i18n/locales/de/common.json";

// Minimal configuration:
// - Local JSON is the fallback (always works).
// - Remote JSON (GitHub) overrides local if configured + reachable.
// - Uses localStorage to remember selected language.
// - Uses languageOnly to avoid en-US/de-DE misses. :contentReference[oaicite:2]{index=2}
void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "de"],
    load: "languageOnly",
    interpolation: { escapeValue: false },
    resources: {
      en: { common: en },
      de: { common: de },
    },
    defaultNS: "common",
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },
    // inside i18n.init({...})
    /* react: {
      bindI18n: "languageChanged loaded",
      bindI18nStore: "added removed",
    }, */
  });

export default i18n;
