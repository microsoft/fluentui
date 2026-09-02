'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { CounterBadgeProps } from './CounterBadge.types';
import { renderCounterBadge } from './renderCounterBadge';
import { useCounterBadge } from './useCounterBadge';

/**
 * A headless badge for displaying a count or dot.
 */
export const CounterBadge: ForwardRefComponent<CounterBadgeProps> = React.forwardRef((props, ref) => {
  const state = useCounterBadge(props, ref);

  return renderCounterBadge(state);
});

CounterBadge.displayName = 'CounterBadge';
