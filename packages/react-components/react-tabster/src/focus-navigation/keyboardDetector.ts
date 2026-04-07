/**
 * Keyboard vs. pointer navigation detector — replaces the `keyborg` library.
 *
 * A singleton is created per window and is reference-counted so that multiple
 * consumers share one set of listeners without fighting over state.
 */

export type KeyboardDetectorCallback = (isNavigatingWithKeyboard: boolean) => void;

export type KeyboardDetector = {
  isNavigatingWithKeyboard: () => boolean;
  subscribe: (callback: KeyboardDetectorCallback) => void;
  unsubscribe: (callback: KeyboardDetectorCallback) => void;
  /** Programmatically override the current navigation mode. */
  setVal: (value: boolean) => void;
  /** Decrement ref-count; the underlying listeners are removed when count hits 0. */
  dispose: () => void;
};

/**
 * Custom focusin event name kept identical to keyborg's constant for
 * backwards-compatibility with any external listeners.
 */
export const KEYBORG_FOCUSIN = 'keyborg:focusin' as const;

/**
 * Event dispatched on every focusin when navigating with the keyboard,
 * matches the shape consumers expect from keyborg.
 */
export type KeyborgFocusInEvent = CustomEvent<{
  isNavigatingWithKeyboard: boolean;
  isFocusedProgrammatically?: boolean;
}>;

declare global {
  interface DocumentEventMap {
    'keyborg:focusin': KeyborgFocusInEvent;
  }
  interface ElementEventMap {
    'keyborg:focusin': KeyborgFocusInEvent;
  }
}

// ---------------------------------------------------------------------------
// Module-private singleton registry
// ---------------------------------------------------------------------------

type DetectorState = {
  detector: KeyboardDetector;
  refCount: number;
  isKeyboard: boolean;
  isProgrammaticFocus: boolean;
  callbacks: Set<KeyboardDetectorCallback>;
  onKeydown: (e: KeyboardEvent) => void;
  onPointerdown: () => void;
  onFocusin: (e: FocusEvent) => void;
  originalFocus: typeof HTMLElement.prototype.focus;
};

const registry = new WeakMap<Window, DetectorState>();

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Get or create the keyboard detector for the given window.
 * Call `detector.dispose()` when done; listeners are only removed after the
 * last consumer disposes.
 */
export function createKeyboardDetector(win: Window): KeyboardDetector {
  const existing = registry.get(win);
  if (existing) {
    existing.refCount++;
    return existing.detector;
  }

  const state: DetectorState = {
    detector: null as unknown as KeyboardDetector, // set below
    refCount: 1,
    isKeyboard: false,
    isProgrammaticFocus: false,
    callbacks: new Set(),
    onKeydown: null as unknown as (e: KeyboardEvent) => void,
    onPointerdown: null as unknown as () => void,
    onFocusin: null as unknown as (e: FocusEvent) => void,
    originalFocus: HTMLElement.prototype.focus,
  };

  // Patch HTMLElement.prototype.focus to detect programmatic focus calls.
  // This matches keyborg's behaviour: any direct .focus() call (not triggered
  // by keyboard/pointer interaction) sets isProgrammaticFocus.
  HTMLElement.prototype.focus = function patchedFocus(this: HTMLElement, options?: FocusOptions) {
    state.isProgrammaticFocus = true;
    state.originalFocus.call(this, options);
  };

  function notify(value: boolean) {
    if (state.isKeyboard === value) {
      return;
    }
    state.isKeyboard = value;
    for (const cb of state.callbacks) {
      cb(value);
    }
  }

  state.onKeydown = (e: KeyboardEvent) => {
    // Ignore standalone modifier keys
    if (e.key !== 'Meta' && e.key !== 'Alt' && e.key !== 'Control' && e.key !== 'Shift') {
      notify(true);
    }
  };

  state.onPointerdown = () => notify(false);

  state.onFocusin = (e: FocusEvent) => {
    // Read the flag but do NOT reset it here — navigationManager's document-level
    // focusin listener fires after this window-level one and will consume it via
    // consumeProgrammaticFocusFlag(). After the full focusin dispatch cycle,
    // we clear it in a microtask to handle cases where no navigationManager exists.
    const isFocusedProgrammatically = state.isProgrammaticFocus;
    Promise.resolve().then(() => {
      state.isProgrammaticFocus = false;
    });
    if (!state.isKeyboard) {
      return;
    }
    // Dispatch keyborg-compatible event so that polyfills and external listeners work
    const target = e.composedPath()[0] ?? e.target;
    if (target) {
      const keyborgEvent: KeyborgFocusInEvent = new CustomEvent(KEYBORG_FOCUSIN, {
        bubbles: true,
        composed: true,
        detail: { isNavigatingWithKeyboard: true, isFocusedProgrammatically },
      });
      target.dispatchEvent(keyborgEvent);
    }
  };

  win.addEventListener('keydown', state.onKeydown, true);
  win.addEventListener('pointerdown', state.onPointerdown, true);
  win.addEventListener('focusin', state.onFocusin, true);

  // Set win.__keyborg for backwards-compatibility with code that checks for it
  // (matches original keyborg library behaviour).
  (win as Window & { __keyborg?: unknown }).__keyborg = state;

  const detector: KeyboardDetector = {
    isNavigatingWithKeyboard: () => state.isKeyboard,

    subscribe: (cb: KeyboardDetectorCallback) => {
      state.callbacks.add(cb);
    },

    unsubscribe: (cb: KeyboardDetectorCallback) => {
      state.callbacks.delete(cb);
    },

    setVal: (value: boolean) => {
      notify(value);
    },

    dispose: () => {
      state.refCount--;
      if (state.refCount <= 0) {
        win.removeEventListener('keydown', state.onKeydown, true);
        win.removeEventListener('pointerdown', state.onPointerdown, true);
        win.removeEventListener('focusin', state.onFocusin, true);
        state.callbacks.clear();
        registry.delete(win);
        // Restore patched focus and clear global marker
        HTMLElement.prototype.focus = state.originalFocus;
        delete (win as Window & { __keyborg?: unknown }).__keyborg;
      }
    },
  };

  state.detector = detector;
  registry.set(win, state);
  return detector;
}

export function disposeKeyboardDetector(detector: KeyboardDetector): void {
  detector.dispose();
}

/**
 * Signal that the next focus event will be programmatically initiated
 * (e.g. by arrow-key navigation, focus restoration after modal close).
 * The keyboard detector will include `isFocusedProgrammatically: true`
 * in the next `keyborg:focusin` event detail.
 */
export function markNextFocusProgrammatic(win: Window): void {
  const state = registry.get(win);
  if (state) {
    state.isProgrammaticFocus = true;
  }
}

/**
 * Reads and resets the programmatic-focus flag for the given window.
 * Called by navigationManager's focusin handler (which fires after this
 * module's window-level handler) to determine whether the focus change was
 * triggered by a direct `.focus()` call rather than by user interaction.
 */
export function consumeProgrammaticFocusFlag(win: Window | null | undefined): boolean {
  if (!win) {
    return false;
  }
  const state = registry.get(win);
  if (!state) {
    return false;
  }
  const val = state.isProgrammaticFocus;
  state.isProgrammaticFocus = false;
  return val;
}
