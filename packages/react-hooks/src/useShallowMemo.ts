import * as React from 'react';
import { shallowCompare } from '@uifabric/utilities';

/**
 * Hook which evaluates the given expression only if the given deps object is shallow-different than
 * for the previous invocation of the hook.
 * This is essentially `React.useMemo`, except it shallow-compares a single deps object
 * rather than an array of deps values.
 * @public
 */
export function useShallowMemo<TValue>(getValue: () => TValue, deps: object): TValue {
  const ref = React.useRef<object>();

  const current = ref.current;

  if (current !== deps && (!current || !deps || !shallowCompare(ref.current, deps))) {
    ref.current = deps;
  }

  return React.useMemo(getValue, [ref.current]);
}
