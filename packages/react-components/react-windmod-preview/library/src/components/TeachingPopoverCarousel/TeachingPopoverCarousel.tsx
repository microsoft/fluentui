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
    const styled = useTeachingPopoverCarouselStyles(useTeachingPopoverCarousel(props, ref));

    return renderTeachingPopoverCarousel(styled, useTeachingPopoverCarouselContextValues(styled));
    // Casting is required due to lack of distributive union to support union on @types/react
  },
) as ForwardRefComponent<TeachingPopoverCarouselProps>;

TeachingPopoverCarousel.displayName = 'TeachingPopoverCarousel';
