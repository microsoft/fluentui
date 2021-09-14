import * as React from 'react';
import { useCardFooter } from './useCardFooter';
import { renderCardFooter } from './renderCardFooter';
import { useCardFooterStyles } from './useCardFooterStyles';
import type { CardFooterProps } from './CardFooter.types';

/**
 * Component to render Button actions in a Card component.
 */
export const CardFooter = React.forwardRef<HTMLElement, CardFooterProps>((props, ref) => {
  const state = useCardFooter(props, ref);

  useCardFooterStyles(state);
  return renderCardFooter(state);
});

CardFooter.displayName = 'CardFooter';
