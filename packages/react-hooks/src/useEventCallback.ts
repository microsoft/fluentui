import * as React from 'react';

/**
 * https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 *
 * Modified `useCallback` that can be used when dependencies change too frequently. Can occur when
 * e.g. user props are depedencies which could change on every render
 * e.g. volatile values (i.e. useState/useDispatch) are dependencies which could change frequently
 *
 * This should not be used often, but can be a useful re-render optimization since the callback is a ref and
 * will not be invalidated between rerenders
 *
 * @param fn The callback function that will be used
 * @param dependencies Shouldn't be needed, can be used if it's necessary to update the ref
 */
export const useEventCallback = <Args extends unknown[], Return>(
  fn: (...args: Args) => Return,
  dependencies: React.DependencyList = [],
) => {
  const callbackRef = React.useRef<typeof fn>(() => {
    throw new Error('Cannot call an event handler while rendering');
  });

  React.useEffect(
    () => {
      callbackRef.current = fn;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fn, ...dependencies],
  );

  return React.useCallback(
    (...args: Args) => {
      const callback = callbackRef.current;
      return callback(...args);
    },
    [callbackRef],
  );
};
