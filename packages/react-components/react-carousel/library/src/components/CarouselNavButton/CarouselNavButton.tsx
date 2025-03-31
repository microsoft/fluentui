import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselNavButton_unstable } from './useCarouselNavButton';
import { renderCarouselNavButton_unstable } from './renderCarouselNavButton';
import { useCarouselNavButtonStyles_unstable } from './useCarouselNavButtonStyles.styles';
import type { CarouselNavButtonProps } from './CarouselNavButton.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * The child element of CarouselNav, a singular button that will set the carousels active value on click.
 */
export const CarouselNavButton: ForwardRefComponent<CarouselNavButtonProps> = React.forwardRef((props, ref) => {
  const state = useCarouselNavButton_unstable(props, ref);

  useCarouselNavButtonStyles_unstable(state);
  useCustomStyleHook_unstable('useCarouselNavButtonStyles_unstable')(state);

  return renderCarouselNavButton_unstable(state);
});

CarouselNavButton.displayName = 'CarouselNavButton';
