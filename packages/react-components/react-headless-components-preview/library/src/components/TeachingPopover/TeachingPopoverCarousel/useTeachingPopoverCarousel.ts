'use client';

import { useTeachingPopoverCarouselContextValues_unstable } from '@fluentui/react-teaching-popover';
import type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';

export { useTeachingPopoverCarouselBase_unstable as useTeachingPopoverCarousel } from '@fluentui/react-teaching-popover';

/**
 * Cast around the v9 contextValues helper, which is typed against the
 * styled state but only reads carousel fields that exist on the base state.
 */
export const useTeachingPopoverCarouselContextValues = (
  state: TeachingPopoverCarouselState,
): TeachingPopoverCarouselContextValues =>
  useTeachingPopoverCarouselContextValues_unstable(
    state as Parameters<typeof useTeachingPopoverCarouselContextValues_unstable>[0],
  );
