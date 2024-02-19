import * as React from 'react';
import type { KeyborgCallback } from 'keyborg';
import { useEventCallback } from '@fluentui/react-utilities';
import { useKeyborg } from './useKeyborg';

/**
 * Instantiates [keyborg](https://github.com/microsoft/keyborg) and subscribes to changes
 * in the keyboard navigation mode.
 *
 * @param callback - called every time the keyboard navigation state changes
 * @returns - function to update keyboard navigation mode manually
 */
export function useOnKeyboardNavigationChange(callback: (isNavigatingWithKeyboard: boolean) => void) {
  const keyborg = useKeyborg();
  const eventCallback = useEventCallback(callback);
  React.useEffect(() => {
    if (keyborg) {
      const cb: KeyborgCallback = next => {
        eventCallback(next);
      };
      keyborg.subscribe(cb);
      return () => keyborg.unsubscribe(cb);
    }
  }, [keyborg, eventCallback]);
}
