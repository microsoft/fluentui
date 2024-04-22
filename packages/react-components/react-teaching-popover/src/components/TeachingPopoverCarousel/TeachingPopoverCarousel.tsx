import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

import { useTeachingPopoverCarousel_unstable } from './useTeachingPopoverCarousel';
import { renderTeachingPopoverCarousel_unstable } from './renderTeachingPopoverCarousel';
import { useTeachingPopoverCarouselStyles_unstable } from './useTeachingPopoverCarouselStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingPopoverCarouselProps } from './TeachingPopoverCarousel.types';
import { useTeachingPopoverCarouselContextValues_unstable } from './useTeachingPopoverCarouselContextValues';

/**
 * Define a styled TeachingPopoverCarousel, using the `useTeachingPopoverCarousel_unstable` and `useTeachingPopoverCarouselStyles_unstable`
 * hooks.
 *
 * TeachingPopoverCarousel injects context providers that are required for TeachingPopoverCarouselCard display and navigation functionality
 */
export const TeachingPopoverCarousel: ForwardRefComponent<TeachingPopoverCarouselProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarousel_unstable(props, ref);

    useTeachingPopoverCarouselStyles_unstable(state);

    useCustomStyleHook_unstable('useTeachingPopoverCarouselStyles_unstable')(state);

    const contextValues = useTeachingPopoverCarouselContextValues_unstable(state);

    return renderTeachingPopoverCarousel_unstable(state, contextValues);
  },
);

TeachingPopoverCarousel.displayName = 'TeachingPopoverCarousel';
