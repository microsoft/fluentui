import { createKeyborg } from 'keyborg';
import { KeyborgCallback } from 'keyborg/dist/Keyborg';
import { RefObject, useEffect, useRef } from 'react';
import { KEYBOARD_NAV_ATTRIBUTE } from '../symbols';
import { useConst } from '@fluentui/react-utilities';

/**
 * instantiates keyborg and add attribute to ensure focus indicator synced to keyborg logic
 */
export function useKeyborg() {
  const keyborg = useConst(() => createKeyborg(window));
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) {
      setBooleanAttribute(ref, KEYBOARD_NAV_ATTRIBUTE, keyborg.isNavigatingWithKeyboard());
      const cb: KeyborgCallback = next => {
        setBooleanAttribute(ref, KEYBOARD_NAV_ATTRIBUTE, next);
      };
      keyborg.subscribe(cb);
      return () => keyborg.unsubscribe(cb);
    }
  });
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
