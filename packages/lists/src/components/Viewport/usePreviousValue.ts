import { useRef, useEffect } from 'react';

/**
 * Hook keeping track of a given value from a previous execution of the component the Hook is used in.
 */
export function usePreviousValue<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
