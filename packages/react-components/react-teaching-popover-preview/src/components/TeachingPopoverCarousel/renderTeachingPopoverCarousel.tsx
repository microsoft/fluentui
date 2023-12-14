import * as React from 'react';
import type { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingPopoverCarouselSlots } from './TeachingPopoverCarousel.types';

/**
 * Render the final JSX of TeachingPopoverCarousel
 */
export const renderTeachingPopoverCarousel_unstable = (state: TeachingPopoverCarouselState) => {
  const { slots, slotProps } = getSlotsNext<TeachingPopoverCarouselSlots>(state);

  return <slots.root {...slotProps.root} />;
};
