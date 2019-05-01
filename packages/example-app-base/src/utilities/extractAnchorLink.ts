/**
 * Returns the last hash value in the link.
 * If `url` doesn't contain a hash, returns an empty string.
 */
export function extractAnchorLink(url: string): string {
  const split = url.split('#');
  const cleanedSplit = split.filter((value: string) => !!value);
  // If length is 1, the URL didn't contain a hash.
  if (cleanedSplit.length > 1) {
    return cleanedSplit[cleanedSplit.length - 1];
  }
  return '';
}
