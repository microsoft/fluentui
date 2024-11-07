import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselNavContainer_unstable } from './useCarouselNavContainer';
import { renderCarouselNavContainer_unstable } from './renderCarouselNavContainer';
import { useCarouselNavContainerStyles_unstable } from './useCarouselNavContainerStyles.styles';
import type { CarouselNavContainerProps } from './CarouselNavContainer.types';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * CarouselNavContainer component - This container will provide multiple valid layout options for the underlying carousel controls
 */
export const CarouselNavContainer: ForwardRefComponent<CarouselNavContainerProps> = React.forwardRef((props, ref) => {
  const state = useCarouselNavContainer_unstable(props, ref);

  useCarouselNavContainerStyles_unstable(state);
  useCustomStyleHook_unstable('useCarouselNavContainerStyles_unstable')(state);

  return renderCarouselNavContainer_unstable(state);
});

CarouselNavContainer.displayName = 'CarouselNavContainer';
