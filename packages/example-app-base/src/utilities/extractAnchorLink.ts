/**
 * Returns the last hash value in `url`.
 * If `url` doesn't contain a hash, returns an empty string.
 * @param url - Full or partial URL. Just the hash section is valid, as long as it's prepended with #.
 * It can also contain multiple hashes, the first for the route and the second for an anchor on the page
 * (like `#/components/checkbox#Overview`).
 */
export function extractAnchorLink(url: string): string {
  if (url.indexOf('#') !== -1) {
    const split = url.split('#');
    const cleanedSplit = split.filter((value: string) => !!value);
    return cleanedSplit[cleanedSplit.length - 1];
  }
  return '';
}
