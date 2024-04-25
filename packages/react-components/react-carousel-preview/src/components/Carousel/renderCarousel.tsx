/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselState, CarouselSlots } from './Carousel.types';

/**
 * Render the final JSX of Carousel
 */
export const renderCarousel_unstable = (state: CarouselState) => {
  assertSlots<CarouselSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
