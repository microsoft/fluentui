'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderBadge, useBadge } from '@fluentui/react-headless-components-preview/badge';

import type { BadgeProps } from './Badge.types';
import { useBadgeStyles } from './useBadgeStyles';

/**
 * A Badge is a visual decoration for UI elements. Windmod Badge: the headless badge
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Badge: ForwardRefComponent<BadgeProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-badge's styled useBadge.
  ({ appearance = 'filled', color = 'brand', shape = 'circular', size = 'medium', ...rest }, ref) => {
    return renderBadge(
      useBadgeStyles({
        ...useBadge(rest, ref),
        appearance,
        color,
        shape,
        size,
      }),
    );
    // Casting is required due to lack of distributive union to support union on @types/react
  },
) as ForwardRefComponent<BadgeProps>;

Badge.displayName = 'Badge';
