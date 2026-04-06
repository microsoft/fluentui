'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { createKeyboardDetector, disposeKeyboardDetector } from '../focus-navigation/keyboardDetector';
import { KEYBOARD_NAV_ATTRIBUTE } from '../focus/constants';

/**
 * Adds `data-keyboard-nav` attribute to the referenced element whenever the
 * user navigates with the keyboard, without causing a React re-render.
 * Replaces the keyborg-based implementation.
 */
export function useKeyboardNavAttribute<E extends HTMLElement>(): React.RefObject<E | null> {
  const { targetDocument } = useFluent();
  const ref = React.useRef<E>(null);

  React.useEffect(() => {
    const targetWindow = targetDocument?.defaultView;
    if (!targetWindow) return;

    const detector = createKeyboardDetector(targetWindow);

    // Set initial state
    setBooleanAttribute(ref, KEYBOARD_NAV_ATTRIBUTE, detector.isNavigatingWithKeyboard());

    const cb = (isKeyboard: boolean) => {
      setBooleanAttribute(ref, KEYBOARD_NAV_ATTRIBUTE, isKeyboard);
    };
    detector.subscribe(cb);

    return () => {
      detector.unsubscribe(cb);
      disposeKeyboardDetector(detector);
    };
  }, [targetDocument]);

  return ref;
}

function setBooleanAttribute(elementRef: React.RefObject<HTMLElement | null>, attribute: string, value: boolean) {
  if (!elementRef.current) return;
  if (value) {
    elementRef.current.setAttribute(attribute, '');
  } else {
    elementRef.current.removeAttribute(attribute);
  }
}
