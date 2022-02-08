/**
 * Merges disabled declaration with `aria-disabled`
 */
export function mergeARIADisabled(shorthand: { 'aria-disabled'?: string | boolean; disabled?: boolean }) {
  const disabled = shorthand.disabled ?? shorthand['aria-disabled'];
  if (typeof disabled === 'string') {
    return disabled === 'false' ? false : true;
  }
  return disabled ?? false;
}
