/**
 * Returns the last hash value in the link
 */
export function extractAnchorLink(url: string): string | undefined {
  const split = url.split('#');
  const cleanedSplit = split.filter((value: string) => !!value);
  if (cleanedSplit.length > 1) {
    return cleanedSplit[cleanedSplit.length - 1];
  }
}
