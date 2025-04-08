/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

export function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = document.defaultView?.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
