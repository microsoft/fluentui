import { getDocument } from './dom/getDocument';
import { getItem, setItem } from './localStorage';

// Default to undefined so that we initialize on first read.
let _language: string | null;

/**
 * Gets the rtl state of the page (returns true if in rtl.)
 *
 * @public
 */
export function getLanguage(): string | null {
  if (_language === undefined) {
    let doc = getDocument();
    const savedLanguage = getItem('language');

    if (savedLanguage !== null) {
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
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 *
 * @public
 */
export function setLanguage(language: string, avoidPersisting: boolean = false): void {
  let doc = getDocument();

  if (doc) {
    doc.documentElement.setAttribute('lang', language);
  }

  if (!avoidPersisting) {
    setItem('language', language);
  }

  _language = language;
}
