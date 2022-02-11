import * as React from 'react';
import { useCardHeader_unstable } from './useCardHeader';
import type { CardHeaderProps } from './CardHeader.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Component to render an image, text and an action in a Card component.
 */
export const CardHeader: ForwardRefComponent<CardHeaderProps> = React.forwardRef((props, ref) => {
  const [state, render] = useCardHeader_unstable(props, ref);
  return render(state);
});

CardHeader.displayName = 'CardHeader';
