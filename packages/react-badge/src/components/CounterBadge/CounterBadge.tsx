import * as React from 'react';
import { CounterBadgeProps } from './CounterBadge.types';
import { useCounterBadge } from './useCounterBadge';
import { useCounterBadgeStyles } from './useCounterBadgeStyles';
import { renderBadge } from '../Badge/index';

/**
 * Define a styled CounterBadge, using the `useCounterBadge` hook.
 * {@docCategory CounterBadge}
 */
export const CounterBadge = React.forwardRef<HTMLElement, CounterBadgeProps>((props, ref) => {
  const state = useCounterBadge(props, ref);
  useCounterBadgeStyles(state);

  return renderBadge(state);
});

CounterBadge.displayName = 'CounterBadge';
