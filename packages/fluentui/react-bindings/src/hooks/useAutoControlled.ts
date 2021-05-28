import * as React from 'react';

type UseAutoControlledOptions<Value> = {
  defaultValue: Value;
  value: Value;

  initialValue?: Value;
};

const isUndefined = (value: any) => typeof value === 'undefined';

/**
 * Returns a stateful value, and a function to update it. Mimics the `useState()` React Hook
 * signature.
 */
export const useAutoControlled = <Value>(
  options: UseAutoControlledOptions<Value>,
): [Value, React.Dispatch<React.SetStateAction<Value>>] => {
  const [stateValue, setStateValue] = React.useState<Value>(
    isUndefined(options.defaultValue) ? (options.initialValue as Value) : options.defaultValue,
  );

  const value = isUndefined(options.value) ? stateValue : options.value;
  // Used to avoid dependencies in "setValue"
  const valueRef = React.useRef(value);

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const setValue = React.useCallback((newState: Value) => {
    if (typeof newState === 'function') {
      // Handles functional updates
      // https://reactjs.org/docs/hooks-reference.html#functional-updates
      valueRef.current = newState(valueRef.current);
    } else {
      valueRef.current = newState;
    }

    setStateValue(valueRef.current);
  }, []);

  return [value, setValue];
};
