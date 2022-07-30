import { KEYBORG_FOCUSIN, KeyborgFocusInEvent, createKeyborg, disposeKeyborg } from 'keyborg';

export const FOCUS_VISIBLE_CLASS = 'fui-focus-visible';

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

export function applyFocusVisiblePolyfill(scope: HTMLElement, win: Window): () => void {
  if (alreadyInScope(scope)) {
    // Focus visible polyfill already applied at this scope
    return () => undefined;
  }

  const state: FocusVisibleState = {
    current: undefined,
  };

  const keyborg = createKeyborg(win);

  // When navgitaion mode changes remove the focus-visible selector
  keyborg.subscribe(isNavigatingWithKeyboard => {
    if (!isNavigatingWithKeyboard && state.current) {
      removeFocusVisibleClass(state.current);
      state.current = undefined;
    }
  });

  // Keyborg's focusin event is only registered once on the window
  // and contains metadata about the focus event
  const keyborgListener = (e: KeyborgFocusInEvent) => {
    if (state.current) {
      removeFocusVisibleClass(state.current);
      state.current = undefined;
    }

    if (keyborg.isNavigatingWithKeyboard() && isHTMLElement(e.target) && e.target.parentElement) {
      // Griffel can't create chained global styles so use the parent element for now
      state.current = e.target.parentElement;
      applyFocusVisibleClass(state.current);
    }
  };

  scope.addEventListener(KEYBORG_FOCUSIN, keyborgListener as ListenerOverride);
  (scope as HTMLElementWithFocusVisibleScope).focusVisible = true;

  // Return disposer
  return () => {
    scope.removeEventListener(KEYBORG_FOCUSIN, keyborgListener as ListenerOverride);
    delete (scope as HTMLElementWithFocusVisibleScope).focusVisible;
    disposeKeyborg(keyborg);
  };
}

function applyFocusVisibleClass(el: HTMLElement) {
  el.classList.add(FOCUS_VISIBLE_CLASS);
}

function removeFocusVisibleClass(el: HTMLElement) {
  el.classList.remove(FOCUS_VISIBLE_CLASS);
}

function isHTMLElement(target: EventTarget | null): target is HTMLElement {
  if (!target) {
    return false;
  }
  return Boolean(target && typeof target === 'object' && 'hasAttribute' in target && 'getAttribute' in target);
}

function alreadyInScope(el: HTMLElement | null | undefined): boolean {
  if (!el) {
    return false;
  }

  if ((el as HTMLElementWithFocusVisibleScope).focusVisible) {
    return true;
  }

  return alreadyInScope(el?.parentElement);
}
