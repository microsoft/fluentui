import * as React from 'react';
import { useConstCallback } from './useConstCallback';

/** Updater callbacks returned by `useBoolean`. */
export interface IUseBooleanCallbacks {
  /** Set the value to true. Always has the same identity. */
  setTrue: () => void;
  /** Set the value to false. Always has the same identity. */
  setFalse: () => void;
  /**
   * Toggle the value. If `value` is true, this will be the `setFalse` callback.
   * If `value` is false, this will be the `setTrue` callback.
   */
  toggle: () => void;
}

/**
 * Hook to store a value and generate callbacks for setting the value to true or false.
 * The identity of the `setTrue` and `setFalse` callbacks will always stay the same.
 *
 * @param initialState - Initial value
 * @returns Array with the current value and an object containing the updater callbacks.
 */
export function useBoolean(initialState: boolean): [boolean, IUseBooleanCallbacks] {
  const [value, setValue] = React.useState(initialState);
  const setTrue = useConstCallback(() => setValue(true));
  const setFalse = useConstCallback(() => setValue(false));
  return [
    value,
    {
      setTrue,
      setFalse,
      toggle: value ? setFalse : setTrue,
    },
  ];
}
