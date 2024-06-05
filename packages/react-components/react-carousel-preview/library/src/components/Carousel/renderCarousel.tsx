/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselState, CarouselSlots } from './Carousel.types';
import { CarouselProvider } from '../CarouselContext';
import type { CarouselContextValues } from '../CarouselContext.types';

/**
 * Render the final JSX of Carousel
 */
export const renderCarousel_unstable = (state: CarouselState, contextValues: CarouselContextValues) => {
  assertSlots<CarouselSlots>(state);

  return (
    <CarouselProvider value={contextValues.carousel}>
      <state.root />
    </CarouselProvider>
  );
};
