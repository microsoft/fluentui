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

/**
 * Update a URL GET variable with a new parameter
 * @param param - Parameter name
 * @param paramVal - Updated value
 * @param url - Optional URL to update/check.  If undefined, then use window.location.href
 */
export const updateUrlParameter = (param: string, paramVal: string, url?: string): string => {
  if (!url) {
    url = window.location.href;
  }

  let newAdditionalURL = '';
  let tempArray = url.split('?');
  const baseURL = tempArray[0];
  const additionalURL = tempArray[1];
  let temp = '';
  if (additionalURL) {
    tempArray = additionalURL.split('&');
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].split('=')[0] !== param) {
        newAdditionalURL += temp + tempArray[i];
        temp = '&';
      }
    }
  }

  const rowsText = temp + '' + param + '=' + paramVal;
  return baseURL + '?' + newAdditionalURL + rowsText;
};
