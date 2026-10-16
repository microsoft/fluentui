'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselProps } from './TeachingPopoverCarousel.types';
import { useTeachingPopoverCarousel, useTeachingPopoverCarouselContextValues } from './useTeachingPopoverCarousel';
import { renderTeachingPopoverCarousel } from './renderTeachingPopoverCarousel';
import { composeComponent } from '../../../utils/composeComponent';

export const TeachingPopoverCarousel: ForwardRefComponent<TeachingPopoverCarouselProps> =
  /*#__PURE__*/ composeComponent(
    'TeachingPopoverCarousel',
    useTeachingPopoverCarousel,
    renderTeachingPopoverCarousel,
    useTeachingPopoverCarouselContextValues,
  );
