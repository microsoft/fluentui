/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';

import type { CarouselNavState, CarouselNavSlots } from './CarouselNav.types';
import { CarouselNavContextProvider, type CarouselNavContextValues } from './CarouselNavContext';
import { CarouselNavIndexContextProvider } from './CarouselNavIndexContext';

/**
 * Render the final JSX of CarouselNav
 */
export const renderCarouselNav_unstable = (
  state: CarouselNavState,
  contextValues: CarouselNavContextValues,
): JSXElement => {
  assertSlots<CarouselNavSlots>(state);

  const { totalSlides, renderNavButton } = state;

  return (
    <state.root>
      <CarouselNavContextProvider value={contextValues.carouselNav}>
        {new Array(totalSlides).fill(null).map((_, index) => (
          <CarouselNavIndexContextProvider key={index} value={index}>
            {renderNavButton(index)}
          </CarouselNavIndexContextProvider>
        ))}
      </CarouselNavContextProvider>
    </state.root>
  );
};
