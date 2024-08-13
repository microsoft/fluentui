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
export const TeachingPopoverCarouselNavButton: ForwardRefComponent<TeachingPopoverCarouselNavButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselNavButton_unstable(props, ref);

    useTeachingPopoverCarouselNavButtonStyles_unstable(state);

    return renderTeachingPopoverCarouselNavButton_unstable(state);
  }) as ForwardRefComponent<TeachingPopoverCarouselNavButtonProps>;

TeachingPopoverCarouselNavButton.displayName = 'TeachingPopoverCarouselNavButton';
