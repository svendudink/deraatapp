import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import nl from "./nl.json";

const resources = {
  en: {
    translation: en,
  },
  nl: {
    translation: nl,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "nl",
  fallbackLng: "en",
  compatibilityJSON: "v3",
  interpolation: {
    escapeValue: false,
  },
});
