import * as React from 'react';
import { useCard_unstable } from './useCard';
import { renderCard_unstable } from './renderCard';
import { useCardStyles_unstable } from './useCardStyles.styles';
import type { CardProps } from './Card.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCardContextValue } from './useCardContextValue';

/**
 * A card provides scaffolding for hosting actions and content for a single topic.
 */
export const Card: ForwardRefComponent<CardProps> = React.forwardRef<HTMLDivElement>((props, ref) => {
  const state = useCard_unstable(props, ref);
  const cardContextValue = useCardContextValue(state);

  useCardStyles_unstable(state);
  return renderCard_unstable(state, cardContextValue);
});

Card.displayName = 'Card';
