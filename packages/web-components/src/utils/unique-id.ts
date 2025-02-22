let uniqueIdCounter = 0;

/**
 * Generates a unique element id.
 *
 * @param prefix - The prefix to use for the unique id.
 * @returns A unique id.
 *
 * @public
 */
export function uniqueId(prefix = 'id-'): string {
  const str = `${prefix}${uniqueIdCounter++}`;
  return document.getElementById(str) ? uniqueId(prefix) : str;
}
