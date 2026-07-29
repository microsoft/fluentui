'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import type { CardProps } from './Card.types';
import { useCard, useCardContextValue } from './useCard';
import { renderCard } from './renderCard';

/**
 * A card provides scaffolding for hosting actions and content for a single topic.
 */
export const Card: ForwardRefComponent<CardProps> = React.forwardRef((props, ref) => {
  const state = useCard(props, ref);
  const contextValue = useCardContextValue(state);

  return renderCard(state, contextValue);
});

Card.displayName = 'Card';
