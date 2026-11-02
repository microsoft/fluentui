'use client';

import { useTeachingPopoverCarouselContextValues_unstable } from '@fluentui/react-teaching-popover';
import type {
  TeachingPopoverCarouselContextValues,
  TeachingPopoverCarouselState,
} from './TeachingPopoverCarousel.types';

export { useTeachingPopoverCarouselBase_unstable as useTeachingPopoverCarousel } from '@fluentui/react-teaching-popover';

export const useTeachingPopoverCarouselContextValues = useTeachingPopoverCarouselContextValues_unstable as (
  state: TeachingPopoverCarouselState,
) => TeachingPopoverCarouselContextValues;
