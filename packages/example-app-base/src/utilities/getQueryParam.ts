/**
 * Gets a query parameter value
 * @param name Query parameter name
 * @param url URL (defaults to window.location.href)
 */
export function getQueryParam(name: string, url?: string): string | null {
  url = url || (typeof window !== 'undefined' ? window.location.href : '');
  // Manually get the query string in case it's after the hash (possible with hash routing)
  const queryIndex = url.indexOf('?');
  const query = queryIndex !== -1 ? url.substr(queryIndex) : '';

  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const match = query.match(regex);
  if (match) {
    return decodeURIComponent((match[2] || '').replace(/\+/g, ' '));
  }
  return null;
}
