import * as React from 'react';
import { useCard } from './useCard';
import { renderCard } from './renderCard';
import { useCardStyles } from './useCardStyles';
import type { CardProps } from './Card.types';

/**
 * A card provides scaffolding for hosting actions and content for a single topic within a card sized object.
 */
export const Card = React.forwardRef<HTMLElement, CardProps>((props, ref) => {
  const state = useCard(props, ref);

  useCardStyles(state);
  return renderCard(state);
});

Card.displayName = 'Card';
