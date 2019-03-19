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

// Todo: Move URL Utilities here (see BlogPost.tsx and index.html)

export const getParameterByName = (name: string, url?: string): string => {
  if (!url) {
    url = window.location.href;
  }

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
};
