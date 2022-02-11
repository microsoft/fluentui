import * as React from 'react';
import { useCardFooter_unstable } from './useCardFooter';
import type { CardFooterProps } from './CardFooter.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Component to render Button actions in a Card component.
 */
export const CardFooter: ForwardRefComponent<CardFooterProps> = React.forwardRef((props, ref) => {
  const [state, render] = useCardFooter_unstable(props, ref);
  return render(state);
});

CardFooter.displayName = 'CardFooter';
