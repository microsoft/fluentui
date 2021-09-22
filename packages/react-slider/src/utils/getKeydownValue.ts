import * as React from 'react';
import { getRTLSafeKey } from './getRTLSafeKey';

/**
 * Determines the incoming value for the Slider based off of a keyboard event.
 * It automatically flips the key direction if the dir parameter is rtl.
 */
export const getKeydownValue = (
  ev: React.KeyboardEvent<HTMLDivElement>,
  currentValue: number,
  min: number,
  max: number,
  dir: 'ltr' | 'rtl',
  keyboardStep: number,
): number => {
  const normalizedKey = getRTLSafeKey(ev.key, dir);

  const arrowStep = ev.shiftKey ? keyboardStep * 10 : keyboardStep;

  switch (normalizedKey) {
    case 'ArrowDown':
    case 'ArrowLeft':
      return currentValue - arrowStep;
    case 'ArrowUp':
    case 'ArrowRight':
      return currentValue + arrowStep;
    case 'PageDown':
      return currentValue - keyboardStep * 10;
    case 'PageUp':
      return currentValue + keyboardStep * 10;
    case 'Home':
      return min;
    case 'End':
      return max;
  }

  return currentValue;
};
