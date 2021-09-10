import * as React from 'react';
import { useCardHeader } from './useCardHeader';
import { renderCardHeader } from './renderCardHeader';
import { useCardHeaderStyles } from './useCardHeaderStyles';
import type { CardHeaderProps } from './CardHeader.types';

/**
 * Component to render an image, text and an action in a Card component.
 */
export const CardHeader = React.forwardRef<HTMLElement, CardHeaderProps>((props, ref) => {
  const state = useCardHeader(props, ref);

  useCardHeaderStyles(state);
  return renderCardHeader(state);
});

CardHeader.displayName = 'CardHeader';
