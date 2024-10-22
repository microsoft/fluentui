import * as React from 'react';

type ReactModule = typeof React;

type ReactFiberNode = object;

interface ReactModuleV18WithInternals extends ReactModule {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    ReactCurrentOwner: React.RefObject<ReactFiberNode>;
  };
}
interface ReactModuleV19WithInternals extends ReactModule {
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE: {
    A: { getOwner: () => ReactFiberNode | null } | null;
  };
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
    const currentOwner = getCurrentOwner();

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

/**
 * @internal
 *
 * @returns Current react fiber being rendered
 */
const getCurrentOwner = (): ReactFiberNode | null => {
  try {
    // React 19
    return (
      (
        React as ReactModuleV19WithInternals
      ).__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE.A?.getOwner() ?? null
    );
  } catch {
    /** noop */
  }

  try {
    // React <=18
    return (React as ReactModuleV18WithInternals).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner
      .current;
  } catch {
    /** noop */
  }

  return null;
};
