/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselButtonState, CarouselButtonSlots } from './CarouselButton.types';
import { renderButton_unstable } from '@fluentui/react-button';

/**
 * Render the final JSX of CarouselButton
 */
export const renderCarouselButton_unstable = (state: CarouselButtonState) => {
  assertSlots<CarouselButtonSlots>(state);

  // We render the underlying react-button with injected carousel functionality
  return renderButton_unstable(state);
};
