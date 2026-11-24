/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { CarouselContext } from './carouselContext';
import type { CarouselContextValues, CarouselSlots, CarouselState } from './Carousel.types';

export const renderCarousel = (state: CarouselState, contextValues: CarouselContextValues): JSXElement => {
  assertSlots<CarouselSlots>(state);
  return (
    <CarouselContext.Provider value={contextValues.carousel}>
      <state.root />
    </CarouselContext.Provider>
  );
};
