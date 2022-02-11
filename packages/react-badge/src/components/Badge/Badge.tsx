import * as React from 'react';
import { useBadge_unstable } from './useBadge';
import type { BadgeProps } from './Badge.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled Badge, using the `useBadge_unstable` hook.
 */
export const Badge: ForwardRefComponent<BadgeProps> = React.forwardRef((props, ref) => {
  const [state, render] = useBadge_unstable(props, ref);
  return render(state);
});

Badge.displayName = 'Badge';
