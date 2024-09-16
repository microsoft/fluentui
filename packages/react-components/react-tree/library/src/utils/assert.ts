import * as React from 'react';

export function assertIsDefinedRef<V>(
  refObject: React.RefObject<V | null | undefined>,
  msg = `assertIsDefinedRef: reference not properly defined ${refObject}`,
): asserts refObject is React.MutableRefObject<V> {
  // eslint-disable-next-line eqeqeq
  if (refObject.current == undefined && process.env.NODE_ENV === 'development') {
    throw new TypeError(msg);
  }
}
