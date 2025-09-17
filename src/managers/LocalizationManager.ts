import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { BaseManager } from './BaseManager';
import en from '../../../shared/locales/en.json';
import de from '../../../shared/locales/de.json';

export type SupportedLanguage = 'en' | 'de';

class LocalizationManagerClass extends BaseManager {
  private readonly defaultLanguage: SupportedLanguage = 'en';
  private currentLanguage: SupportedLanguage = this.defaultLanguage;

  constructor() {
    super();
    void i18next
      .use(initReactI18next)
      .init({
        resources: {
          en: { translation: en },
          de: { translation: de }
        },
        lng: this.defaultLanguage,
        fallbackLng: this.defaultLanguage,
        interpolation: { escapeValue: false }
      })
      .then(() => {
        this.emitChange();
      })
      .catch((error) => {
        console.error('LocalizationManager initialization failed', error);
      });
  }

  getLanguage(): SupportedLanguage {
    return this.currentLanguage;
  }

  async setLanguage(language: SupportedLanguage): Promise<void> {
    if (this.currentLanguage === language) {
      return;
    }

    await i18next.changeLanguage(language);
    this.currentLanguage = language;
    this.emitChange();
  }
}

export const LocalizationManager = new LocalizationManagerClass();
