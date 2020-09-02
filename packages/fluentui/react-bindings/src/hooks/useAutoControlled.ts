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
  const { defaultValue, initialValue = undefined, value } = options;
  const [state, setState] = React.useState<Value>(isUndefined(defaultValue) ? (initialValue as Value) : defaultValue);

  return [isUndefined(value) ? state : value, setState];
};
