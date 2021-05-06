import { RefObject, useEffect, useRef } from 'react';
import { KEYBOARD_NAV_ATTRIBUTE } from '../symbols';
import { useTabster } from './useTabster';

export const useNavigationAttribute = (): RefObject<HTMLElement> => {
  const tabster = useTabster();
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (tabster) {
      const setKeyboardNavAttribute = (nextIsKeyboard: boolean) => {
        ref.current?.setAttribute(KEYBOARD_NAV_ATTRIBUTE, nextIsKeyboard.toString());
      };
      setKeyboardNavAttribute(tabster.keyboardNavigation.isNavigatingWithKeyboard());
      tabster.keyboardNavigation.subscribe(setKeyboardNavAttribute);
      return () => tabster.keyboardNavigation.unsubscribe(setKeyboardNavAttribute);
    }
  }, [tabster]);
  return ref;
};
