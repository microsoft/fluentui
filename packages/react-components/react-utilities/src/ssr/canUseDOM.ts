'use client';

/**
 * Verifies if an application can use DOM.
 */
export function canUseDOM(): boolean {
  return (
    /* eslint-disable @nx/workspace-no-restricted-globals -- expected ignore ( SSR friendly acquisition of globals )*/
    typeof window !== 'undefined' &&
    !!(
      window.document &&
      // eslint-disable-next-line @typescript-eslint/no-deprecated
      window.document.createElement
    )
    /* eslint-enable @nx/workspace-no-restricted-globals */
  );
}
