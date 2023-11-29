/**
 * Verifies if an application can use DOM.
 */
export function canUseDOM(): boolean {
  return (
    // eslint-disable-next-line no-restricted-globals
    typeof window !== 'undefined' &&
    !!(
      window.document && // eslint-disable-line no-restricted-globals
      // eslint-disable-next-line deprecation/deprecation, no-restricted-globals
      window.document.createElement
    )
  );
}
