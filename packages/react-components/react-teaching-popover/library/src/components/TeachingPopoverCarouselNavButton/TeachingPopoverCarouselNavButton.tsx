import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTeachingPopoverCarouselNavButton_unstable } from './useTeachingPopoverCarouselNavButton';
import { renderTeachingPopoverCarouselNavButton_unstable } from './renderTeachingPopoverCarouselNavButton';
import { useTeachingPopoverCarouselNavButtonStyles_unstable } from './useTeachingPopoverCarouselNavButtonStyles.styles';
import type { TeachingPopoverCarouselNavButtonProps } from './TeachingPopoverCarouselNavButton.types';

/**
 * TeachingPopoverCarouselNavButton is a button to jump to a single page within TeachingPopoverCarousel
 *
 * It's value is injected via context and must be wrapped with a ValueIdContextProvider (automatically handled via TeachingPopoverCarouselNav)
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const TeachingPopoverCarouselNavButton: ForwardRefComponent<TeachingPopoverCarouselNavButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselNavButton_unstable(props, ref);

    useTeachingPopoverCarouselNavButtonStyles_unstable(state);

    return renderTeachingPopoverCarouselNavButton_unstable(state);
    // eslint-disable-next-line deprecation/deprecation
  }) as ForwardRefComponent<TeachingPopoverCarouselNavButtonProps>;

TeachingPopoverCarouselNavButton.displayName = 'TeachingPopoverCarouselNavButton';
