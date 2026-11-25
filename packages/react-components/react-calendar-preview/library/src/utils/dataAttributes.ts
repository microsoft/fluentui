/**
 * Renders a boolean as a presence data attribute: `''` when true, `undefined` when false so the
 * attribute is omitted entirely.
 */
export function stringifyDataAttribute(value: boolean | undefined): '' | undefined {
  return value ? '' : undefined;
}
