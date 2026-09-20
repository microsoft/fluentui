'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useBadge } from './useBadge';
import { renderBadge } from './renderBadge';
import { useBadgeStyles } from './useBadgeStyles.styles';
import type { BadgeProps } from './Badge.types';

/**
 * A badge is a compact element that represents a status, attribute, or value.
 */
export const Badge: ForwardRefComponent<BadgeProps> = React.forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  const state = useBadge(props, ref);

  useBadgeStyles(state);

  return renderBadge(state);
});

Badge.displayName = 'Badge';
