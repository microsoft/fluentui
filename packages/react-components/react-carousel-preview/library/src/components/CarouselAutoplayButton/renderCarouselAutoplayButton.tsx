/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselAutoplayButtonState, CarouselAutoplayButtonSlots } from './CarouselAutoplayButton.types';
import { renderButton_unstable } from '@fluentui/react-button';

/**
 * Render the final JSX of CarouselAutoplayButton
 */
export const renderCarouselAutoplayButton_unstable = (state: CarouselAutoplayButtonState) => {
  assertSlots<CarouselAutoplayButtonSlots>(state);

  // We render the underlying react-button with injected carousel functionality
  return renderButton_unstable(state);
};
