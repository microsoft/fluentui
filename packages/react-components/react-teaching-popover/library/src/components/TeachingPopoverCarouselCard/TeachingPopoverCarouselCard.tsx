import * as React from 'react';
import { useTeachingPopoverCarouselCard_unstable } from './useTeachingPopoverCarouselCard';
import { renderTeachingPopoverCarouselCard_unstable } from './renderTeachingPopoverCarouselCard';
import type { TeachingPopoverCarouselCardProps } from './TeachingPopoverCarouselCard.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTeachingPopoverCarouselCardStyles_unstable } from './useTeachingPopoverCarouselCardStyles.styles';

/**
 * Define a styled TeachingPopoverCarouselCard, using the `useTeachingPopoverCarouselCard_unstable` and `useTeachingPopoverCarouselCardStyles_unstable`
 * hooks.
 *
 * TeachingPopoverCarouselCard is the definition of a single page view within the carousel, they are shown one at a time and can be navigated through sequentially.
 */
export const TeachingPopoverCarouselCard: ForwardRefComponent<TeachingPopoverCarouselCardProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselCard_unstable(props, ref);

    useTeachingPopoverCarouselCardStyles_unstable(state);

    return renderTeachingPopoverCarouselCard_unstable(state);
  },
);

TeachingPopoverCarouselCard.displayName = 'TeachingPopoverCarouselCard';
