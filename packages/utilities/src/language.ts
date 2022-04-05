import { getDocument } from './dom/getDocument';
import * as localStorage from './localStorage';
import * as sessionStorage from './sessionStorage';

// Default to undefined so that we initialize on first read.
let _language: string | null;

const STORAGE_KEY = 'language';

/**
 * Gets the language set for the page.
 * @param persistenceType - Where to persist the value. Default is `sessionStorage` if available.
 */
export function getLanguage(
  persistenceType: 'localStorage' | 'sessionStorage' | 'none' = 'sessionStorage',
): string | null {
  if (_language === undefined) {
    let doc = getDocument();
    const savedLanguage =
      persistenceType === 'localStorage'
        ? localStorage.getItem(STORAGE_KEY)
        : persistenceType === 'sessionStorage'
        ? sessionStorage.getItem(STORAGE_KEY)
        : undefined;

    if (savedLanguage) {
      _language = savedLanguage;
    }

    if (_language === undefined && doc) {
      _language = doc.documentElement.getAttribute('lang');
    }

    if (_language === undefined) {
      _language = 'en';
    }
  }

  return _language;
}

/**
 * Sets the language for the page (by adjusting the lang attribute of the html element).
 * @param language - Language to set.
 * @param persistenceType - Where to persist the value. Default is `sessionStorage` if available.
 */
export function setLanguage(language: string, persistenceType?: 'localStorage' | 'sessionStorage' | 'none'): void;
/**
 * Sets the language for the page (by adjusting the lang attribute of the html element).
 * @deprecated Use string parameter version.
 * @param language - Language to set.
 * @param avoidPersisting - If true, don't store the value.
 */
export function setLanguage(language: string, avoidPersisting?: boolean): void;
export function setLanguage(
  language: string,
  persistenceParam?: 'localStorage' | 'sessionStorage' | 'none' | boolean,
): void {
  let doc = getDocument();

  if (doc) {
    doc.documentElement.setAttribute('lang', language);
  }

  const persistenceType = persistenceParam === true ? 'none' : !persistenceParam ? 'sessionStorage' : persistenceParam;
  if (persistenceType === 'localStorage') {
    localStorage.setItem(STORAGE_KEY, language);
  } else if (persistenceType === 'sessionStorage') {
    sessionStorage.setItem(STORAGE_KEY, language);
  }

  _language = language;
}
