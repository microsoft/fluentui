import * as React from 'react';
import { CardProps } from './Card.types';
import { useCard } from './useCard';
import { useCardStyles } from './useCardStyles';

/**
 * Define a styled Card, using the `useCard` hook.
 */
export const Card: React.FunctionComponent<CardProps & React.RefAttributes<HTMLElement>> = React.forwardRef<
  HTMLElement,
  CardProps
>((props, ref) => {
  const { render, state } = useCard(props, ref);

  useCardStyles(state);

  return render(state);
});

Card.displayName = 'Card';
