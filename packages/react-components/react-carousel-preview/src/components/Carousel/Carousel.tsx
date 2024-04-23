import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarousel_unstable } from './useCarousel';
import { renderCarousel_unstable } from './renderCarousel';
import { useCarouselStyles_unstable } from './useCarouselStyles.styles';
import type { CarouselProps } from './Carousel.types';

/**
 * Carousel component - TODO: add more docs
 */
export const Carousel: ForwardRefComponent<CarouselProps> = React.forwardRef((props, ref) => {
  const state = useCarousel_unstable(props, ref);

  useCarouselStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useCarouselStyles_unstable')(state);
  return renderCarousel_unstable(state);
});

Carousel.displayName = 'Carousel';
