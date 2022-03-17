import * as React from 'react';
import { useCounterBadge_unstable } from './useCounterBadge';
import { useCounterBadgeStyles_unstable } from './useCounterBadgeStyles';
import { renderBadge_unstable } from '../Badge/index';
import type { CounterBadgeProps } from './CounterBadge.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled CounterBadge, using the `useCounterBadge_unstable` hook.
 */
export const CounterBadge: ForwardRefComponent<CounterBadgeProps> = React.forwardRef((props, ref) => {
  const state = useCounterBadge_unstable(props, ref);
  useCounterBadgeStyles_unstable(state);

  return renderBadge_unstable(state);
});

CounterBadge.displayName = 'CounterBadge';
