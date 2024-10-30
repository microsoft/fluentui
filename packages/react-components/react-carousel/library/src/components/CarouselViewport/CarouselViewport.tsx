import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselViewport_unstable } from './useCarouselViewport';
import { renderCarouselViewport_unstable } from './renderCarouselViewport';
import { useCarouselViewportStyles_unstable } from './useCarouselViewportStyles.styles';
import type { CarouselViewportProps } from './CarouselViewport.types';
import { useCarouselSliderContextValues_unstable } from '../CarouselSlider/CarouselSliderContext';

/**
 * CarouselViewport component - TODO: add more docs
 */
export const CarouselViewport: ForwardRefComponent<CarouselViewportProps> = React.forwardRef((props, ref) => {
  const state = useCarouselViewport_unstable(props, ref);

  useCarouselViewportStyles_unstable(state);
  const context = useCarouselSliderContextValues_unstable(state);
  /**
   * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
   *
   * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
   *      - uncomment this line
   *      - update types {@link file://./../../../../../../../packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
   *      - verify that custom global style override works for your component
   */
  // useCustomStyleHook_unstable('useCarouselViewportStyles_unstable')(state);

  return renderCarouselViewport_unstable(state, context);
});

CarouselViewport.displayName = 'CarouselViewport';
