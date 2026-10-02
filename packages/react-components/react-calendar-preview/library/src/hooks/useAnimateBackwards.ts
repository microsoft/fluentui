'use client';

import * as React from 'react';

/**
 * Whether the grid is navigating towards an earlier range, comparing the current range marker with
 * the one from the previous render. `undefined` means there is no previous render, so nothing animates on mount.
 * @internal
 */
export function useAnimateBackwards<T extends number | Date>(
  fromValue: T | undefined,
  compare: (value1: T, value2: T) => number = (value1, value2) => Number(value1) - Number(value2),
): boolean | undefined {
  const previousValueRef = React.useRef<T | undefined>(undefined);
  const previousDirectionRef = React.useRef<boolean | undefined>(undefined);
  React.useEffect(() => {
    if (fromValue === undefined) {
      return;
    }

    const previousValue = previousValueRef.current;
    if (previousValue !== undefined) {
      const comparison = compare(previousValue, fromValue);
      if (comparison !== 0) {
        previousDirectionRef.current = comparison > 0;
      }
    }
    previousValueRef.current = fromValue;
  }, [compare, fromValue]);
  // eslint-disable-next-line react-hooks/refs
  const previousValue = previousValueRef.current;

  // eslint-disable-next-line react-hooks/refs
  if (previousValue === undefined || fromValue === undefined) {
    return undefined;
  }

  const comparison = compare(previousValue, fromValue);
  if (comparison !== 0) {
    return comparison > 0;
  }

  // eslint-disable-next-line react-hooks/refs
  return previousDirectionRef.current ?? false;
}
