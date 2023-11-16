import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useTeachingPopoverCarousel_unstable } from './useTeachingPopoverCarousel';
import { renderTeachingPopoverCarousel_unstable } from './renderTeachingPopoverCarousel';
import { useTeachingPopoverCarouselStyles_unstable } from './useTeachingPopoverCarouselStyles.styles';
import type { TeachingPopoverCarouselProps } from './TeachingPopoverCarousel.types';

/**
 * TeachingPopoverCarousel component - TODO: add more docs
 */
export const TeachingPopoverCarousel: ForwardRefComponent<TeachingPopoverCarouselProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarousel_unstable(props, ref);

    useTeachingPopoverCarouselStyles_unstable(state);
    useCustomStyleHook_unstable('useTeachingPopoverCarouselStyles_unstable')(state);
    return renderTeachingPopoverCarousel_unstable(state);
  },
);

TeachingPopoverCarousel.displayName = 'TeachingPopoverCarousel';
