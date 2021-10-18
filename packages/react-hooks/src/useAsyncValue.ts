import * as React from 'react';

export type AsyncValue<T> = [value: T | undefined, isLoaded: boolean];

/**
 * Hook to load a possibly asynchronous value.
 * @param value - The synchronous value or asynchronous function to return the value. If passing a function,
 * it should be memoized to prevent an infinite update loop.
 */
export function useAsyncValue<T>(value: T | (() => Promise<T>)): AsyncValue<T> {
  const [loadedValue, setLoadedValue] = React.useState<T | undefined>(undefined);
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);

  // We need to track the latest value function to prevent a race condition where
  // the function is invoked to load the value, a new function or value is provided,
  // and then the original invocation returns.
  const currentValueFunction = React.useRef<() => Promise<T>>();

  if (typeof value === 'function') {
    currentValueFunction.current = value as () => Promise<T>;
  } else {
    currentValueFunction.current = undefined;
  }

  React.useEffect(() => {
    if (typeof value === 'function') {
      (value as () => Promise<T>)().then(result => {
        if (currentValueFunction.current === value) {
          // If there has been an update to the value function, don't update the state
          setLoadedValue(result);
          setIsLoaded(true);
        }
      });

      return () => {
        setLoadedValue(undefined);
        setIsLoaded(false);
      };
    }
  }, [value]);

  return typeof value === 'function' ? [loadedValue, isLoaded] : [value, true];
}
