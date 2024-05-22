/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselNavImageButtonState, CarouselNavImageButtonSlots } from './CarouselNavImageButton.types';

/**
 * Render the final JSX of CarouselNavImageButton
 */
export const renderCarouselNavImageButton_unstable = (state: CarouselNavImageButtonState) => {
  assertSlots<CarouselNavImageButtonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <state.root>
      <state.image />
    </state.root>
  );
};
