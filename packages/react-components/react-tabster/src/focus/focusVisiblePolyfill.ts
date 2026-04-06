import { isHTMLElement } from '@fluentui/react-utilities';
import { createKeyboardDetector, disposeKeyboardDetector, KEYBORG_FOCUSIN } from '../focus-navigation/keyboardDetector';
import { FOCUS_VISIBLE_ATTR } from './constants';

type HTMLElementWithFocusVisibleScope = HTMLElement & {
  focusVisible?: boolean;
};

/**
 * @internal
 * @param scope - Applies the ponyfill to all DOM children
 * @param targetWindow - window
 */
export function applyFocusVisiblePolyfill(scope: HTMLElement, targetWindow: Window): () => void {
  if (alreadyInScope(scope)) {
    return () => undefined;
  }

  const keyboard = createKeyboardDetector(targetWindow);

  let current: HTMLElement | undefined;

  function registerElementIfNavigating(el: EventTarget | HTMLElement | null) {
    if (keyboard.isNavigatingWithKeyboard() && isHTMLElement(el)) {
      current = el;
      el.setAttribute(FOCUS_VISIBLE_ATTR, '');
    }
  }

  function disposeCurrentElement() {
    if (current) {
      current.removeAttribute(FOCUS_VISIBLE_ATTR);
      current = undefined;
    }
  }

  // When navigation mode changes, add/remove the focus-visible attribute
  const keyborgCallback = (isNavigatingWithKeyboard: boolean) => {
    if (!isNavigatingWithKeyboard) {
      disposeCurrentElement();
    } else {
      registerElementIfNavigating(targetWindow.document.activeElement);
    }
  };
  keyboard.subscribe(keyborgCallback);

  // Listen for KEYBORG_FOCUSIN (fired by our keyboardDetector on every focusin
  // while in keyboard mode) — keeps the same interface as the original polyfill.
  const keyborgListener = (e: Event) => {
    disposeCurrentElement();
    const target = (e as CustomEvent).composedPath?.()[0] ?? (e as Event).target;
    registerElementIfNavigating(target as EventTarget);
  };

  // Make sure that when focus leaves the scope, the attribute is removed
  const blurListener = (e: FocusEvent) => {
    if (!e.relatedTarget || (isHTMLElement(e.relatedTarget) && !scope.contains(e.relatedTarget))) {
      disposeCurrentElement();
    }
  };

  scope.addEventListener(KEYBORG_FOCUSIN, keyborgListener);
  scope.addEventListener('focusout', blurListener);
  (scope as HTMLElementWithFocusVisibleScope).focusVisible = true;

  if (scope.contains(targetWindow.document.activeElement)) {
    registerElementIfNavigating(targetWindow.document.activeElement);
  }

  return () => {
    disposeCurrentElement();
    scope.removeEventListener(KEYBORG_FOCUSIN, keyborgListener);
    scope.removeEventListener('focusout', blurListener);
    (scope as HTMLElementWithFocusVisibleScope).focusVisible = undefined;
    keyboard.unsubscribe(keyborgCallback);
    disposeKeyboardDetector(keyboard);
  };
}

function alreadyInScope(el: HTMLElement | null | undefined): boolean {
  if (!el) {
    return false;
  }
  if ((el as HTMLElementWithFocusVisibleScope).focusVisible) {
    return true;
  }
  return alreadyInScope(el.parentElement);
}
