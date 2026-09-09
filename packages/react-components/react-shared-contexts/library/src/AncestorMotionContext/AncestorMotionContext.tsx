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
  /** Starts a motion and returns a callback that ends it only while it remains the latest motion. */
  start: () => () => void;
};

const AncestorMotionContext = React.createContext<AncestorMotionState | undefined>(undefined);

/**
 * @internal
 */
export const createAncestorMotionController = (): AncestorMotionController => {
  let currentMotionId = 0;
  const controller: AncestorMotionController = {
    active: false,
    listeners: new Set(),
    start: () => {
      const motionId = ++currentMotionId;

      if (!controller.active) {
        controller.active = true;
        controller.listeners.forEach(listener => listener());
      }

      return () => {
        if (motionId === currentMotionId && controller.active) {
          controller.active = false;
          controller.listeners.forEach(listener => listener());
        }
      };
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
