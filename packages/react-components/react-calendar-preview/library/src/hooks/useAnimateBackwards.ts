'use client';

import * as React from 'react';

/**
 * Whether the grid is navigating towards an earlier range, comparing the current range marker with
 * the one from the previous render. `false` until the first navigation, so nothing animates on mount.
 * @internal
 */
export function useAnimateBackwards<T extends number | Date>(
  fromValue: T,
  compare: (value1: T, value2: T) => number = (value1, value2) => Number(value1) - Number(value2),
): boolean {
  const previousValueRef = React.useRef<T | undefined>(undefined);
  React.useEffect(() => {
    previousValueRef.current = fromValue;
  });
  // eslint-disable-next-line react-hooks/refs
  const previousValue = previousValueRef.current;

  // eslint-disable-next-line react-hooks/refs
  if (previousValue === undefined || compare(previousValue, fromValue) === 0) {
    return false;
  }

  return compare(previousValue, fromValue) > 0;
}
