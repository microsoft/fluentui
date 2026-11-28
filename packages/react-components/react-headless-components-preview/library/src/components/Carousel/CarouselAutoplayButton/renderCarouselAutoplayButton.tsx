/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CarouselAutoplayButtonSlots, CarouselAutoplayButtonState } from './CarouselAutoplayButton.types';

export const renderCarouselAutoplayButton = (state: CarouselAutoplayButtonState): JSXElement | null => {
  assertSlots<CarouselAutoplayButtonSlots>(state);
  return state.rendered ? <state.root /> : null;
};
