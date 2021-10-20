import * as React from 'react';
import { useBadge } from './useBadge';
import { useBadgeStyles } from './useBadgeStyles';
import { renderBadge } from './renderBadge';
import type { BadgeProps } from './Badge.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled Badge, using the `useBadge` hook.
 */
export const Badge: ForwardRefComponent<BadgeProps> = React.forwardRef((props, ref) => {
  const state = useBadge(props, ref);
  useBadgeStyles(state);

  return renderBadge(state);
});

Badge.displayName = 'Badge';
