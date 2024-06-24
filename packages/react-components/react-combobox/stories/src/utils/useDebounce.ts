import * as React from 'react';
import { useTimeout } from '@fluentui/react-utilities';

export function useDebounce<T = unknown>(value: T, delay: number) {
  const [setTimeout, cancelTimeout] = useTimeout();
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    setTimeout(() => setDebouncedValue(value), delay);

    return () => cancelTimeout();
  }, [value, delay, setTimeout, cancelTimeout]);

  return debouncedValue;
}
