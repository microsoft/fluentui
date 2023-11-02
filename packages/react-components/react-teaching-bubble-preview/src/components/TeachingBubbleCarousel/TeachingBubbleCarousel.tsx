import * as React from 'react';
import { useTeachingBubbleCarousel_unstable } from './useTeachingBubbleCarousel';
import { renderTeachingBubbleCarousel_unstable } from './renderTeachingBubbleCarousel';
import { useTeachingBubbleCarouselStyles_unstable } from './useTeachingBubbleCarouselStyles.styles';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import type { TeachingBubbleCarouselProps } from './TeachingBubbleCarousel.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * Define a styled TeachingBubbleCarousel, using the `useTeachingBubbleCarousel_unstable` and `useTeachingBubbleCarouselStyles_unstable`
 * hooks.
 */
export const TeachingBubbleCarousel: ForwardRefComponent<TeachingBubbleCarouselProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingBubbleCarousel_unstable(props, ref);

    useTeachingBubbleCarouselStyles_unstable(state);

    useCustomStyleHook_unstable('useTeachingBubbleCarouselStyles_unstable')(state);

    return renderTeachingBubbleCarousel_unstable(state);
  },
);

TeachingBubbleCarousel.displayName = 'TeachingBubbleCarousel';
