import { getWindow } from '@fluentui/react/lib/Utilities';

/**
 * Gets a query parameter value
 * @param name Query parameter name
 * @param url URL (defaults to window.location.href)
 */
export function getQueryParam(name: string, url?: string): string | null {
  const win = getWindow();
  url = url || (win ? win.location.href : '');
  // Manually get the query string in case it's after the hash (possible with hash routing)
  const queryIndex = url.indexOf('?');
  // eslint-disable-next-line deprecation/deprecation
  const query = queryIndex !== -1 ? url.substr(queryIndex) : '';

  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const match = query.match(regex);
  if (match) {
    return decodeURIComponent((match[2] || '').replace(/\+/g, ' '));
  }
  return null;
}
