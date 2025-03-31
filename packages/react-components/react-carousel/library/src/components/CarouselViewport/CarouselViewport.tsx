import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselViewport_unstable } from './useCarouselViewport';
import { renderCarouselViewport_unstable } from './renderCarouselViewport';
import { useCarouselViewportStyles_unstable } from './useCarouselViewportStyles.styles';
import type { CarouselViewportProps } from './CarouselViewport.types';
import { useCarouselSliderContextValues_unstable } from '../CarouselSlider/CarouselSliderContext';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * CarouselViewport component - TODO: add more docs
 */
export const CarouselViewport: ForwardRefComponent<CarouselViewportProps> = React.forwardRef((props, ref) => {
  const state = useCarouselViewport_unstable(props, ref);

  useCarouselViewportStyles_unstable(state);
  useCustomStyleHook_unstable('useCarouselViewportStyles_unstable')(state);

  const context = useCarouselSliderContextValues_unstable(state);

  return renderCarouselViewport_unstable(state, context);
});

CarouselViewport.displayName = 'CarouselViewport';
