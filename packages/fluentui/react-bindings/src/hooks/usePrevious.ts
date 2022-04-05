import * as React from 'react';

export const usePrevious = <ValueType = unknown>(
  value: ValueType,
  initialValue: ValueType | undefined = undefined,
): ValueType | undefined => {
  const ref = React.useRef<ValueType | undefined>(initialValue);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
