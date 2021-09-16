import * as React from 'react';
import { useBadge } from '../Badge/index';
import type { CounterBadgeProps, CounterBadgeState } from './CounterBadge.types';

/**
 * Returns the props and state required to render the component
 */
export const useCounterBadge = (props: CounterBadgeProps, ref: React.Ref<HTMLElement>): CounterBadgeState => {
  const {
    shape = 'circular',
    appearance = 'filled',
    showZero = false,
    overflowCount = 99,
    count = 0,
    dot = false,
  } = props;

  const state: CounterBadgeState = {
    ...useBadge(props, ref),
    shape,
    appearance,
    showZero,
    overflowCount,
    count,
    dot,
  };

  if (!state.dot && !state.root.children) {
    state.root.children = state.count > state.overflowCount ? `${state.overflowCount}+` : `${state.count}`;
  }

  return state;
};
