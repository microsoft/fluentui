import * as React from 'react';
import { useSSRContext } from '../ssr/index';

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
