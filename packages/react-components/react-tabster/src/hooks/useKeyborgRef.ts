import * as React from 'react';
import { createKeyborg, disposeKeyborg, type Keyborg } from 'keyborg';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * @internal
 * Instantiates [keyborg](https://github.com/microsoft/keyborg)
 * @returns - keyborg instance
 */
export function useKeyborgRef(): React.RefObject<Keyborg | null> {
  const { targetDocument } = useFluent();
  const keyborgRef = React.useRef<Keyborg | null>(null);

  React.useEffect(() => {
    const targetWindow = targetDocument?.defaultView;

    if (targetWindow) {
      const keyborg = createKeyborg(targetWindow);
      keyborgRef.current = keyborg;

      return () => {
        disposeKeyborg(keyborg);
        keyborgRef.current = null;
      };
    }
  }, [targetDocument]);

  return keyborgRef;
}
