import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ko"],
    fallbackLng: "ko",
    debug: true,
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "appLanguage",
      caches: [],
    },
    backend: {
      loadPath: "public/locales/{{lng}}/translation.json",
    },
    react: {
      useSuspense: true,
    },
  });

export default i18next;
