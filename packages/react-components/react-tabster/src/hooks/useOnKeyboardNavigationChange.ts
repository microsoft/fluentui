'use client';

import * as React from 'react';
import { useEventCallback } from '@fluentui/react-utilities';
import { useKeyborgRef } from './useKeyborgRef';

/**
 * Subscribes to changes in the keyboard navigation mode.
 *
 * @param callback - called every time the keyboard navigation state changes
 */
export function useOnKeyboardNavigationChange(callback: (isNavigatingWithKeyboard: boolean) => void): void {
  const detectorRef = useKeyborgRef();
  const eventCallback = useEventCallback(callback);

  React.useEffect(() => {
    const detector = detectorRef.current;
    if (!detector) {
      return;
    }

    const cb = (next: boolean) => {
      eventCallback(next);
    };

    detector.subscribe(cb);
    // Immediately call with the current state
    cb(detector.isNavigatingWithKeyboard());

    return () => {
      detector.unsubscribe(cb);
    };
  }, [detectorRef, eventCallback]);
}
