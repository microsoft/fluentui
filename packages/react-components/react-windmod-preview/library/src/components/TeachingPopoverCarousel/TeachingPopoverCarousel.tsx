'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverCarousel,
  useTeachingPopoverCarousel,
  useTeachingPopoverCarouselContextValues,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import type { TeachingPopoverCarouselProps } from './TeachingPopoverCarousel.types';
import { useTeachingPopoverCarouselStyles } from './useTeachingPopoverCarouselStyles';

/**
 * A paged sequence of cards inside a TeachingPopover. Windmod TeachingPopoverCarousel: the headless
 * carousel decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const TeachingPopoverCarousel: ForwardRefComponent<TeachingPopoverCarouselProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarousel(props, ref);
    const styled = useTeachingPopoverCarouselStyles(state);

    const contextValues = useTeachingPopoverCarouselContextValues(styled);

    return renderTeachingPopoverCarousel(styled, contextValues);
  },
);

TeachingPopoverCarousel.displayName = 'TeachingPopoverCarousel';
