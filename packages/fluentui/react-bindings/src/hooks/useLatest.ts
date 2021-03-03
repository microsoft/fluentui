import * as React from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

/**
 * This is mostly useful to get access to the latest value of some props or state inside an asynchronous callback,
 * instead of that value at the time the callback was created from.
 *
 * @param value
 */
export function useLatest<T>(value: T): { readonly current: T } {
  const ref = React.useRef(value);

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });

  return ref;
}
