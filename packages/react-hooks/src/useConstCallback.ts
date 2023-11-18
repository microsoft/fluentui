import * as React from 'react';

/**
 * @deprecated Deprecated due to potential for misuse. Generally, use `React.useCallback` instead.
 * If you need a callback reference that never changes, consider `useEventCallback`.
 *
 * This hook was intended for creating callbacks which have no dependencies, and therefore never
 * need to change. It works fine if everyone using it is extremely mindful of how closures work,
 * but that's not a safe assumption--so in practice, usage of this hook tends to result in bugs
 * like unintentionally capturing the first value of a prop and not respecting updates (when
 * updates should be respected).
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useConstCallback<T extends (...args: any[]) => any>(callback: T): T {
  const ref = React.useRef<T>();
  if (!ref.current) {
    ref.current = callback;
  }
  return ref.current;
}
