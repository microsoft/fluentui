/**
 * Corrects a hex color to have length 3 or 6. Defaults to white if too short.
 * Does NOT check anything besides the length (such as valid characters) and does NOT handle
 * hex values starting with # sign.
 */
export function correctHex(hex: string): string {
  if (!hex || hex.length < 3) {
    return 'ffffff'; // not a valid color--default to white
  }
  if (hex.length > 6) {
    return hex.substring(0, 6);
  }
  return hex.substring(0, 3);
}
