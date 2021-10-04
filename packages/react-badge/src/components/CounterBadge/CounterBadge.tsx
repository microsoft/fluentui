import * as React from 'react';
import { useCounterBadge } from './useCounterBadge';
import { useCounterBadgeStyles } from './useCounterBadgeStyles';
import { renderBadge } from '../Badge/index';
import type { CounterBadgeProps } from './CounterBadge.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled CounterBadge, using the `useCounterBadge` hook.
 */
export const CounterBadge: ForwardRefComponent<CounterBadgeProps> = React.forwardRef((props, ref) => {
  const state = useCounterBadge(props, ref);
  useCounterBadgeStyles(state);

  return renderBadge(state);
});

CounterBadge.displayName = 'CounterBadge';
