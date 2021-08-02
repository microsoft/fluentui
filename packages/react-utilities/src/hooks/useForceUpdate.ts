import { useReducer } from 'react';

/**
 * Forces a re-render, similar to `forceUpdate` in class components.
 */
export function useForceUpdate() {
  return useReducer(() => ({}), {})[1];
}
