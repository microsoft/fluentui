import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarousel_unstable } from './useCarousel';
import { renderCarousel_unstable } from './renderCarousel';
import { useCarouselStyles_unstable } from './useCarouselStyles.styles';
import type { CarouselProps } from './Carousel.types';
import { useCarouselContextValues_unstable } from './useCarouselContextValues';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * Carousel is the context wrapper and container for all carousel content/controls,
 * it has no direct style or slot opinions.
 *
 * Carousel also provides API interfaces for callbacks that will occur on navigation events.
 */
export const Carousel: ForwardRefComponent<CarouselProps> = React.forwardRef((props, ref) => {
  const state = useCarousel_unstable(props, ref);

  useCarouselStyles_unstable(state);
  useCustomStyleHook_unstable('useCarouselStyles_unstable')(state);

  const contextValues = useCarouselContextValues_unstable(state);

  return renderCarousel_unstable(state, contextValues);
});

Carousel.displayName = 'Carousel';
