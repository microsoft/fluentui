import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useCarouselSlider_unstable } from './useCarouselSlider';
import { renderCarouselSlider_unstable } from './renderCarouselSlider';
import { useCarouselSliderStyles_unstable } from './useCarouselSliderStyles.styles';
import type { CarouselSliderProps } from './CarouselSlider.types';
import { useCarouselSliderContextValues_unstable } from './CarouselSliderContext';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * CarouselSlider component - The viewport window that CarouselCards are contained within.
 */
export const CarouselSlider: ForwardRefComponent<CarouselSliderProps> = React.forwardRef((props, ref) => {
  const state = useCarouselSlider_unstable(props, ref);

  useCarouselSliderStyles_unstable(state);
  useCustomStyleHook_unstable('useCarouselSliderStyles_unstable')(state);

  const context = useCarouselSliderContextValues_unstable(state);
  return renderCarouselSlider_unstable(state, context);
});

CarouselSlider.displayName = 'CarouselSlider';
