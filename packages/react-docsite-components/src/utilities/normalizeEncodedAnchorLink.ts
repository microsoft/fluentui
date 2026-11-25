/**
 * Normalize an encoded section separator in a hash route without decoding other URL data.
 * Some link publishers encode the second # in #/route#anchor as %23.
 */
export function normalizeEncodedAnchorLink(url: string): string {
  return url.replace(/(#\/[^#?]*?)%23(?=[\w-]*(?:\?.*)?$)/, '$1#');
}
