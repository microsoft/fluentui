import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTeachingPopoverCarouselFooterButton_unstable } from './useTeachingPopoverCarouselFooterButton';
import { renderTeachingPopoverCarouselFooterButton_unstable } from './renderTeachingPopoverCarouselFooterButton';
import { useTeachingPopoverCarouselFooterButtonStyles_unstable } from './useTeachingPopoverCarouselFooterButtonStyles.styles';
import type { TeachingPopoverCarouselFooterButtonProps } from './TeachingPopoverCarouselFooterButton.types';

/**
 * TeachingPopoverCarouselFooterButton component
 *
 * TeachingPopoverCarouselFooterButton extends Button and injects additional styling and onClick functionality
 * to match the context provided by TeachingPopover & TeachingPopoverCarousel
 */
//TODO: migrate to fc to ensure v18 compatibility
// eslint-disable-next-line deprecation/deprecation
export const TeachingPopoverCarouselFooterButton: ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselFooterButton_unstable(props, ref);

    useTeachingPopoverCarouselFooterButtonStyles_unstable(state);

    return renderTeachingPopoverCarouselFooterButton_unstable(state);
    //FIXME: migrate to fc to remove this assertion
    // Casting is required due to lack of distributive union to support unions on @types/react
    // eslint-disable-next-line deprecation/deprecation
  }) as ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps>;

TeachingPopoverCarouselFooterButton.displayName = 'TeachingPopoverCarouselFooterButton';
