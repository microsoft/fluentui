'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderCounterBadge, useCounterBadge } from '@fluentui/react-headless-components-preview/badge';

import type { CounterBadgeProps } from './CounterBadge.types';
import { useCounterBadgeStyles } from './useCounterBadgeStyles';

/**
 * A CounterBadge displays a numeric count or a dot. Windmod CounterBadge: the headless counter
 * badge decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const CounterBadge: ForwardRefComponent<CounterBadgeProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-badge's styled useCounterBadge.
  ({ appearance = 'filled', color = 'brand', shape = 'circular', size = 'medium', ...rest }, ref) => {
    const state = useCounterBadge(rest, ref);
    const styled = useCounterBadgeStyles({
      ...state,
      appearance,
      color,
      shape,
      size,
    });

    return renderCounterBadge(styled);
  },
);

CounterBadge.displayName = 'CounterBadge';
