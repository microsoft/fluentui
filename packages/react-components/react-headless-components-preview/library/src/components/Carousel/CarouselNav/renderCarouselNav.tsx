/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import { CarouselItemIndexContext, CarouselRegisterTabContext } from '../carouselContext';
import type { CarouselNavSlots, CarouselNavState } from './CarouselNav.types';

export const renderCarouselNav = (state: CarouselNavState): JSXElement | null => {
  assertSlots<CarouselNavSlots>(state);
  if (!state.rendered) {
    return null;
  }
  return (
    <state.root>
      <CarouselRegisterTabContext.Provider value={state.registerTab}>
        {Array.from({ length: state.pageCount }, (_, i) => (
          <CarouselItemIndexContext.Provider key={i} value={i}>
            {state.renderNavButton(i)}
          </CarouselItemIndexContext.Provider>
        ))}
      </CarouselRegisterTabContext.Provider>
    </state.root>
  );
};
