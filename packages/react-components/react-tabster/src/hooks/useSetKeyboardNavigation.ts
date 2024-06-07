import * as React from 'react';
import { useKeyborgRef } from './useKeyborgRef';

/**
 */
export function useSetKeyboardNavigation() {
  const keyborgRef = useKeyborgRef();

  return React.useCallback(
    (isNavigatingWithKeyboard: boolean) => {
      keyborgRef.current?.setVal(isNavigatingWithKeyboard);
    },
    [keyborgRef],
  );
}
