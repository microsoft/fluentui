import * as React from 'react';
import { useBadge_unstable } from '../Badge/index';
import type { CounterBadgeProps, CounterBadgeState } from './CounterBadge.types';

/**
 * Returns the props and state required to render the component
 */
export const useCounterBadge_unstable = (props: CounterBadgeProps, ref: React.Ref<HTMLElement>): CounterBadgeState => {
  const {
    shape = 'circular',
    appearance = 'filled',
    showZero = false,
    overflowCount = 99,
    count = 0,
    dot = false,
  } = props;

  const state: CounterBadgeState = {
    ...(useBadge_unstable(props, ref) as CounterBadgeState),
    shape,
    appearance,
    showZero,
    count,
    dot,
  };

  if (!state.dot && !state.root.children) {
    state.root.children = state.count > overflowCount ? `${overflowCount}+` : `${state.count}`;
  }

  return state;
};
