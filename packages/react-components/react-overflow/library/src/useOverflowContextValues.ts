'use client';

import * as React from 'react';
import type { OverflowContextValue } from './overflowContext';
import type { OverflowComponentState, OverflowContextValues } from './components/Overflow/Overflow.types';

/**
 * Assembles the overflow context values provided to descendants, from the state returned by
 * {@link useOverflow_unstable}.
 *
 * @internal
 */
export const useOverflowContextValues_unstable = (state: OverflowComponentState): OverflowContextValues => {
  const {
    registerItem,
    registerDivider,
    registerOverflowMenu,
    updateOverflow,
    forceUpdateOverflow,
    containerRef,
    getSnapshot,
    subscribe,
  } = state;

  const overflow = React.useMemo<OverflowContextValue>(
    () => ({
      groupVisibility: {},
      itemVisibility: {},
      hasOverflow: false,
      registerItem,
      registerDivider,
      registerOverflowMenu,
      updateOverflow,
      forceUpdateOverflow,
      containerRef,
      getSnapshot,
      subscribe,
    }),
    [
      registerItem,
      registerDivider,
      registerOverflowMenu,
      updateOverflow,
      forceUpdateOverflow,
      containerRef,
      getSnapshot,
      subscribe,
    ],
  );

  return { overflow };
};
