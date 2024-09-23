/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselAnnouncerState, CarouselAnnouncerSlots } from './CarouselAnnouncer.types';

/**
 * Render the final JSX of CarouselAnnouncer
 */
export const renderCarouselAnnouncer_unstable = (state: CarouselAnnouncerState) => {
  assertSlots<CarouselAnnouncerSlots>(state);

  return <state.root />;
};
