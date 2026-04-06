'use client';

import * as React from 'react';
import { useKeyborgRef } from './useKeyborgRef';

/**
 * Returns a stable getter function that returns whether the user is currently
 * navigating with the keyboard.
 */
export function useIsNavigatingWithKeyboard(): () => boolean {
  const detectorRef = useKeyborgRef();

  return React.useCallback(() => {
    return detectorRef.current?.isNavigatingWithKeyboard() ?? false;
  }, [detectorRef]);
}
