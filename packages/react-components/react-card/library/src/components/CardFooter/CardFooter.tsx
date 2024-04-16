import * as React from 'react';
import { useCardFooter_unstable } from './useCardFooter';
import { renderCardFooter_unstable } from './renderCardFooter';
import { useCardFooterStyles_unstable } from './useCardFooterStyles.styles';
import type { CardFooterProps } from './CardFooter.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Component to render Button actions in a Card component.
 */
export const CardFooter: ForwardRefComponent<CardFooterProps> = React.forwardRef((props, ref) => {
  const state = useCardFooter_unstable(props, ref);

  useCardFooterStyles_unstable(state);
  return renderCardFooter_unstable(state);
});

CardFooter.displayName = 'CardFooter';
