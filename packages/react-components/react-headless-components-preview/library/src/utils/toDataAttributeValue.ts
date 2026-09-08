/**
 * Converts a value to the representation used by headless `data-*` state attributes.
 *
 * Boolean values and their string equivalents are represented by the presence or absence of the attribute:
 * - `true` and `'true'` become an empty string, indicating that the attribute is present.
 * - `false`, `'false'`, and `undefined` become `undefined`, indicating that the attribute is omitted.
 * - Other string and number values are converted to strings.
 *
 * @example
 * ```ts
 * toDataAttributeValue(true); // ''
 * toDataAttributeValue(false); // undefined
 * toDataAttributeValue('mixed'); // 'mixed'
 * toDataAttributeValue(0); // '0'
 * ```
 */
export function toDataAttributeValue(value: boolean | string | number | undefined): string | undefined {
  if (value === true || value === 'true') {
    return '';
  }

  if (value === false || value === 'false' || value === undefined) {
    return undefined;
  }

  return String(value);
}
