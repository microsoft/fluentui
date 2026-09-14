import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string';

export const CODE_HASH_PARAM = 'code';
export const PLAYGROUND_FILE_NAME = 'playground.html';

/**
 * Compresses source code into a URL safe string.
 */
export function encodeCode(code: string): string {
  return compressToEncodedURIComponent(code);
}

/**
 * Inverse of {@link encodeCode}. Returns `null` when the payload is missing or cannot be decoded.
 */
export function decodeCode(encoded: string): string | null {
  if (!encoded) {
    return null;
  }

  const decoded = decompressFromEncodedURIComponent(encoded);

  return typeof decoded === 'string' && decoded.length > 0 ? decoded : null;
}

/**
 * Reads the code payload from a `location.hash` value (`#code=...`).
 */
export function decodeCodeFromHash(hash: string): string | null {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  const encoded = params.get(CODE_HASH_PARAM);

  return encoded ? decodeCode(encoded) : null;
}

/**
 * Creates a `location.hash` value for provided code.
 */
export function createCodeHash(code: string): string {
  return `#${CODE_HASH_PARAM}=${encodeCode(code)}`;
}

/**
 * Creates the playground URL for provided code.
 *
 * The URL is relative to the Storybook preview (`iframe.html`), which lives next to `playground.html` in the Storybook
 * root, so it also works when Storybook is deployed under a sub path.
 */
export function createPlaygroundUrl(code: string, baseUrl = `./${PLAYGROUND_FILE_NAME}`): string {
  return `${baseUrl}${createCodeHash(code)}`;
}
