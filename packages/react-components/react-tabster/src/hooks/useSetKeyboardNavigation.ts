import * as React from 'react';
import { useKeyborgRef } from './useKeyborgRef';

/**
 */
export function useSetKeyboardNavigation(): (isNavigatingWithKeyboard: boolean) => void {
  const keyborgRef = useKeyborgRef();

  return React.useCallback(
    (isNavigatingWithKeyboard: boolean) => {
      keyborgRef.current?.setVal(isNavigatingWithKeyboard);
    },
    [keyborgRef],
  );
}
