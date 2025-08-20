import * as React from 'react';

/**
 * A Ref function which can be treated like a ref object in that it has an attached
 * current property, which will be updated as the ref is evaluated.
 */
export type RefObjectFunction<T> = React.RefObject<T | null> & ((value: T | null) => void);

/** @internal */
type MutableRefObjectFunction<T> = React.MutableRefObject<T | null> & ((value: T | null) => void);

/**
 * React hook to merge multiple React refs (either MutableRefObjects or ref callbacks) into a single ref callback that
 * updates all provided refs
 * @param refs - Refs to collectively update with one ref value.
 * @returns A function with an attached "current" prop, so that it can be treated like a RefObject.
 */
// LegacyRef is actually not supported, but in React v18 types this is leaking directly from forwardRef component declaration
export function useMergedRefs<T>(...refs: (React.Ref<T> | undefined)[]): RefObjectFunction<T> {
  'use no memo';

  const mergedCallback = React.useCallback(
    (value: T | null) => {
      // Update the "current" prop hanging on the function.
      mergedCallback.current = value;

      for (const ref of refs) {
        if (typeof ref === 'string' && process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error(/** #__DE-INDENT__ */ `
            @fluentui/react-utilities [useMergedRefs]:
            This hook does not support the usage of string refs. Please use React.useRef instead.

            For more info on 'React.useRef', see https://react.dev/reference/react/useRef.
            For more info on string refs, see https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-string-refs.
          `);
        }
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref) {
          // work around the immutability of the React.Ref type
          (ref as React.MutableRefObject<T | null>).current = value;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- already exhaustive
    [...refs],
  ) as MutableRefObjectFunction<T>;

  return mergedCallback;
}
