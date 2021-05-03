import * as React from 'react';
import { PresenceBadgeProps } from './PresenceBadge.types';
import { usePresenceBadge } from './usePresenceBadge';
import { usePresenceBadgeStyles } from './usePresenceBadgeStyles';
import { renderBadge } from '../../Badge';

/**
 * Define a styled Badge, using the `useBadge` hook.
 * {@docCategory Badge}
 */
export const PresenceBadge = React.forwardRef<HTMLElement, PresenceBadgeProps>((props, ref) => {
  const state = usePresenceBadge(props, ref);
  usePresenceBadgeStyles(state);

  return renderBadge(state);
});

PresenceBadge.displayName = 'PresenceBadge';
