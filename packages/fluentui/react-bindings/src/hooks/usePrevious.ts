import * as React from 'react';

export const usePrevious = <ValueType = unknown>(value: ValueType, initialValue: ValueType | null = null) => {
  const ref = React.useRef<ValueType | null>(initialValue);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
