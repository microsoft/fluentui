import { useEffect, useState } from 'react';
import { useTabster } from './useTabster';

/**
 * Returns if navigation is by keyboard
 */
export const useIsNavigatingWithKeyboard = (): boolean => {
  const tabster = useTabster();
  const [isKeyboard, setIsKeyboard] = useState(() => tabster?.keyboardNavigation.isNavigatingWithKeyboard() ?? false);
  useEffect(() => {
    if (tabster) {
      const cb = (next: boolean) => setIsKeyboard(next);
      tabster.keyboardNavigation.subscribe(cb);
      return () => tabster.keyboardNavigation.unsubscribe(cb);
    }
  }, [tabster]);
  return isKeyboard;
};
