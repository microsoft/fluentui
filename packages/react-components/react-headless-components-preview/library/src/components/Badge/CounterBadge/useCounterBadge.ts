'use client';

import type * as React from 'react';
import { useCounterBadgeBase_unstable } from '@fluentui/react-badge';

import { toDataAttributeValue } from '../../../utils';
import type { CounterBadgeProps, CounterBadgeState } from './CounterBadge.types';

/**
 * Returns the state for a CounterBadge component, given its props and ref.
 * The returned state can be modified with hooks before being passed to `renderCounterBadge`.
 */
export const useCounterBadge = (props: CounterBadgeProps, ref: React.Ref<HTMLDivElement>): CounterBadgeState => {
  const state = useCounterBadgeBase_unstable(props, ref);
  const overflowCount = props.overflowCount ?? 99;

  return {
    ...state,
    root: {
      ...state.root,
      'data-count': String(state.count),
      'data-dot': toDataAttributeValue(state.dot),
      'data-hidden': toDataAttributeValue(!state.root.children && state.root.children !== 0 && !state.dot),
      'data-overflowed': toDataAttributeValue(state.count > overflowCount),
    },
  };
};
