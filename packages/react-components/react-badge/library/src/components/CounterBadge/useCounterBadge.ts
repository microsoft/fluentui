'use client';

import * as React from 'react';
import type { BadgeState } from '../Badge/index';
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
  const {
    shape = 'circular',
    appearance = 'filled',
    color = 'brand',
    size = 'medium',
    ...counterBadgeProps
  } = props;

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
  const {
    showZero = false,
    overflowCount = 99,
    count = 0,
    dot = false,
    ...badgeProps
  } = props;

  const state: CounterBadgeBaseState = {
    ...(useBadgeBase_unstable(badgeProps, ref) as Pick<CounterBadgeBaseState, keyof Omit<BadgeState, 'appearance' | 'color' | 'shape' | 'size'>>),
    showZero,
    count,
    dot,
  };

  if ((count !== 0 || showZero) && !dot && !state.root.children) {
    state.root.children = count > overflowCount ? `${overflowCount}+` : `${count}`;
  }

  return state;
};
