import * as React from 'react';
import { useTeachingPopoverCarouselNav_unstable } from './useTeachingPopoverCarouselNav';
import { renderTeachingPopoverCarouselNav_unstable } from './renderTeachingPopoverCarouselNav';
import { useTeachingPopoverCarouselNavStyles_unstable } from './useTeachingPopoverCarouselNavStyles.styles';
import type { TeachingPopoverCarouselNavProps } from './TeachingPopoverCarouselNav.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingPopoverCarouselNav, using the `useTeachingPopoverCarouselNav_unstable` and `useTeachingPopoverCarouselNavStyles_unstable`
 * hooks.
 *
 * TeachingPopoverCarouselNav provides an index-based pagination list to jump to any page within the carousel.
 */
export const TeachingPopoverCarouselNav: ForwardRefComponent<TeachingPopoverCarouselNavProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselNav_unstable(props, ref);

    useTeachingPopoverCarouselNavStyles_unstable(state);

    return renderTeachingPopoverCarouselNav_unstable(state);
  },
);

TeachingPopoverCarouselNav.displayName = 'TeachingPopoverCarouselNav';
