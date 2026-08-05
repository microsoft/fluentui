'use client';

import * as React from 'react';

/**
 * @internal
 */
export type AncestorMotionState = {
  getSnapshot: () => boolean;
  subscribe: (listener: () => void) => () => void;
};

/**
 * @internal
 */
export type AncestorMotionController = AncestorMotionState & {
  setActive: (active: boolean) => void;
};

const inactiveMotionState: AncestorMotionState = {
  getSnapshot: () => false,
  subscribe: () => () => undefined,
};

const AncestorMotionContext = React.createContext<AncestorMotionState | undefined>(undefined);

/**
 * @internal
 */
export const createAncestorMotionController = (): AncestorMotionController => {
  let active = false;
  const listeners = new Set<() => void>();

  return {
    getSnapshot: () => active,
    subscribe: listener => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setActive: nextActive => {
      if (active !== nextActive) {
        active = nextActive;
        listeners.forEach(listener => listener());
      }
    },
  };
};

/**
 * @internal
 */
export const AncestorMotionProvider = (props: {
  value: AncestorMotionState;
  children: React.ReactNode;
}): React.ReactElement => {
  const ancestorState = React.useContext(AncestorMotionContext) ?? inactiveMotionState;
  const value = React.useMemo<AncestorMotionState>(
    () => ({
      getSnapshot: () => ancestorState.getSnapshot() || props.value.getSnapshot(),
      subscribe: listener => {
        const unsubscribeAncestor = ancestorState.subscribe(listener);
        const unsubscribeCurrent = props.value.subscribe(listener);

        return () => {
          unsubscribeAncestor();
          unsubscribeCurrent();
        };
      },
    }),
    [ancestorState, props.value],
  );

  return <AncestorMotionContext.Provider value={value}>{props.children}</AncestorMotionContext.Provider>;
};

/**
 * @internal
 */
export const useAncestorMotionState = (): AncestorMotionState =>
  React.useContext(AncestorMotionContext) ?? inactiveMotionState;
