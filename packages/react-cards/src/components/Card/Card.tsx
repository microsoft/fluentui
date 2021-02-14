import * as React from 'react';
import { useInlineTokens } from '@fluentui/react-theme-provider/lib/compat/index';
import { useFocusRects } from '@fluentui/utilities';
import { CardProps } from './Card.types';
import { useCard } from './useCard';
import { useCardClasses } from './useCardClasses';

/**
 * Define a styled Card, using the `useCard` hook.
 */
export const Card = React.forwardRef<HTMLElement, CardProps>((props, ref) => {
  const { render, state } = useCard(props, ref);

  useCardClasses(state);
  useFocusRects(state.ref);
  useInlineTokens(state, '--card');

  return render(state);
});

Card.displayName = 'Card';
