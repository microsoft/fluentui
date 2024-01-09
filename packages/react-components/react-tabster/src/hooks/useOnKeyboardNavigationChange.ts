import * as React from 'react';
import { createKeyborg, disposeKeyborg } from 'keyborg';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { KeyborgCallback } from 'keyborg';
import { useEventCallback } from '@fluentui/react-utilities';

/**
 * Instantiates [keyborg](https://github.com/microsoft/keyborg) and subscribes to changes
 * in the keyboard navigation mode.
 *
 * @param callback - called every time the keyboard navigation state changes
 */
export function useOnKeyboardNavigationChange(callback: (isNavigatingWithKeyboard: boolean) => void) {
  const { targetDocument } = useFluent();
  const keyborg = React.useMemo(() => targetDocument && createKeyborg(targetDocument.defaultView!), [targetDocument]);
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

  React.useEffect(() => {
    return () => keyborg && disposeKeyborg(keyborg);
  }, [keyborg]);
}
