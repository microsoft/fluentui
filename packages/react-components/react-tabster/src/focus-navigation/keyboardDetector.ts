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
export type KeyborgFocusInEvent = CustomEvent<{ isNavigatingWithKeyboard: boolean }>;

// ---------------------------------------------------------------------------
// Module-private singleton registry
// ---------------------------------------------------------------------------

type DetectorState = {
  detector: KeyboardDetector;
  refCount: number;
  isKeyboard: boolean;
  callbacks: Set<KeyboardDetectorCallback>;
  onKeydown: (e: KeyboardEvent) => void;
  onPointerdown: () => void;
  onFocusin: (e: FocusEvent) => void;
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
    callbacks: new Set(),
    onKeydown: null as unknown as (e: KeyboardEvent) => void,
    onPointerdown: null as unknown as () => void,
    onFocusin: null as unknown as (e: FocusEvent) => void,
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
    if (!state.isKeyboard) {
      return;
    }
    // Dispatch keyborg-compatible event so that polyfills and external listeners work
    const target = e.composedPath()[0] ?? e.target;
    if (target) {
      const keyborgEvent: KeyborgFocusInEvent = new CustomEvent(KEYBORG_FOCUSIN, {
        bubbles: true,
        composed: true,
        detail: { isNavigatingWithKeyboard: true },
      });
      target.dispatchEvent(keyborgEvent);
    }
  };

  win.addEventListener('keydown', state.onKeydown, true);
  win.addEventListener('pointerdown', state.onPointerdown, true);
  win.addEventListener('focusin', state.onFocusin, true);

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
