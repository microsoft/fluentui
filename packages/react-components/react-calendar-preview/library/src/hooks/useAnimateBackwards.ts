'use client';

import * as React from 'react';

/**
 * Whether the grid is navigating towards an earlier range, comparing the current range marker with
 * the one from the previous render. `false` until the first navigation, so nothing animates on mount.
 * @internal
 */
export function useAnimateBackwards<T extends number | Date>(fromValue: T): boolean {
  const previousValueRef = React.useRef<T | undefined>(undefined);
  React.useEffect(() => {
    previousValueRef.current = fromValue;
  });
  // eslint-disable-next-line react-hooks/refs
  const previousValue = previousValueRef.current;

  // eslint-disable-next-line react-hooks/refs
  if (previousValue === undefined || Number(previousValue) === Number(fromValue)) {
    return false;
  }

  return Number(previousValue) > Number(fromValue);
}
