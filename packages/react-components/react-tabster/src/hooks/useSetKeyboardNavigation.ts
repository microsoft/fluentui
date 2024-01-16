import * as React from 'react';
import { useKeyborg } from './useKeyborg';

/**
 */
export function useSetKeyboardNavigation() {
  const keyborg = useKeyborg();

  return {
    setKeyboardNavigation: React.useCallback(
      (isNavigatingWithKeyboard: boolean) => {
        keyborg?.setVal(isNavigatingWithKeyboard);
      },
      [keyborg],
    ),
  };
}
