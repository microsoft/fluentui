import * as React from 'react';
import { BadgeProps } from './Badge.types';
import { useBadge } from './useBadge';
import { useBadgeStyles } from './useBadgeStyles';
import { renderBadge } from './renderBadge';

export const Badge = React.forwardRef<HTMLElement, BadgeProps>((props, ref) => {
  const state = useBadge(props, ref);
  useBadgeStyles(state);

  return renderBadge(state);
});
