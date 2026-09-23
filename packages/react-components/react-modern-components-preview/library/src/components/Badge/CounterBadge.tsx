'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CounterBadgeProps } from './CounterBadge.types';
import { renderCounterBadge } from './renderCounterBadge';
import { useCounterBadge } from './useCounterBadge';
import { useCounterBadgeStyles } from './useCounterBadgeStyles.styles';

export const CounterBadge: ForwardRefComponent<CounterBadgeProps> = React.forwardRef((props, ref) => {
  const state = useCounterBadge(props, ref);
  useCounterBadgeStyles(state);
  return renderCounterBadge(state);
});

CounterBadge.displayName = 'CounterBadge';
