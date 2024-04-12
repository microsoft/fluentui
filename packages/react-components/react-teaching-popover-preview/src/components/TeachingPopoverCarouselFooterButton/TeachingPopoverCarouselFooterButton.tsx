import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTeachingPopoverCarouselFooterButton_unstable } from './useTeachingPopoverCarouselFooterButton';
import { renderTeachingPopoverCarouselFooterButton_unstable } from './renderTeachingPopoverCarouselFooterButton';
import { useTeachingPopoverCarouselFooterButtonStyles_unstable } from './useTeachingPopoverCarouselFooterButtonStyles.styles';
import type { TeachingPopoverCarouselFooterButtonProps } from './TeachingPopoverCarouselFooterButton.types';

/**
 * TeachingPopoverCarouselFooterButton component - TODO: add more docs
 */
export const TeachingPopoverCarouselFooterButton: ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselFooterButton_unstable(props, ref);

    useTeachingPopoverCarouselFooterButtonStyles_unstable(state);

    return renderTeachingPopoverCarouselFooterButton_unstable(state);
  });

TeachingPopoverCarouselFooterButton.displayName = 'TeachingPopoverCarouselFooterButton';
