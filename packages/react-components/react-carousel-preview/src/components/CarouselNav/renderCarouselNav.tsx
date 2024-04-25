/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselNavState, CarouselNavSlots } from './CarouselNav.types';

/**
 * Render the final JSX of CarouselNav
 */
export const renderCarouselNav_unstable = (state: CarouselNavState) => {
  assertSlots<CarouselNavSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
