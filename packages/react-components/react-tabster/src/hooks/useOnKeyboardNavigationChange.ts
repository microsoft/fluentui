import type { KeyborgCallback } from 'keyborg';
import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';

import { useKeyborgRef } from './useKeyborgRef';

/**
 * Instantiates [keyborg](https://github.com/microsoft/keyborg) and subscribes to changes
 * in the keyboard navigation mode.
 *
 * @param callback - called every time the keyboard navigation state changes
 */
export function useOnKeyboardNavigationChange(callback: (isNavigatingWithKeyboard: boolean) => void) {
  const keyborgRef = useKeyborgRef();
  const eventCallback = useEventCallback(callback);

  React.useEffect(() => {
    const keyborg = keyborgRef.current;

    if (keyborg) {
      const cb: KeyborgCallback = next => {
        eventCallback(next);
      };

      keyborg.subscribe(cb);
      cb(keyborg.isNavigatingWithKeyboard());

      return () => {
        keyborg.unsubscribe(cb);
      };
    }
  }, [keyborgRef, eventCallback]);
}
