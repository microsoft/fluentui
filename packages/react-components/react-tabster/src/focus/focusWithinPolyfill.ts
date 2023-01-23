import { KEYBORG_FOCUSIN, KeyborgFocusInEvent, createKeyborg, disposeKeyborg } from 'keyborg';
import { FOCUS_WITHIN_ATTR } from './constants';

/**
 * Because `addEventListener` type override falls back to 2nd definition (evt name is unknown string literal)
 * evt is being typed as a base class of MouseEvent -> `Event`.
 * This type is used to override `listener` calls to make TS happy
 */
type ListenerOverride = (evt: Event) => void;

/**
 * A ponyfill that allows `:focus-within` to support visibility based on keyboard/mouse navigation
 * like `:focus-visible` https://github.com/WICG/focus-visible/issues/151
 * @returns ref to the element that uses `:focus-within` styles
 */
export function applyFocusWithinPolyfill(element: HTMLElement, win: Window): () => void {
  const keyborg = createKeyborg(win);

  // When navigation mode changes to mouse, remove the focus-within selector
  keyborg.subscribe(isNavigatingWithKeyboard => {
    if (!isNavigatingWithKeyboard) {
      removeFocusWithinClass(element);
    }
  });

  // Keyborg's focusin event is delegated so it's only registered once on the window
  // and contains metadata about the focus event
  const keyborgListener = (e: KeyborgFocusInEvent) => {
    if (keyborg.isNavigatingWithKeyboard() && isHTMLElement(e.target)) {
      // Griffel can't create chained global styles so use the parent element for now
      applyFocusWithinClass(element);
    }
  };

  // Make sure that when focus leaves the scope, the focus within class is removed
  const blurListener = (e: FocusEvent) => {
    if (!e.relatedTarget || (isHTMLElement(e.relatedTarget) && !element.contains(e.relatedTarget))) {
      removeFocusWithinClass(element);
    }
  };

  element.addEventListener(KEYBORG_FOCUSIN, keyborgListener as ListenerOverride);
  element.addEventListener('focusout', blurListener);

  // Return disposer
  return () => {
    element.removeEventListener(KEYBORG_FOCUSIN, keyborgListener as ListenerOverride);
    element.removeEventListener('focusout', blurListener);
    disposeKeyborg(keyborg);
  };
}

function applyFocusWithinClass(el: HTMLElement) {
  el.setAttribute(FOCUS_WITHIN_ATTR, '');
}

function removeFocusWithinClass(el: HTMLElement) {
  el.removeAttribute(FOCUS_WITHIN_ATTR);
}

function isHTMLElement(target: EventTarget | null): target is HTMLElement {
  if (!target) {
    return false;
  }
  return Boolean(target && typeof target === 'object' && 'classList' in target && 'contains' in target);
}
