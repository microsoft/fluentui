import { createKeyborg } from 'keyborg';
import { useEffect, useMemo, useRef } from 'react';
import { KEYBOARD_NAV_ATTRIBUTE } from '../focus/constants';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { KeyborgCallback } from 'keyborg';
import type { RefObject } from 'react';

/**
 * Instantiates [keyborg](https://github.com/microsoft/keyborg) and adds `data-keyboard-nav`
 * attribute to a referenced element to ensure keyboard navigation awareness
 * synced to keyborg logic without having to cause a re-render on react tree.
 */
export function useKeyboardNavAttribute<E extends HTMLElement>() {
  const { targetDocument } = useFluent();
  const keyborg = useMemo(() => targetDocument && createKeyborg(targetDocument.defaultView!), [targetDocument]);
  const ref = useRef<E>(null);
  useEffect(() => {
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

function setBooleanAttribute(elementRef: RefObject<HTMLElement>, attribute: string, value: boolean) {
  if (!elementRef.current) {
    return;
  }
  if (value) {
    elementRef.current.setAttribute(attribute, '');
  } else {
    elementRef.current.removeAttribute(attribute);
  }
}
