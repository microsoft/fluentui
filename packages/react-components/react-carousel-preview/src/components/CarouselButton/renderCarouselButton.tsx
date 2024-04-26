/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselButtonState, CarouselButtonSlots } from './CarouselButton.types';

/**
 * Render the final JSX of CarouselButton
 */
export const renderCarouselButton_unstable = (state: CarouselButtonState) => {
  assertSlots<CarouselButtonSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
