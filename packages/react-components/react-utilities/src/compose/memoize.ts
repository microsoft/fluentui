import * as React from 'react';

type ReactFiberNode = object;

interface ReactInternals {
  ReactCurrentOwner: React.RefObject<ReactFiberNode>;
}
type ReactModule = typeof React;
interface ReactModuleWithInternals extends ReactModule {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactInternals;
}

interface Memoized<V> {
  readonly value: V;
  readonly deps: readonly unknown[];
}

const isDepsEqual = (a: readonly unknown[], b: readonly unknown[]): boolean =>
  a.length === b.length && a.every((value, index) => value === b[index]);

/**
 * @internal
 */
export const createMemoize = <V>() => {
  const memoizationMap = new WeakMap<ReactFiberNode, Memoized<V>>();
  const memoize = (init: () => V, deps: React.DependencyList): V => {
    const currentOwner = (React as ReactModuleWithInternals).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
      .ReactCurrentOwner.current;

    if (currentOwner === null) {
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.error(/** #__DE-INDENT__ */ `
        @fluentui/react-utilities [slot]:
        slot method was called outside of a component render.
      `);
      }
      return init();
    }

    let memoizedValue = memoizationMap.get(currentOwner);
    if (!memoizedValue || !isDepsEqual(memoizedValue.deps, deps)) {
      memoizedValue = { value: init(), deps };
      memoizationMap.set(currentOwner, memoizedValue);
    }
    return memoizedValue.value;
  };
  return memoize;
};
