import * as React from 'react';

/**
 * @deprecated Deprecated due to potential for misuse (see package readme).
 * Use `React.useCallback` instead.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useConstCallback<T extends (...args: any[]) => any>(callback: T): T {
  const ref = React.useRef<T>();
  if (!ref.current) {
    ref.current = callback;
  }
  return ref.current;
}
