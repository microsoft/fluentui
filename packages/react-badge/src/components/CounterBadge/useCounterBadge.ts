import * as React from 'react';
import { makeMergePropsCompat } from '@fluentui/react-utilities';
import { CounterBadgeProps, CounterBadgeState } from './CounterBadge.types';
import { useBadge, BadgeProps } from '../Badge/index';

/**
 * Consts listing which props are shorthand props.
 */
export const counterBadgeShorthandPropsCompat = ['icon'] as const;

// eslint-disable-next-line deprecation/deprecation
const mergeProps = makeMergePropsCompat<CounterBadgeState>({ deepMerge: counterBadgeShorthandPropsCompat });

/**
 * Returns the props and state required to render the component
 */
export const useCounterBadge = (
  props: CounterBadgeProps,
  ref: React.Ref<HTMLElement>,
  defaultProps?: CounterBadgeProps,
): CounterBadgeState => {
  const state = useBadge(
    props,
    ref,
    mergeProps(
      {
        showZero: false,
        overflowCount: 99,
        count: 0,
        dot: false,
      },
      defaultProps,
    ) as BadgeProps,
  ) as CounterBadgeState;

  if (!state.dot && !state.children) {
    state.children = state.count > state.overflowCount ? `${state.overflowCount}+` : `${state.count}`;
  }

  return state;
};
