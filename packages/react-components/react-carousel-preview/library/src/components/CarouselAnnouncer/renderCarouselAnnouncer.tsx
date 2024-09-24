/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { CarouselAnnouncerState, CarouselAnnouncerSlots } from './CarouselAnnouncer.types';

/**
 * Render the final JSX of CarouselAnnouncer
 */
export const renderCarouselAnnouncer_unstable = (state: CarouselAnnouncerState) => {
  const { renderAnnouncerChild, currentIndex, totalSlides, slideGroupList } = state;
  assertSlots<CarouselAnnouncerSlots>(state);

  return <state.root>{renderAnnouncerChild(currentIndex, totalSlides, slideGroupList)}</state.root>;
};
