'use client';

import * as React from 'react';
/**
 * Forces a re-render, similar to `forceUpdate` in class components.
 *
 * @internal
 */
export function useForceUpdate(): React.DispatchWithoutAction {
  return React.useReducer(x => x + 1, 0)[1];
}
