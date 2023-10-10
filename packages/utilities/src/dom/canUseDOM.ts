/**
 * Verifies if an application can use DOM.
 */
export function canUseDOM(): boolean {
  // eslint-disable-next-line no-restricted-globals
  const win = window;
  return (
    typeof win !== 'undefined' &&
    !!(
      win.document &&
      // eslint-disable-next-line deprecation/deprecation
      win.document.createElement
    )
  );
}
