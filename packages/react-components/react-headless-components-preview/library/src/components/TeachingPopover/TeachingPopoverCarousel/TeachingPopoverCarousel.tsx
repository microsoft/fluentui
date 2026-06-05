'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselProps } from './TeachingPopoverCarousel.types';
import { useTeachingPopoverCarousel, useTeachingPopoverCarouselContextValues } from './useTeachingPopoverCarousel';
import { renderTeachingPopoverCarousel } from './renderTeachingPopoverCarousel';

export const TeachingPopoverCarousel: ForwardRefComponent<TeachingPopoverCarouselProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarousel(props, ref);
    const contextValues = useTeachingPopoverCarouselContextValues(state);
    return renderTeachingPopoverCarousel(state, contextValues);
  },
);

TeachingPopoverCarousel.displayName = 'TeachingPopoverCarousel';
