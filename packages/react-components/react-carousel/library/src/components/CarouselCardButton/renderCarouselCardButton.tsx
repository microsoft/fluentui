/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselCardButtonState, CarouselCardButtonSlots } from './CarouselCardButton.types';

/**
 * Render the final JSX of CarouselCardButton
 */
export const renderCarouselCardButton_unstable = (state: CarouselCardButtonState) => {
  assertSlots<CarouselCardButtonSlots>(state);

  return <state.root />;
};
