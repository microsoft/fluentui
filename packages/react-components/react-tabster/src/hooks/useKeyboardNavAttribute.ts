import * as React from 'react';
import { createKeyborg } from 'keyborg';
import { KEYBOARD_NAV_ATTRIBUTE } from '../focus/constants';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { KeyborgCallback } from 'keyborg';

/**
 * Instantiates [keyborg](https://github.com/microsoft/keyborg) and adds `data-keyboard-nav`
 * attribute to a referenced element to ensure keyboard navigation awareness
 * synced to keyborg logic without having to cause a re-render on react tree.
 */
export function useKeyboardNavAttribute<E extends HTMLElement>(): React.RefObject<E> {
  const { targetDocument } = useFluent();
  const keyborg = React.useMemo(() => targetDocument && createKeyborg(targetDocument.defaultView!), [targetDocument]);
  const ref = React.useRef<E>(null);
  React.useEffect(() => {
    if (keyborg) {
      setBooleanAttribute(ref, KEYBOARD_NAV_ATTRIBUTE, keyborg.isNavigatingWithKeyboard());
      const cb: KeyborgCallback = next => {
        setBooleanAttribute(ref, KEYBOARD_NAV_ATTRIBUTE, next);
      };
      keyborg.subscribe(cb);
      return () => keyborg.unsubscribe(cb);
    }
  }, [keyborg]);
  return ref;
}

function setBooleanAttribute(elementRef: React.RefObject<HTMLElement>, attribute: string, value: boolean) {
  if (!elementRef.current) {
    return;
  }
  if (value) {
    elementRef.current.setAttribute(attribute, '');
  } else {
    elementRef.current.removeAttribute(attribute);
  }
}
