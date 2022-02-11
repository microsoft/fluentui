import * as React from 'react';
import { useCounterBadge_unstable } from './useCounterBadge';
import type { CounterBadgeProps } from './CounterBadge.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled CounterBadge, using the `useCounterBadge_unstable` hook.
 */
export const CounterBadge: ForwardRefComponent<CounterBadgeProps> = React.forwardRef((props, ref) => {
  const [state, render] = useCounterBadge_unstable(props, ref);
  return render(state);
});

CounterBadge.displayName = 'CounterBadge';
