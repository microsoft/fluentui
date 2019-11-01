/**
 * Determines whether the site is hosted on the Office Developer portal, which
 * has the Universal Header and Footer (UHF).
 */
export const hasUHF: boolean =
  window.location.hostname === 'developer.microsoft.com' || window.location.hostname === 'developer.microsoft-tst.com';

/**
 * Determines if the site is running locally.
 */
export const isLocal: boolean = window.location.hostname === 'localhost' || window.location.hostname.indexOf('ngrok.io') > -1;
