'use client';

import * as React from 'react';
import { useKeyborgRef } from './useKeyborgRef';

/**
 * Returns a function that programmatically overrides the keyboard navigation mode.
 */
export function useSetKeyboardNavigation(): (isNavigatingWithKeyboard: boolean) => void {
  const detectorRef = useKeyborgRef();

  return React.useCallback(
    (isNavigatingWithKeyboard: boolean) => {
      detectorRef.current?.setVal(isNavigatingWithKeyboard);
    },
    [detectorRef],
  );
}
