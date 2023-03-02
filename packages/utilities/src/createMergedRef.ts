import * as React from 'react';
import { arraysEqual } from './array';

/**
 * Internal state type for the ref.
 */
type LocalState<TType, TValue> = {
  refs: (React.Ref<TType | null | TValue> | undefined)[];
  resolver?: (newValue: TType | TValue | null) => void;
};

/**
 * Set up a ref resolver function given internal state managed for the ref.
 * @param local Set
 */
const createResolver =
  <TType, TValue>(local: LocalState<TType, TValue>) =>
  (newValue: TType | TValue | null) => {
    for (const ref of local.refs) {
      if (typeof ref === 'function') {
        ref(newValue);
      } else if (ref) {
        // work around the immutability of the React.Ref type
        (ref as unknown as React.MutableRefObject<TType | TValue | null | undefined>).current = newValue;
      }
    }
  };

/**
 * Helper to merge refs from within class components.
 */
export const createMergedRef = <TType, TValue = null>(value?: TValue) => {
  const local: LocalState<TType, TValue> = {
    refs: [] as LocalState<TType, TValue>['refs'],
  };

  return (
    ...newRefs: (React.Ref<TType | null | TValue> | undefined)[]
  ): ((newValue: TType | TValue | null) => void) => {
    if (!local.resolver || !arraysEqual(local.refs, newRefs)) {
      local.resolver = createResolver<TType, TValue>(local);
    }

    local.refs = newRefs;

    return local.resolver!;
  };
};
