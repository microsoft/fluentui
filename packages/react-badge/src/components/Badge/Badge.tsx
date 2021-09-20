import * as React from 'react';
import { useBadge } from './useBadge';
import { useBadgeStyles } from './useBadgeStyles';
import { renderBadge } from './renderBadge';
import type { BadgeProps } from './Badge.types';

/**
 * Define a styled Badge, using the `useBadge` hook.
 */
export const Badge: React.FunctionComponent<BadgeProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  BadgeProps
>((props, ref) => {
  const state = useBadge(props, ref);
  useBadgeStyles(state);

  return renderBadge(state);
});

Badge.displayName = 'Badge';
