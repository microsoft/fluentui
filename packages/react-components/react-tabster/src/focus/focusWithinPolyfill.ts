import { createKeyboardDetector, disposeKeyboardDetector, KEYBORG_FOCUSIN } from '../focus-navigation/keyboardDetector';
import { FOCUS_WITHIN_ATTR } from './constants';

function isHTMLElement(target: EventTarget | null): target is HTMLElement {
  return Boolean(target && typeof target === 'object' && 'classList' in target && 'contains' in target);
}

/**
 * A ponyfill that allows `:focus-within` to support visibility based on keyboard/mouse navigation
 * like `:focus-visible` https://github.com/WICG/focus-visible/issues/151
 * @returns disposer function
 */
export function applyFocusWithinPolyfill(element: HTMLElement, win: Window): () => void {
  const keyboard = createKeyboardDetector(win);

  // When navigation mode changes to mouse, remove the focus-within attribute
  const keyborgCallback = (isNavigatingWithKeyboard: boolean) => {
    if (!isNavigatingWithKeyboard) {
      element.removeAttribute(FOCUS_WITHIN_ATTR);
    }
  };
  keyboard.subscribe(keyborgCallback);

  // Listen to KEYBORG_FOCUSIN (fired on every focusin while in keyboard mode)
  const keyborgListener = (e: Event) => {
    if (keyboard.isNavigatingWithKeyboard() && isHTMLElement((e as Event).target)) {
      element.setAttribute(FOCUS_WITHIN_ATTR, '');
    }
  };

  // Make sure that when focus leaves the scope, the attribute is removed
  const blurListener = (e: FocusEvent) => {
    if (!e.relatedTarget || (isHTMLElement(e.relatedTarget) && !element.contains(e.relatedTarget))) {
      element.removeAttribute(FOCUS_WITHIN_ATTR);
    }
  };

  element.addEventListener(KEYBORG_FOCUSIN, keyborgListener);
  element.addEventListener('focusout', blurListener);

  return () => {
    element.removeEventListener(KEYBORG_FOCUSIN, keyborgListener);
    element.removeEventListener('focusout', blurListener);
    keyboard.unsubscribe(keyborgCallback);
    disposeKeyboardDetector(keyboard);
  };
}
