import * as React from 'react';
import { usePresenceBadge } from './usePresenceBadge';
import { usePresenceBadgeStyles } from './usePresenceBadgeStyles';
import { renderBadge } from '../../Badge';
import type { PresenceBadgeProps } from './PresenceBadge.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled Badge, using the `useBadge` hook.
 */
export const PresenceBadge: ForwardRefComponent<PresenceBadgeProps> = React.forwardRef((props, ref) => {
  const state = usePresenceBadge(props, ref);
  usePresenceBadgeStyles(state);

  return renderBadge(state);
});

PresenceBadge.displayName = 'PresenceBadge';
