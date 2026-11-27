import { elementContains, isHTMLElement } from '@fluentui/react-utilities';
import type { KeyborgFocusInEvent } from 'keyborg';
import { KEYBORG_FOCUSIN, createKeyborg, disposeKeyborg } from 'keyborg';

import { FOCUS_VISIBLE_ATTR } from './constants';

/**
 * Because `addEventListener` type override falls back to 2nd definition (evt name is unknown string literal)
 * evt is being typed as a base class of MouseEvent -> `Event`.
 * This type is used to override `listener` calls to make TS happy
 */
type ListenerOverride = (evt: Event) => void;

type FocusVisibleState = {
  /**
   * Current element with focus visible in state
   */
  current: HTMLElement | undefined;
};

type HTMLElementWithFocusVisibleScope = {
  focusVisible: boolean | undefined;
} & HTMLElement;

/**
 * @internal
 * @param scope - Applies the ponyfill to all DOM children
 * @param targetWindow - window
 */
export function applyFocusVisiblePolyfill(scope: HTMLElement, targetWindow: Window): () => void {
  if ((scope as HTMLElementWithFocusVisibleScope).focusVisible) {
    // Focus visible polyfill already applied at this element
    return () => undefined;
  }

  const state: FocusVisibleState = {
    current: undefined,
  };

  const keyborg = createKeyborg(targetWindow);

  function registerElementIfNavigating(el: EventTarget | HTMLElement | null) {
    if (keyborg.isNavigatingWithKeyboard() && isHTMLElement(el) && elementContains(scope, el)) {
      state.current = el;
      el.setAttribute(FOCUS_VISIBLE_ATTR, '');
    }
  }

  function disposeCurrentElement() {
    if (state.current) {
      state.current.removeAttribute(FOCUS_VISIBLE_ATTR);
      state.current = undefined;
    }
  }

  // When navigation mode changes remove the focus-visible selector
  keyborg.subscribe(isNavigatingWithKeyboard => {
    if (!isNavigatingWithKeyboard) {
      disposeCurrentElement();
    } else {
      registerElementIfNavigating(getActiveElement(targetWindow.document));
    }
  });

  // Keyborg's focusin event is delegated so it's only registered once on the window
  // and contains metadata about the focus event
  const keyborgListener = (e: KeyborgFocusInEvent) => {
    disposeCurrentElement();
    const target = e.composedPath()[0];
    registerElementIfNavigating(target);
  };

  // Make sure that when focus leaves the scope, the focus visible class is removed
  const blurListener = (e: FocusEvent) => {
    if (!e.relatedTarget || (isHTMLElement(e.relatedTarget) && !elementContains(scope, e.relatedTarget))) {
      disposeCurrentElement();
    }
  };

  scope.addEventListener(KEYBORG_FOCUSIN, keyborgListener as ListenerOverride);
  scope.addEventListener('focusout', blurListener);
  (scope as HTMLElementWithFocusVisibleScope).focusVisible = true;

  const initialActiveElement = getActiveElement(targetWindow.document);
  if (elementContains(scope, initialActiveElement)) {
    registerElementIfNavigating(initialActiveElement);
  }

  // Return disposer
  return () => {
    disposeCurrentElement();

    scope.removeEventListener(KEYBORG_FOCUSIN, keyborgListener as ListenerOverride);
    scope.removeEventListener('focusout', blurListener);
    (scope as HTMLElementWithFocusVisibleScope).focusVisible = undefined;

    disposeKeyborg(keyborg);
  };
}

function getActiveElement(doc: Document): Element | null {
  let ae = doc.activeElement;
  while (ae?.shadowRoot?.activeElement) {
    ae = ae.shadowRoot.activeElement;
  }
  return ae;
}
