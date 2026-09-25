'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { CardProps } from './Card.types';
import { renderCard } from './renderCard';
import { useCard, useCardContextValue } from './useCard';
import { useCardStyles } from './useCardStyles.styles';

/**
 * A card provides scaffolding for hosting actions and content for a single topic.
 */
export const Card: ForwardRefComponent<CardProps> = React.forwardRef((props, ref) => {
  const state = useCard(props, ref);
  const contextValue = useCardContextValue(state);

  useCardStyles(state);
  return renderCard(state, contextValue);
});

Card.displayName = 'Card';
