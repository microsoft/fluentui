import * as React from 'react';
import { canUseDOM, useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

type MediaQueryListener = (e: MediaQueryListEvent) => void;

/**
 * @internal
 * Event listener manager for useReducedMotion hook to avoid adding multiple listeners
 */
const listenerManager = {
  listeners: new Set<MediaQueryListener>(),
  addListener(listener: MediaQueryListener) {
    this.listeners.add(listener);
  },
  removeListener(listener: MediaQueryListener) {
    this.listeners.delete(listener);
  },
  notifyListeners(e: MediaQueryListEvent) {
    this.listeners.forEach(listener => listener(e));
  },
};
let matcher: MediaQueryList | null = null;

/**
 * @internal
 *
 * Returns whether the user has requested reduced motion based on the current media query.
 */
export const useReducedMotion = (): boolean => {
  const fluent = useFluent();
  const targetWindow = canUseDOM() && fluent.targetDocument?.defaultView;
  const [reducedMotion, setReducedMotion] = React.useState(false);

  const onMediaQueryChange = React.useCallback((e: MediaQueryListEvent) => setReducedMotion(e.matches), []);

  useIsomorphicLayoutEffect(() => {
    if (!targetWindow || !targetWindow.matchMedia) {
      return;
    }

    // If the event is not yet registered, register it and call the listener
    if (!matcher) {
      matcher = targetWindow.matchMedia('screen and (prefers-reduced-motion: reduce)');
      matcher.addEventListener('change', listenerManager.notifyListeners);
      onMediaQueryChange({ matches: matcher.matches } as MediaQueryListEvent);
    }
  }, [onMediaQueryChange, targetWindow]);

  // Add the listener to the manager
  React.useEffect(() => {
    listenerManager.addListener(onMediaQueryChange);

    return () => {
      listenerManager.removeListener(onMediaQueryChange);

      // If the component unmounts and there are no more listeners, remove the event listener
      if (matcher && listenerManager.listeners.size === 0) {
        matcher.removeEventListener('change', listenerManager.notifyListeners);
        matcher = null;
      }
    };
    // We only want to add the listener once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return reducedMotion;
};
