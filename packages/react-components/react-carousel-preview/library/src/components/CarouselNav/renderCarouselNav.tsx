/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselNavState, CarouselNavSlots } from './CarouselNav.types';
import { CarouselNavContextProvider } from './CarouselNavContext';

/**
 * Render the final JSX of CarouselNav
 */
export const renderCarouselNav_unstable = (state: CarouselNavState) => {
  assertSlots<CarouselNavSlots>(state);
  const { values, renderNavButton } = state;

  return (
    <state.root>
      {values.map(value => (
        <CarouselNavContextProvider value={value} key={value}>
          {renderNavButton(value)}
        </CarouselNavContextProvider>
      ))}
    </state.root>
  );
};
