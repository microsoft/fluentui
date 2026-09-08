'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { BadgeProps } from './Badge.types';
import { useBadge } from './useBadge';
import { renderBadge } from './renderBadge';

/**
 * A badge component for displaying counts or labels.
 */
export const Badge: ForwardRefComponent<BadgeProps> = React.forwardRef((props, ref) => {
  const state = useBadge(props, ref);

  return renderBadge(state);
});

Badge.displayName = 'Badge';
