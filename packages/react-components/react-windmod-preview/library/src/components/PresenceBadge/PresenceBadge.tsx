'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderPresenceBadge, usePresenceBadge } from '@fluentui/react-headless-components-preview/badge';

import { presenceGlyph } from './presenceGlyphs';
import type { PresenceBadgeProps, PresenceBadgeState } from './PresenceBadge.types';
import { usePresenceBadgeStyles } from './usePresenceBadgeStyles';

/**
 * A PresenceBadge shows a person's presence status. Windmod PresenceBadge: the headless
 * presence badge decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const PresenceBadge: ForwardRefComponent<PresenceBadgeProps> = React.forwardRef(
  // size is a look prop — the headless hook neither accepts nor resolves it.
  ({ size = 'medium', ...rest }, ref) => {
    const state = usePresenceBadge(rest, ref);

    // The headless icon slot always exists (renderByDefault); the headless surface ships no
    // glyph of its own, so windmod restores the Fluent default in a new state object, never on
    // the one the hook returned. Consumer children always win.
    const base: PresenceBadgeState = {
      ...state,
      icon: state.icon && {
        ...state.icon,
        children: state.icon.children ?? presenceGlyph(state.status, state.outOfOffice, size),
      },
      size,
    };

    const styled = usePresenceBadgeStyles(base);

    return renderPresenceBadge(styled);
  },
);

PresenceBadge.displayName = 'PresenceBadge';
