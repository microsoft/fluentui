import * as React from 'react';
import { useKeyborgRef } from './useKeyborgRef';

/**
 * Instantiates [keyborg](https://github.com/microsoft/keyborg) and checks if the user is navigating with the keyboard.
 * @returns
 */
export function useIsNavigatingWithKeyboard(): () => boolean {
  const keyborgRef = useKeyborgRef();

  return React.useCallback(() => {
    return keyborgRef.current?.isNavigatingWithKeyboard() ?? false;
  }, [keyborgRef]);
}
