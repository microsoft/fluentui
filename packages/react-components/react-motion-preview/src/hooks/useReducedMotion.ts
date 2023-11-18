import * as React from 'react';
import { canUseDOM, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * @internal
 *
 * Returns whether the user has requested reduced motion based on the current media query.
 */
export const useReducedMotion = (): boolean => {
  const fluent = useFluent();
  const reducedMotion = React.useRef(false);
  const targetWindow = canUseDOM() && fluent.targetDocument?.defaultView;

  const onMediaQueryChange = React.useCallback((e: MediaQueryListEvent) => {
    reducedMotion.current = e.matches;
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!targetWindow || !targetWindow.matchMedia) {
      return;
    }

    const match = targetWindow.matchMedia('screen and (prefers-reduced-motion: reduce)');

    if (match.matches) {
      reducedMotion.current = true;
    }

    match.addEventListener('change', onMediaQueryChange);

    return () => match.removeEventListener('change', onMediaQueryChange);
  }, [onMediaQueryChange, targetWindow]);

  return reducedMotion.current;
};
