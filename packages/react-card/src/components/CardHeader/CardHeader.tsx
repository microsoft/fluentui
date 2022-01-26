import * as React from 'react';
import { useCardHeader_unstable } from './useCardHeader';
import { renderCardHeader_unstable } from './renderCardHeader';
import { useCardHeaderStyles_unstable } from './useCardHeaderStyles';
import type { CardHeaderProps } from './CardHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Component to render an image, text and an action in a Card component.
 */
export const CardHeader: ForwardRefComponent<CardHeaderProps> = React.forwardRef((props, ref) => {
  const state = useCardHeader_unstable(props, ref);

  useCardHeaderStyles_unstable(state);
  return renderCardHeader_unstable(state);
});

CardHeader.displayName = 'CardHeader';
