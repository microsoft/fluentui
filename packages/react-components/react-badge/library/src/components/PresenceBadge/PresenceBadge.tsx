import * as React from 'react';
import { usePresenceBadge_unstable } from './usePresenceBadge';
import { usePresenceBadgeStyles_unstable } from './usePresenceBadgeStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { renderBadge_unstable } from '../../Badge';
import type { PresenceBadgeProps } from './PresenceBadge.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled Badge, using the `useBadge_unstable` hook.
 */
export const PresenceBadge: ForwardRefComponent<PresenceBadgeProps> = React.forwardRef((props, ref) => {
  const state = usePresenceBadge_unstable(props, ref);

  usePresenceBadgeStyles_unstable(state);

  useCustomStyleHook_unstable('usePresenceBadgeStyles_unstable')(state);

  return renderBadge_unstable(state);
});

PresenceBadge.displayName = 'PresenceBadge';
