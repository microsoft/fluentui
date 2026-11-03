/**
 * Serializes a URL as a quoted CSS `url()` value, escaping characters that would end the string early.
 *
 * Unquoted `url()` values break on spaces, parentheses, and quotes, which are all valid in image sources.
 *
 * @param src - image source to serialize
 */
export const toCSSUrl = (src: string): string =>
  `url("${src.replace(/["\\\n\r\f]/g, char => `\\${char.charCodeAt(0).toString(16)} `)}")`;
