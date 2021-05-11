import * as React from 'react';
import { useFocusRects } from '@fluentui/utilities';
import { CardProps } from './Card.types';
import { useCard } from './useCard';
import { useCardStyles } from './useCardStyles';

/**
 * Define a styled Card, using the `useCard` hook.
 */
export const Card: React.FunctionComponent<CardProps> = React.forwardRef<HTMLElement, CardProps>((props, ref) => {
  const { render, state } = useCard(props, ref);

  useCardStyles(state);
  useFocusRects(state.ref);

  return render(state);
});

Card.displayName = 'Card';
