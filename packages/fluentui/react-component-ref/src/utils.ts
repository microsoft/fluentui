import * as React from 'react';

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
