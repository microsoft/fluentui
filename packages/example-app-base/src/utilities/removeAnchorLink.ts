/**
 * Remove the anchor link from a full page URL or a hash.
 * Preserves any route path specified in the URL.
 * Behavior with more than two # in the URL is unspecified.
 */
export function removeAnchorLink(url: string): string {
  // First group: most of the URL
  // Second group: optional last hash with only word characters following (an anchor)
  const match = url.match(/^(.*?)(#\w*)?$/);
  if (match) {
    return match[1];
  }
  return url;
}
