import i18n from 'i18next';
import { initReactI18next, useTranslation as useTranslationOriginal } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '../locales/en.json';
import es from '../locales/es.json';

export const languages = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' }
} as const;

export type SupportedLanguage = keyof typeof languages;

const resources = {
  en: { translation: en },
  es: { translation: es }
} as const;

const detectionOptions = {
  order: ['localStorage', 'navigator', 'htmlTag'],
  caches: ['localStorage'],
  lookupLocalStorage: 'flowscribe-language',
  checkWhitelist: true
} satisfies Record<string, unknown>;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: import.meta.env.DEV,
    detection: detectionOptions,
    interpolation: {
      escapeValue: false
    },
    supportedLngs: Object.keys(languages),
    keySeparator: '.',
    nsSeparator: false
  });

type TranslationOptions = Record<string, unknown> & { defaultValue?: string };

export const useTranslation = () => {
  const { t: originalT, ...rest } = useTranslationOriginal();

  const t = (key: string, options?: TranslationOptions, enText?: string): string => {
    let mergedOptions: TranslationOptions | undefined;
    if (options) {
      mergedOptions = { ...options };
    }

    if (enText !== undefined) {
      mergedOptions = { ...(mergedOptions ?? {}), defaultValue: enText };
    }

    const result = originalT(key, mergedOptions);

    if (typeof result === 'string' && result !== key) {
      return result;
    }

    if (enText !== undefined) {
      return `[!] ${enText}`;
    }

    return typeof result === 'string' ? result : String(result);
  };

  return { t, ...rest };
};

export default i18n;

export function getCurrentUILanguage(): string {
  return i18n.language || 'en';
}
