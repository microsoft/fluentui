'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderCard, useCard, useCardContextValue } from '@fluentui/react-headless-components-preview/card';

import type { CardProps } from './Card.types';
import { useCardStyles } from './useCardStyles';

/**
 * Cards are used to group similar concepts and tasks. Windmod Card: the headless card
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Card: ForwardRefComponent<CardProps> = React.forwardRef(
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-card's styled useCard.
  ({ appearance = 'filled', orientation = 'vertical', size = 'medium', ...rest }, ref) => {
    // The context value is built from the styled state, and renderCard requires it.
    const state = useCard(rest, ref as React.Ref<HTMLDivElement>);
    const styled = useCardStyles({
      ...state,
      appearance,
      orientation,
      size,
    });

    const context = useCardContextValue(styled);

    return renderCard(styled, context);
  },
);

Card.displayName = 'Card';
