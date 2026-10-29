'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import { acquireKeyboardNavigationTracker } from './keyboardNavigation';
import type { KeyboardNavigationTracker } from './keyboardNavigation';

const KEYBOARD_NAV_ATTRIBUTE = 'data-keyboard-nav';

const useKeyboardNavigationTracker = (
  onAcquire?: (tracker: KeyboardNavigationTracker) => (() => void) | void,
): React.RefObject<KeyboardNavigationTracker | null> => {
  const { targetDocument } = useFluent();
  const trackerRef = React.useRef<KeyboardNavigationTracker | null>(null);
  const onAcquireCallback = useEventCallback((tracker: KeyboardNavigationTracker) => onAcquire?.(tracker));

  React.useEffect(() => {
    const win = targetDocument?.defaultView;
    if (!win) {
      return;
    }

    const { tracker, release } = acquireKeyboardNavigationTracker(win);
    trackerRef.current = tracker;
    const cleanup = onAcquireCallback(tracker);

    return () => {
      cleanup?.();
      trackerRef.current = null;
      release();
    };
  }, [targetDocument, onAcquireCallback]);

  return trackerRef;
};

/**
 * Returns a function that reports whether the user is currently navigating with the keyboard.
 */
export function useIsNavigatingWithKeyboard(): () => boolean {
  const trackerRef = useKeyboardNavigationTracker();
  return React.useCallback(() => trackerRef.current?.isNavigatingWithKeyboard() ?? false, [trackerRef]);
}

/**
 * Returns a function that reports the kind of the last user input, `undefined` until the user interacts.
 *
 * @internal
 */
export function useLastInputType(): () => 'keyboard' | 'pointer' | undefined {
  const trackerRef = useKeyboardNavigationTracker();
  return React.useCallback(() => trackerRef.current?.getLastInputType(), [trackerRef]);
}

/**
 * Returns a function that overrides the keyboard navigation mode, e.g. after a programmatic focus move
 * that should be treated as keyboard navigation.
 */
export function useSetKeyboardNavigation(): (isNavigatingWithKeyboard: boolean) => void {
  const trackerRef = useKeyboardNavigationTracker();
  return React.useCallback(
    (isNavigatingWithKeyboard: boolean) => trackerRef.current?.setNavigatingWithKeyboard(isNavigatingWithKeyboard),
    [trackerRef],
  );
}

/**
 * Calls `callback` with the current keyboard navigation mode and every time it changes.
 */
export function useOnKeyboardNavigationChange(callback: (isNavigatingWithKeyboard: boolean) => void): void {
  const eventCallback = useEventCallback(callback);

  useKeyboardNavigationTracker(tracker => {
    eventCallback(tracker.isNavigatingWithKeyboard());
    return tracker.subscribe(eventCallback);
  });
}

/**
 * Returns a ref that keeps a `data-keyboard-nav` attribute on the referenced element in sync with the
 * keyboard navigation mode, without re-rendering.
 */
export function useKeyboardNavAttribute<E extends HTMLElement>(): React.RefObject<E | null> {
  const ref = React.useRef<E>(null);

  useOnKeyboardNavigationChange(isNavigatingWithKeyboard => {
    ref.current?.toggleAttribute(KEYBOARD_NAV_ATTRIBUTE, isNavigatingWithKeyboard);
  });

  return ref;
}
