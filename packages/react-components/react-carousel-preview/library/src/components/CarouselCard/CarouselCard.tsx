import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCarouselCard_unstable } from './useCarouselCard';
import { renderCarouselCard_unstable } from './renderCarouselCard';
import { useCarouselCardStyles_unstable } from './useCarouselCardStyles.styles';
import type { CarouselCardProps } from './CarouselCard.types';

/**
 * The defining wrapper of a carousel's indexed content, they will take up the full
 * viewport of Carousel wrapper (with consideration for gap and peeking variants),
 * users may place multiple items within this Card if desired, with consideration of viewport width.
 *
 * Clickable actions within the content area are available via mouse and tab as expected,
 * non-active card content will be set to inert until moved to active card.
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
