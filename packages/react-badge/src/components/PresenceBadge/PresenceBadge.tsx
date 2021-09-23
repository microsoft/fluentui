import * as React from 'react';
import { usePresenceBadge } from './usePresenceBadge';
import { usePresenceBadgeStyles } from './usePresenceBadgeStyles';
import { renderBadge } from '../../Badge';
import type { PresenceBadgeProps } from './PresenceBadge.types';

/**
 * Define a styled Badge, using the `useBadge` hook.
 */
export const PresenceBadge = React.forwardRef<HTMLElement, PresenceBadgeProps>((props, ref) => {
  const state = usePresenceBadge(props, ref);
  usePresenceBadgeStyles(state);

  return renderBadge(state);
});

PresenceBadge.displayName = 'PresenceBadge';
