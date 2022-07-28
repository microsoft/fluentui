import * as React from 'react';

/**
 * Normalizes a set state action into a setter function
 */
export function normalizeSetStateAction<T>(setOpen: React.SetStateAction<T>): (prev: T) => T {
  return typeof setOpen === 'function' ? (setOpen as (prevState: T) => T) : () => setOpen;
}
