import * as React from 'react';
/**
 * @internal
 * Forces a re-render, similar to `forceUpdate` in class components.
 */
export function useForceUpdate(): React.DispatchWithoutAction {
  return React.useReducer(x => x + 1, 0)[1];
}
