import * as React from 'react';
import { Context, ContextValue } from './types';

/**
 * @internal
 * Utility hook for contexts created by react-context-selector to determine if a parent context exists
 * WARNING: This hook will not work for native React contexts
 *
 * @param context - context created by react-context-selector
 * @returns whether the hook is wrapped by a parent context
 */
export function useHasParentContext<Value>(context: Context<Value>) {
  const contextValue = React.useContext(context as unknown as Context<ContextValue<Value>>);

  if (contextValue.version) {
    return contextValue.version.current !== -1;
  }

  return false;
}
