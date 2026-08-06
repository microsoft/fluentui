/**
 * Converts a boolean, string, number, or undefined value into a string suitable for use as a data attribute value.
 * - `true` becomes an empty string (indicating the presence of the attribute).
 * - `false` and `undefined` become `undefined` (indicating the absence of the attribute).
 * - Other values are converted to strings.
 */
export function stringifyDataAttribute(value: boolean | string | number | undefined): string | undefined {
  if (value === true) {
    return '';
  }

  if (value === false || value === undefined) {
    return undefined;
  }

  return String(value);
}
