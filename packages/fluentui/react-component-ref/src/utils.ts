import * as React from 'react';

export interface RefProps {
  children: React.ReactElement;

  /**
   * Called when a child component will be mounted or updated.
   *
   * @param node - Referred node.
   */
  innerRef: React.Ref<HTMLElement>;
}

/**
 * The function that correctly handles passing refs.
 *
 * @param ref - An ref object or function
 * @param node - A node that should be passed by ref
 */
export const handleRef = <N>(ref: React.Ref<N> | undefined, node: N) => {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof ref === 'string') {
      throw new Error(
        'We do not support refs as string, this is a legacy API and will be likely to be removed in one of the future releases of React.',
      );
    }
  }

  if (typeof ref === 'function') {
    ref(node);
    return;
  }

  if (ref !== null && typeof ref === 'object') {
    // The `current` property is defined as readonly, however it's a valid way because
    // `ref` is a mutable object
    (ref as React.MutableRefObject<N>).current = node;
  }
};

/** Checks that the passed object is a valid React ref object. */
export const isRefObject = (ref: any): ref is React.RefObject<any> =>
  // https://github.com/facebook/react/blob/v16.8.2/packages/react-reconciler/src/ReactFiberCommitWork.js#L665
  ref !== null && typeof ref === 'object' && ref.hasOwnProperty('current');

/**
 * Merges up to two React Refs into a single memoized function React Ref so you
 * can pass it to an element.
 *
 * @example
 * import React from "react";
 * import { useForkRef } from "reakit-utils";
 *
 * const Component = React.forwardRef((props, ref) => {
 *   const internalRef = React.useRef();
 *   return <div {...props} ref={useForkRef(internalRef, ref)} />;
 * });
 */
export function useForkRef(refA?: React.Ref<any>, refB?: React.Ref<any>) {
  return React.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (value: any) => {
      handleRef(refA, value);
      handleRef(refB, value);
    };
  }, [refA, refB]);
}
