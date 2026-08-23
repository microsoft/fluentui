'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { renderCard, useCard, useCardContextValue } from '@fluentui/react-headless-components-preview/card';

import type { CardProps, CardState } from './Card.types';
import { useCardStyles } from './useCardStyles';

/**
 * Cards are used to group similar concepts and tasks. Windmod Card: the headless card
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const Card: ForwardRefComponent<CardProps> = React.forwardRef((props, ref) => {
  // Look props belong to windmod — the headless hook neither accepts nor resolves them.
  // Defaults mirror @fluentui/react-card's styled useCard.
  const { appearance = 'filled', orientation = 'vertical', size = 'medium', ...rest } = props;

  const state: CardState = {
    ...useCard(rest, ref as React.Ref<HTMLDivElement>),
    appearance,
    orientation,
    size,
  };

  // The context value is built from the styled state, and renderCard requires it.
  const styled = useCardStyles(state);

  return renderCard(styled, useCardContextValue(styled));
  // Casting is required due to lack of distributive union to support union on @types/react
}) as ForwardRefComponent<CardProps>;

Card.displayName = 'Card';
