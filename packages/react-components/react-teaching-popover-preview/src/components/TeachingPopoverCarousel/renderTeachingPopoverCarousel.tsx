/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselState,
  TeachingPopoverCarouselSlots,
  TeachingPopoverCarouselContextValues,
} from './TeachingPopoverCarousel.types';
import { CarouselProvider } from './Carousel/CarouselContext';

/**
 * Render the final JSX of TeachingPopoverCarousel
 */
export const renderTeachingPopoverCarousel_unstable = (
  state: TeachingPopoverCarouselState,
  contextValues: TeachingPopoverCarouselContextValues,
) => {
  assertSlots<TeachingPopoverCarouselSlots>(state);

  return (
    <CarouselProvider value={contextValues.carousel}>
      <state.root />
    </CarouselProvider>
  );
};
