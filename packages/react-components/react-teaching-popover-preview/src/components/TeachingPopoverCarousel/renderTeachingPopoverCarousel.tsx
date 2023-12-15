import * as React from 'react';
import type { TeachingPopoverCarouselState } from './TeachingPopoverCarousel.types';
import { TeachingPopoverCarouselSlots } from './TeachingPopoverCarousel.types';
import { assertSlots } from '@fluentui/react-utilities';

/**
 * Render the final JSX of TeachingPopoverCarousel
 */
export const renderTeachingPopoverCarousel_unstable = (state: TeachingPopoverCarouselState) => {
  assertSlots<TeachingPopoverCarouselSlots>(state);

  return <state.root />;
};
