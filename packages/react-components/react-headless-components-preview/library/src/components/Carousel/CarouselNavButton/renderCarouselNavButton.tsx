/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CarouselNavButtonSlots, CarouselNavButtonState } from './CarouselNavButton.types';

export const renderCarouselNavButton = (state: CarouselNavButtonState): JSXElement => {
  assertSlots<CarouselNavButtonSlots>(state);
  return (
    <state.root>
      <state.indicator />
      {state.root.children}
    </state.root>
  );
};
