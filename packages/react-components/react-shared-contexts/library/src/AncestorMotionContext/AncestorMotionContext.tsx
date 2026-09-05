'use client';

import * as React from 'react';

/**
 * @internal
 */
export type AncestorMotionState = {
  active: boolean;
  listeners: Set<() => void>;
  parent?: AncestorMotionState;
};

/**
 * @internal
 */
export type AncestorMotionController = AncestorMotionState & {
  setActive: (active: boolean) => void;
};

const AncestorMotionContext = React.createContext<AncestorMotionState | undefined>(undefined);

/**
 * @internal
 */
export const createAncestorMotionController = (): AncestorMotionController => {
  const controller: AncestorMotionController = {
    active: false,
    listeners: new Set(),
    setActive: nextActive => {
      if (controller.active !== nextActive) {
        controller.active = nextActive;
        controller.listeners.forEach(listener => listener());
      }
    },
  };

  return controller;
};

/**
 * @internal
 */
export const AncestorMotionProvider = AncestorMotionContext.Provider;

/**
 * @internal
 */
export const useAncestorMotionState = (): AncestorMotionState | undefined => React.useContext(AncestorMotionContext);
