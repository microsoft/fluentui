/**
 * Verifies if an application can use DOM.
 */
export function canUseDOM(): boolean {
  return (
    // eslint-disable-next-line no-restricted-globals
    typeof window !== 'undefined' &&
    !!(
      // eslint-disable-next-line no-restricted-globals, @typescript-eslint/no-deprecated
      (window.document && window.document.createElement)
    )
  );
}
