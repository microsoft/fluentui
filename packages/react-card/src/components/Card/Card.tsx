import * as React from 'react';
import { useCard } from './useCard';
import { renderCard } from './renderCard';
import { useCardStyles } from './useCardStyles';
import type { CardProps } from './Card.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Component to provide scaffolding for hosting actions and content for a single topic within a card sized object.
 */
export const Card: ForwardRefComponent<CardProps> = React.forwardRef((props, ref) => {
  const state = useCard(props, ref);

  useCardStyles(state);
  return renderCard(state);
});

Card.displayName = 'Card';
