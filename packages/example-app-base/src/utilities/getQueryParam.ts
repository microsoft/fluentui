/**
 * Gets a query parameter value
 * @param name Query parameter name
 * @param url URL (defaults to window.location.href)
 */
export function getQueryParam(name: string, url?: string): string | null {
  url = url || window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
