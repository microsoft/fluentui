import * as React from 'react';

const mediaQuery = '(prefers-reduced-motion: reduce)';

/**
 * Listenes to the
 * [prefers-reduced-motion media query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
 * and triggers a re-render if the value changes.
 * @param targetDocument
 * @returns if the user prefers reduced motion
 */
export function usePrefersReducedMotion(targetDocument: Document | null | undefined): boolean {
  const [reducedMotion, setReducedMotion] = React.useState(
    () => targetDocument?.defaultView?.matchMedia(mediaQuery).matches ?? false,
  );

  React.useEffect(() => {
    if (targetDocument?.defaultView) {
      const match = targetDocument.defaultView.matchMedia(mediaQuery);
      const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
      match.addEventListener('change', listener);

      return () => {
        match.removeEventListener('change', listener);
      };
    }
  }, [targetDocument]);

  return reducedMotion;
}
