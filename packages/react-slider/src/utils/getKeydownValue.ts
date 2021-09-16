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

  if (ev.shiftKey) {
    if (normalizedKey === 'ArrowDown' || normalizedKey === 'ArrowLeft') {
      return currentValue - keyboardStep * 10;
    } else if (normalizedKey === 'ArrowUp' || normalizedKey === 'ArrowRight') {
      return currentValue + keyboardStep * 10;
    }
  } else if (normalizedKey === 'ArrowDown' || normalizedKey === 'ArrowLeft') {
    return currentValue - keyboardStep;
  } else if (normalizedKey === 'ArrowUp' || normalizedKey === 'ArrowRight') {
    return currentValue + keyboardStep;
  } else {
    switch (normalizedKey) {
      case 'PageDown':
        return currentValue - keyboardStep * 10;
        break;
      case 'PageUp':
        return currentValue + keyboardStep * 10;
      case 'Home':
        return min;
      case 'End':
        return max;
    }
  }

  return currentValue;
};
