import { getDocument, getWindow } from './dom';

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
    let win = getWindow();

    // tslint:disable-next-line:no-string-literal
    if (win && win['localStorage']) {
      let savedLanguage = localStorage.getItem('language');

      if (savedLanguage !== null) {
        _language = savedLanguage;
      }
    }

    if (_language === undefined && doc) {
      _language = doc.documentElement.getAttribute('lang');
    }

    if (_language === undefined) {
      setLanguage('en', false);
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

  let win = getWindow();
  // tslint:disable-next-line:no-string-literal
  if (win && win['localStorage'] && !avoidPersisting) {
    localStorage.setItem('language', language);
  }

  _language = language;
}
