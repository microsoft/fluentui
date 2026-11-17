'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { setKeyboardModality } from '@fluentui/react-utilities';
import { useKeyborgRef } from './useKeyborgRef';

/**
 */
export function useSetKeyboardNavigation(): (isNavigatingWithKeyboard: boolean) => void {
  const { targetDocument } = useFluent();
  const keyborgRef = useKeyborgRef();

  return React.useCallback(
    (isNavigatingWithKeyboard: boolean) => {
      keyborgRef.current?.setVal(isNavigatingWithKeyboard);
      // Active-descendant consumers also track native input without depending on Keyborg.
      setKeyboardModality(targetDocument, isNavigatingWithKeyboard);
    },
    [keyborgRef, targetDocument],
  );
}
