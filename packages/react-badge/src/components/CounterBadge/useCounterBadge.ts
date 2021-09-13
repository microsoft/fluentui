import * as React from 'react';
import { useBadge } from '../Badge/index';
import type { CounterBadgeProps, CounterBadgeState } from './CounterBadge.types';
import { BadgeState } from '../Badge/index';

/**
 * Returns the props and state required to render the component
 */
export const useCounterBadge = (props: CounterBadgeProps, ref: React.Ref<HTMLElement>): CounterBadgeState => {
  const state: CounterBadgeState = {
    ...(useBadge(props, ref) as Omit<BadgeState, 'shape' | 'appearance'> &
      Pick<CounterBadgeState, 'shape' | 'appearance'>),
    showZero: props.showZero ?? false,
    overflowCount: props.overflowCount ?? 99,
    count: props.count ?? 0,
    dot: props.dot ?? false,
  };

  if (!state.dot && !state.root.children) {
    state.root.children = state.count > state.overflowCount ? `${state.overflowCount}+` : `${state.count}`;
  }

  return state;
};
