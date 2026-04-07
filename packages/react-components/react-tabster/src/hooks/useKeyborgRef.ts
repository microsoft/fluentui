'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import {
  createKeyboardDetector,
  disposeKeyboardDetector,
  type KeyboardDetector,
} from '../focus-navigation/keyboardDetector';

/**
 * Creates (or reuses) the KeyboardDetector for the current window.
 * Replaces the `keyborg` library.
 *
 * @internal
 * @returns ref to the KeyboardDetector instance
 */
export function useKeyborgRef(): React.RefObject<KeyboardDetector | null> {
  const { targetDocument } = useFluent();
  const detectorRef = React.useRef<KeyboardDetector | null>(null);

  React.useEffect(() => {
    const targetWindow = targetDocument?.defaultView;
    if (!targetWindow) {
      return;
    }

    const detector = createKeyboardDetector(targetWindow);
    detectorRef.current = detector;

    return () => {
      disposeKeyboardDetector(detector);
      detectorRef.current = null;
    };
  }, [targetDocument]);

  return detectorRef;
}
