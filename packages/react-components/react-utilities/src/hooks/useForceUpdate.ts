import { useReducer } from 'react';

/**
 * @internal
 * Forces a re-render, similar to `forceUpdate` in class components.
 */
export function useForceUpdate() {
  return useReducer(x => x + 1, 0)[1];
}
