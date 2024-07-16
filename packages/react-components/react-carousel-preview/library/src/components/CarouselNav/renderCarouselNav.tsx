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
  const { values, renderNavButton, groupSize } = state;

  if (groupSize) {
    const groupValues: string[][] = [];
    let groupIndex = -1;
    values.forEach((value, index) => {
      if (index % groupSize === 0) {
        groupIndex++;
        groupValues[groupIndex] = [];
      }
      groupValues[groupIndex].push(value);
    });

    return (
      <state.root>
        {groupValues.map(value => (
          <CarouselNavContextProvider value={value} key={value.join('-')}>
            {renderNavButton(value)}
          </CarouselNavContextProvider>
        ))}
      </state.root>
    );
  }

  return (
    <state.root>
      {values.map(value => (
        <CarouselNavContextProvider value={[value]} key={value}>
          {renderNavButton([value])}
        </CarouselNavContextProvider>
      ))}
    </state.root>
  );
};
