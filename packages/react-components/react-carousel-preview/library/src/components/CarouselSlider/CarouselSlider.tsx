import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
// import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useCarouselSlider_unstable } from './useCarouselSlider';
import { renderCarouselSlider_unstable } from './renderCarouselSlider';
import { useCarouselSliderStyles_unstable } from './useCarouselSliderStyles.styles';
import type { CarouselSliderProps } from './CarouselSlider.types';
import { useCarouselSliderContextValues_unstable } from './useCarouselSliderContextValues';

/**
 * CarouselSlider component - TODO: add more docs
 */
export const CarouselSlider: ForwardRefComponent<CarouselSliderProps> = React.forwardRef((props, ref) => {
  const state = useCarouselSlider_unstable(props, ref);

  useCarouselSliderStyles_unstable(state);

  const contextValues = useCarouselSliderContextValues_unstable(state);

  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useCarouselSliderStyles_unstable')(state);
  return renderCarouselSlider_unstable(state, contextValues);
});

CarouselSlider.displayName = 'CarouselSlider';
