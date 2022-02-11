import * as React from 'react';
import { usePresenceBadge_unstable } from './usePresenceBadge';
import type { PresenceBadgeProps } from './PresenceBadge.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled Badge, using the `useBadge_unstable` hook.
 */
export const PresenceBadge: ForwardRefComponent<PresenceBadgeProps> = React.forwardRef((props, ref) => {
  const [state, render] = usePresenceBadge_unstable(props, ref);
  return render(state);
});

PresenceBadge.displayName = 'PresenceBadge';
