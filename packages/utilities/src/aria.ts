/**
 * ARIA helper to concatenate attributes, returning undefined if all attributes
 * are undefined. (Empty strings are not a valid ARIA attribute value.)
 *
 * @param ariaAttributes - ARIA attributes to merge
 */
export function mergeAriaAttributeValues(...ariaAttributes: (string | undefined)[]): string | undefined {
  const mergedAttribute = ariaAttributes
    .filter((arg: string | undefined) => arg !== undefined && arg !== null)
    .join(' ')
    .trim();
  return mergedAttribute === '' ? undefined : mergedAttribute;
}
