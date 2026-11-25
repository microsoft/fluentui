'use client';

import type * as React from 'react';
import { useBadgeBase_unstable } from '../Badge/index';
import type {
  CounterBadgeBaseProps,
  CounterBadgeBaseState,
  CounterBadgeProps,
  CounterBadgeState,
} from './CounterBadge.types';

/**
 * Returns the props and state required to render the component
 */
export const useCounterBadge_unstable = (props: CounterBadgeProps, ref: React.Ref<HTMLElement>): CounterBadgeState => {
  const { shape = 'circular', appearance = 'filled', color = 'brand', size = 'medium', ...counterBadgeProps } = props;

  const state = useCounterBadgeBase_unstable(counterBadgeProps, ref);

  return {
    ...state,
    shape,
    appearance,
    color,
    size,
  };
};

/**
 * Base hook for CounterBadge component, which manages state related to slots structure and counter logic.
 *
 * @param props - User provided props to the CounterBadge component.
 * @param ref - User provided ref to be passed to the CounterBadge component.
 */
export const useCounterBadgeBase_unstable = (
  props: CounterBadgeBaseProps,
  ref: React.Ref<HTMLElement>,
): CounterBadgeBaseState => {
  const { showZero = false, overflowCount = 99, count = 0, dot = false, ...badgeProps } = props;
  const badgeState = useBadgeBase_unstable(badgeProps, ref as React.Ref<HTMLDivElement>);

  const state: CounterBadgeBaseState = {
    ...badgeState,
    showZero,
    count,
    dot,
    isEmpty: !badgeState.root.children && badgeState.root.children !== 0,
  };

  if ((count !== 0 || showZero) && !dot && state.isEmpty) {
    state.root.children = count > overflowCount ? `${overflowCount}+` : `${count}`;
    state.isEmpty = false;
  }

  return state;
};
