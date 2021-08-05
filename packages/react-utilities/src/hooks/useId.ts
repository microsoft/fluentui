import * as React from 'react';
import { defaultSSRContextValue, useSSRContext } from '../ssr/index';

/**
 * Resets generated IDs, should be used only in tests.
 *
 * @private
 */
export function resetIdsForTests(): void {
  defaultSSRContextValue.current = 0;
}

/**
 * Hook to generate a unique ID.
 *
 * @param prefix - Optional prefix for the ID
 * @param providedId - Optional id provided by a parent component. Defaults to the provided value if present,
 *  without conditioning the hook call
 * @returns The ID
 */
export function useId(prefix?: string, providedId?: string): string {
  const contextValue = useSSRContext();

  return React.useMemo(() => providedId || `${prefix}${++contextValue.current}`, [prefix, providedId, contextValue]);
}
