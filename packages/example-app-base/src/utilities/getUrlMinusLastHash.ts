/**
 * Retrieve the route URL for a page without the string after the last hash.
 */
export function getUrlMinusLastHash(url: string): string {
  const hashIndex = url.lastIndexOf('#');
  if (hashIndex > 0) {
    url = url.substr(0, hashIndex);
  }
  return url;
}
