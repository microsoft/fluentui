/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselNavState, CarouselNavSlots } from './CarouselNav.types';
import { CarouselNavContextProvider } from './CarouselNavContext';

const carouselSlideKey = 'key-fui-carousel-slide-';

/**
 * Render the final JSX of CarouselNav
 */
export const renderCarouselNav_unstable = (state: CarouselNavState) => {
  assertSlots<CarouselNavSlots>(state);
  const { totalSlides, renderNavButton } = state;

  return (
    <state.root>
      {new Array(totalSlides).fill('').map((value, index) => (
        <CarouselNavContextProvider value={index} key={`${carouselSlideKey}${value}`}>
          {renderNavButton(value)}
        </CarouselNavContextProvider>
      ))}
    </state.root>
  );
};
