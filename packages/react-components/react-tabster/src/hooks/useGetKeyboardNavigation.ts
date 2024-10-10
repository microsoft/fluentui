import * as React from 'react';
import { useKeyborgRef } from './useKeyborgRef';

/**
 */
export function useGetKeyboardNavigation() {
  const keyborgRef = useKeyborgRef();

  return React.useCallback(
    () => {
      return keyborgRef.current?.isNavigatingWithKeyboard();
    },
    [keyborgRef],
  );
}
