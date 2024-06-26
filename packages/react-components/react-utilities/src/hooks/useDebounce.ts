import * as React from 'react';
import { useTimeout } from './useTimeout';

/**
 * @internal
 *
 * Debounces a value, updating the debounced value only after a specified delay.
 *
 * @param value - The value to be debounced.
 * @param delay - The delay in milliseconds before the debounced value is updated.
 * @returns The debounced value.
 */
export function useDebounce<T = unknown>(value: T, delay: number) {
  const [setTimeout, cancelTimeout] = useTimeout();
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    setTimeout(() => setDebouncedValue(value), delay);

    return () => cancelTimeout();
  }, [value, delay, setTimeout, cancelTimeout]);

  return debouncedValue;
}
