// i18n.js
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './src/locales/en/translation.json';
import nl from './src/locales/nl/translation.json';
import fr from './src/locales/fr/translation.json';

const resources = {
  en: {
    translation: en,
  },
  nl: {
    translation: nl,
  },
  fr: {
    translation: fr,
  },
};

i18n
  .use({
    type: 'languageDetector' as const,
    async: true,
    detect: (callback: (language: string) => void) => {
      const locales = RNLocalize.getLocales();
      callback(locales[0]?.languageTag || 'en');
    },
    init: () => {},
    cacheUserLanguage: () => {},
  }) // detect language automatically
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // fallback language
    resources,
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
