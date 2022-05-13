import { createKeyborg } from 'keyborg';
import { useEffect, useMemo, useRef } from 'react';
import { KEYBOARD_NAV_ATTRIBUTE } from '../focus/constants';
import { useFluent } from '@fluentui/react-shared-contexts';
import type { KeyborgCallback } from 'keyborg/dist/Keyborg';
import type { RefObject } from 'react';

/**
 * instantiates keyborg and add attribute to ensure focus indicator synced to keyborg logic
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
