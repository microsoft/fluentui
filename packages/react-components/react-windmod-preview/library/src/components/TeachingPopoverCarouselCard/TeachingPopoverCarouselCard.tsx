'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverCarouselCard,
  useTeachingPopoverCarouselCard,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import type { TeachingPopoverCarouselCardProps } from './TeachingPopoverCarouselCard.types';
import { useTeachingPopoverCarouselCardStyles } from './useTeachingPopoverCarouselCardStyles';

/**
 * One page of a TeachingPopoverCarousel. Windmod TeachingPopoverCarouselCard: the headless card
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const TeachingPopoverCarouselCard: ForwardRefComponent<TeachingPopoverCarouselCardProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselCard(props, ref);
    const styled = useTeachingPopoverCarouselCardStyles(state);

    return renderTeachingPopoverCarouselCard(styled);
  },
);

TeachingPopoverCarouselCard.displayName = 'TeachingPopoverCarouselCard';
