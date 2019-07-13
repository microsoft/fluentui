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

/**
 * Get URL parameters by name
 * @param name - Name of the URL parameter to look for
 * @param url - Target URL. If URL is not defined, look for window.location.href
 */
export function getParameterByName(name: string, url?: string): string | null {
  url = url || window.location.href;

  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) {
    return null;
  }

  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
