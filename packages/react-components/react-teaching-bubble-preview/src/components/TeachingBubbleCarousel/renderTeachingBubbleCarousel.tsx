import * as React from 'react';
import type { TeachingBubbleCarouselState } from './TeachingBubbleCarousel.types';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TeachingBubbleCarouselSlots } from './TeachingBubbleCarousel.types';

/**
 * Render the final JSX of TeachingBubbleCarousel
 */
export const renderTeachingBubbleCarousel_unstable = (state: TeachingBubbleCarouselState) => {
  const { slots, slotProps } = getSlotsNext<TeachingBubbleCarouselSlots>(state);
  const { currentPage } = state;

  const children = React.Children.toArray(slotProps.root.children);

  // Get current pagination child (w/ array safety)
  const currentPageElement = currentPage < children.length ? children[currentPage] : children[children.length - 1];

  return <slots.root {...slotProps.root}>{currentPageElement}</slots.root>;
};
