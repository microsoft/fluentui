import { createKeyborg } from 'keyborg';
import { useEffect, useMemo } from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { KeyborgCallback } from 'keyborg';
import { useEventCallback } from '@fluentui/react-utilities';

/**
 * Instantiates [keyborg](https://github.com/microsoft/keyborg) and subscribes to changes
 * in the keyboard navigation mode.
 */
export function useOnKeyboardNavigationChange(callback: (isNavigatingWithKeyboard: boolean) => void) {
  const { targetDocument } = useFluent();
  const keyborg = useMemo(() => targetDocument && createKeyborg(targetDocument.defaultView!), [targetDocument]);
  const eventCallback = useEventCallback(callback);
  useEffect(() => {
    if (keyborg) {
      const cb: KeyborgCallback = next => {
        eventCallback(next);
      };
      keyborg.subscribe(cb);
      return () => keyborg.unsubscribe(cb);
    }
  }, [keyborg, eventCallback]);
}
