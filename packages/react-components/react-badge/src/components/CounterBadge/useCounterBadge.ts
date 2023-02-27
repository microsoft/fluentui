import * as React from 'react';
import type { BadgeState } from '../Badge/index';
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
    ...(useBadge_unstable(props, ref) as Pick<CounterBadgeState, keyof BadgeState>),
    shape,
    appearance,
    showZero,
    count,
    dot,
  };

  if ((count !== 0 || showZero) && !dot && !state.root.children) {
    state.root.children = count > overflowCount ? `${overflowCount}+` : `${count}`;
  }

  return state;
};
