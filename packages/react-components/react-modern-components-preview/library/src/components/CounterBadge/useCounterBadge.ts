'use client';

import type * as React from 'react';
import { useCounterBadge as useCounterBadgeBase } from '@fluentui/react-headless-components-preview/badge';
import type { CounterBadgeProps, CounterBadgeState } from './CounterBadge.types';

export const useCounterBadge = (props: CounterBadgeProps, ref: React.Ref<HTMLDivElement>): CounterBadgeState => {
  const { appearance = 'filled', color = 'brand', shape = 'circular', size = 'medium', ...rest } = props;
  const state = useCounterBadgeBase(rest, ref);

  return {
    ...state,
    root: {
      ...state.root,
      'data-appearance': appearance,
      'data-color': color,
      'data-shape': shape,
      'data-size': size,
    },
    appearance,
    color,
    shape,
    size,
  };
};
