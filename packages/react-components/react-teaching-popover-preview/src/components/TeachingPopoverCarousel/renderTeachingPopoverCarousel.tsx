/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import type { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { TeachingPopoverCarouselSlots } from './TeachingPopoverCarousel.types';
import { assertSlots } from '@fluentui/react-utilities';
import { TeachingPopoverCarouselContextValues } from './TeachingPopoverCarouselContext';
import { CarouselWalkerProvider } from './Carousel/useCarouselWalker';
import { CarouselProvider } from './Carousel/useCarouselCollection';

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
