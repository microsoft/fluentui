/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselItemState, CarouselItemSlots } from './CarouselItem.types';

/**
 * Render the final JSX of TeachingPopoverCarousel
 */
export const renderCarouselItem_unstable = (state: CarouselItemState) => {
  assertSlots<CarouselItemSlots>(state);

  return <state.root />;
};
