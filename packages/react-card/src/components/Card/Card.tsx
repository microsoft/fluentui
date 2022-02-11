import * as React from 'react';
import { useCard_unstable } from './useCard';
import type { CardProps } from './Card.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * A card provides scaffolding for hosting actions and content for a single topic.
 */
export const Card: ForwardRefComponent<CardProps> = React.forwardRef((props, ref) => {
  const [state, render] = useCard_unstable(props, ref);
  return render(state);
});

Card.displayName = 'Card';
