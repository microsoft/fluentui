'use client';

import * as React from 'react';

/**
 * @internal
 */
export const usePrevious = <ValueType = unknown>(value: ValueType): ValueType | null => {
  const ref = React.useRef<ValueType | null>(null);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  // eslint-disable-next-line react-hooks/refs
  return ref.current;
};
