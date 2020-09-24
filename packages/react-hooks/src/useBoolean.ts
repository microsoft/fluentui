import * as React from 'react';
import { useConst } from './useConst';

/** Updater callbacks returned by `useBoolean`. */
export interface IUseBooleanCallbacks {
  /** Set the value to true. Always has the same identity. */
  setTrue: () => void;
  /** Set the value to false. Always has the same identity. */
  setFalse: () => void;
  /** Toggle the value. Always has the same identity. */
  toggle: () => void;
}

/**
 * Hook to store a value and generate callbacks for setting the value to true or false.
 * The identity of the callbacks will always stay the same.
 *
 * @param initialState - Initial value
 * @returns Array with the current value and an object containing the updater callbacks.
 */
export function useBoolean(initialState: boolean): [boolean, IUseBooleanCallbacks] {
  const [value, setValue] = React.useState(initialState);
  // Storing the value in a ref is redundant but allows the `toggle` callback to have a
  // constant identity, which overall is probably better for consumers' perf.
  const valueRef = React.useRef(value);

  const setTrue = useConst(() => () => {
    setValue(true);
    valueRef.current = true;
  });
  const setFalse = useConst(() => () => {
    setValue(false);
    valueRef.current = false;
  });
  const toggle = useConst(() => () => (valueRef.current ? setFalse() : setTrue()));

  return [value, { setTrue, setFalse, toggle }];
}
