/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { CarouselCardSlots, CarouselCardState } from './CarouselCard.types';

export const renderCarouselCard = (state: CarouselCardState): JSXElement => {
  assertSlots<CarouselCardSlots>(state);
  return <state.root />;
};
