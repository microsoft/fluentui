import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselCardButton_unstable } from './useCarouselCardButton';
import { renderCarouselCardButton_unstable } from './renderCarouselCardButton';
import { useCarouselCardButtonStyles_unstable } from './useCarouselCardButtonStyles.styles';
import type { CarouselCardButtonProps } from './CarouselCardButton.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * CarouselCardButton component - TODO: add more docs
 */
export const CarouselCardButton: ForwardRefComponent<CarouselCardButtonProps> = React.forwardRef((props, ref) => {
  const state = useCarouselCardButton_unstable(props, ref);

  useCarouselCardButtonStyles_unstable(state);
  useCustomStyleHook_unstable('useCarouselCardButtonStyles_unstable')(state);

  return renderCarouselCardButton_unstable(state);
});

CarouselCardButton.displayName = 'CarouselCardButton';
