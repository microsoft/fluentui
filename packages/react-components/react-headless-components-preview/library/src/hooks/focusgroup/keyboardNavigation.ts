/**
 * Tracks whether the user is currently navigating with the keyboard, per window.
 *
 * Mirrors keyborg's heuristics: Tab always switches to keyboard mode, other keys do so unless a text
 * input owns focus; a real (non-synthetic) mouse or touch press switches back to pointer mode.
 */
export type KeyboardNavigationTracker = {
  isNavigatingWithKeyboard: () => boolean;
  /** The kind of the last user input, `undefined` until the user interacts. */
  getLastInputType: () => 'keyboard' | 'pointer' | undefined;
  setNavigatingWithKeyboard: (value: boolean) => void;
  subscribe: (callback: (isNavigatingWithKeyboard: boolean) => void) => () => void;
};

type TrackerEntry = KeyboardNavigationTracker & { refCount: number; dispose: () => void };

const trackers = new WeakMap<Window, TrackerEntry>();

const isTextInput = (element: Element | null): boolean =>
  !!element &&
  (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || (element as HTMLElement).isContentEditable);

const createTracker = (win: Window): TrackerEntry => {
  let navigating = false;
  let lastInputType: 'keyboard' | 'pointer' | undefined;
  const listeners = new Set<(value: boolean) => void>();

  const setNavigating = (value: boolean) => {
    if (navigating !== value) {
      navigating = value;
      listeners.forEach(listener => listener(value));
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    lastInputType = 'keyboard';
    if (event.key === 'Tab' || !isTextInput(win.document.activeElement)) {
      setNavigating(true);
    }
  };

  const onMouseDown = (event: MouseEvent) => {
    // Screen readers dispatch synthetic clicks with no buttons/coordinates; those must not leave keyboard mode.
    if (event.buttons === 0 || (event.clientX === 0 && event.clientY === 0 && event.screenX === 0)) {
      return;
    }
    lastInputType = 'pointer';
    setNavigating(false);
  };

  const onTouchStart = () => {
    lastInputType = 'pointer';
    setNavigating(false);
  };

  win.addEventListener('keydown', onKeyDown, true);
  win.document.addEventListener('mousedown', onMouseDown, true);
  win.document.addEventListener('touchstart', onTouchStart, true);

  return {
    refCount: 0,
    isNavigatingWithKeyboard: () => navigating,
    getLastInputType: () => lastInputType,
    setNavigatingWithKeyboard: setNavigating,
    subscribe: callback => {
      listeners.add(callback);
      return () => listeners.delete(callback);
    },
    dispose: () => {
      win.removeEventListener('keydown', onKeyDown, true);
      win.document.removeEventListener('mousedown', onMouseDown, true);
      win.document.removeEventListener('touchstart', onTouchStart, true);
      listeners.clear();
    },
  };
};

/**
 * Returns the keyboard navigation tracker for `win`, creating it on first use. Call the returned `release`
 * when the consumer unmounts so that listeners are removed once the last consumer is gone.
 */
export const acquireKeyboardNavigationTracker = (
  win: Window,
): { tracker: KeyboardNavigationTracker; release: () => void } => {
  let entry = trackers.get(win);
  if (!entry) {
    entry = createTracker(win);
    trackers.set(win, entry);
  }
  entry.refCount++;

  let released = false;
  const current = entry;

  return {
    tracker: current,
    release: () => {
      if (released) {
        return;
      }
      released = true;
      if (--current.refCount === 0) {
        current.dispose();
        trackers.delete(win);
      }
    },
  };
};
