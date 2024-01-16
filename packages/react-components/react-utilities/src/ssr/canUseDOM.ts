/**
 * Verifies if an application can use DOM.
 */
export function canUseDOM(): boolean {
  return (
    // eslint-disable-next-line deprecation/deprecation, no-restricted-globals
    typeof window !== 'undefined' && !!(window.document && window.document.createElement)
  );
}
