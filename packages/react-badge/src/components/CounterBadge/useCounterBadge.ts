import * as React from 'react';
import { useBadge_unstable, renderBadge_unstable } from '../Badge/index';
import type { CounterBadgeProps, CounterBadgeState, CounterBadgeRender } from './CounterBadge.types';

/**
 * Returns the props and state required to render the component
 */
export const useCounterBadge_unstable = (
  props: CounterBadgeProps,
  ref: React.Ref<HTMLElement>,
): [CounterBadgeState, CounterBadgeRender] => {
  const {
    shape = 'circular',
    appearance = 'filled',
    showZero = false,
    overflowCount = 99,
    count = 0,
    dot = false,
  } = props;

  const [badgeState] = useBadge_unstable(props, ref);

  const state: CounterBadgeState = {
    ...(badgeState as CounterBadgeState),
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

  return [state, renderBadge_unstable];
};
