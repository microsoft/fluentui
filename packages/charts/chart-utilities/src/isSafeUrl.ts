const ALLOWED_URL_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:', 'ftp:']);

/**
 * Checks if a URL is safe by validating its protocol against a whitelist of allowed protocols.
 *
 * @param href - The URL to validate.
 * @returns True if the URL is considered safe, false otherwise.
 */
export function isSafeUrl(href: string): boolean {
  // Normalize potentially obfuscated protocols (control chars, whitespace, and common invisible separators).
  const normalized = href.replace(/[\u0000-\u001F\u007F\s\u200B-\u200D\u2060\uFEFF]+/g, '');
  const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(normalized);
  if (!hasScheme) {
    return true;
  }

  try {
    const protocol = new URL(normalized).protocol.toLowerCase();
    return ALLOWED_URL_PROTOCOLS.has(protocol);
  } catch {
    // Any malformed absolute URL that looks like a scheme should be rejected.
    return false;
  }
}
