/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type {
  TeachingPopoverCarouselState,
  TeachingPopoverCarouselSlots,
  TeachingPopoverCarouselContextValues,
} from './TeachingPopoverCarousel.types';
import { CarouselProvider } from './Carousel/CarouselContext';
import { CarouselWalkerProvider } from './Carousel/CarouselWalkerContext';

/**
 * Render the final JSX of TeachingPopoverCarousel
 */
export const renderTeachingPopoverCarousel_unstable = (
  state: TeachingPopoverCarouselState,
  contextValues: TeachingPopoverCarouselContextValues,
) => {
  assertSlots<TeachingPopoverCarouselSlots>(state);

  return (
    <CarouselWalkerProvider value={contextValues.carouselWalker}>
      <CarouselProvider value={contextValues.carousel}>
        <state.root>
          {state.root.children}
          <state.footer />
        </state.root>
      </CarouselProvider>
    </CarouselWalkerProvider>
  );
};
