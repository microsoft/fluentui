/**
 * Determines whether the site is hosted on the Office Developer portal, which
 * has the Universal Header and Footer (UHF).
 */
export const hasUHF: boolean =
  window.location.hostname === 'developer.microsoft.com' || window.location.hostname === 'developer.microsoft-tst.com';
