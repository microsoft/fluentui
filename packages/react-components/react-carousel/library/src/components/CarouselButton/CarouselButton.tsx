import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselButton_unstable } from './useCarouselButton';
import { renderCarouselButton_unstable } from './renderCarouselButton';
import { useCarouselButtonStyles_unstable } from './useCarouselButtonStyles.styles';
import type { CarouselButtonProps } from './CarouselButton.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * A default navigation button that will set value to the next/previous page,
 * driven by it's type 'next' or 'previous'.
 */
export const CarouselButton: ForwardRefComponent<CarouselButtonProps> = React.forwardRef((props, ref) => {
  const state = useCarouselButton_unstable(props, ref);

  useCarouselButtonStyles_unstable(state);
  useCustomStyleHook_unstable('useCarouselButtonStyles_unstable')(state);

  return renderCarouselButton_unstable(state);
});

CarouselButton.displayName = 'CarouselButton';
