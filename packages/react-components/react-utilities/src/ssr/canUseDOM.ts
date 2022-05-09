/**
 * Verifies if an application can use DOM.
 */
export function canUseDOM(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!(
      window.document &&
      // eslint-disable-next-line deprecation/deprecation
      window.document.createElement
    )
  );
}
