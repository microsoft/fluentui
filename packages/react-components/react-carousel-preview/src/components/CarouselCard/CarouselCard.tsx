import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselCard_unstable } from './useCarouselCard';
import { renderCarouselCard_unstable } from './renderCarouselCard';
import { useCarouselCardStyles_unstable } from './useCarouselCardStyles.styles';
import type { CarouselCardProps } from './CarouselCard.types';

/**
 * CarouselCard component - TODO: add more docs
 */
export const CarouselCard: ForwardRefComponent<CarouselCardProps> = React.forwardRef((props, ref) => {
  const state = useCarouselCard_unstable(props, ref);

  useCarouselCardStyles_unstable(state);
  // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
  // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
  // useCustomStyleHook_unstable('useCarouselCardStyles_unstable')(state);
  return renderCarouselCard_unstable(state);
});

CarouselCard.displayName = 'CarouselCard';
