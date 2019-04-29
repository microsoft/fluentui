/**
 * Returns the last hash value in the link
 */
export function extractAnchorLink(path: string): string {
  const split = path.split('#');
  const cleanedSplit = split.filter(value => !!value);
  return cleanedSplit[cleanedSplit.length - 1];
}
