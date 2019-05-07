/**
 * Given a URL containing a route path (first hash) and possibly an anchor (second hash),
 * returns only the anchor part, if it exists.
 * If `url` has no hash, or only has a single hash (for the route path), returns an empty string.
 * @param url - Full or partial URL. Just the hash section is valid, as long as it's prepended with #.
 */
export function extractAnchorLink(url: string): string {
  // URLs containing anchors:
  // #/components/checkbox#Overview
  // http://whatever#/components/checkbox#Overview

  // URLs NOT containing anchors, by this function's definition:
  // #/components/checkbox
  // http://whatever#/components/checkbox
  // #Overview
  // http://whatever#Overview
  const split = url.split('#');
  if (split.length === 3) {
    return split[2];
  }
  return '';
}
