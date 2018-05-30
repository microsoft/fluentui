/**
 * ARIA helper to concatenate attributes, returning undefined if all attributes
 * are undefined. (Empty strings are not a valid ARIA attribute value.)
 *
 * NOTE: This function will NOT insert whitespace between provided attributes.
 *
 * @param ariaAttributes ARIA attributes to merge
 */
export function mergeAriaAttributes(...ariaAttributes: (string | undefined)[]): string | undefined {
  let mergedAttribute = '';
  ariaAttributes.forEach((arg: string | undefined) => {
    if (arg !== undefined && arg !== null) {
      mergedAttribute = mergedAttribute + arg;
    }
  });

  return (mergedAttribute === '' ? undefined : mergedAttribute);
}
