import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTeachingPopoverCarouselNavIcon_unstable } from './useTeachingPopoverCarouselNavIcon';
import { renderTeachingPopoverCarouselNavIcon_unstable } from './renderTeachingPopoverCarouselNavIcon';
import { useTeachingPopoverCarouselNavIconStyles_unstable } from './useTeachingPopoverCarouselNavIconStyles.styles';
import type { TeachingPopoverCarouselNavIconProps } from './TeachingPopoverCarouselNavIcon.types';

/**
 * TeachingPopoverCarouselNavIcon component - TODO: add more docs
 */
export const TeachingPopoverCarouselNavIcon: ForwardRefComponent<TeachingPopoverCarouselNavIconProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselNavIcon_unstable(props, ref);

    useTeachingPopoverCarouselNavIconStyles_unstable(state);
    return renderTeachingPopoverCarouselNavIcon_unstable(state);
  });

TeachingPopoverCarouselNavIcon.displayName = 'TeachingPopoverCarouselNavIcon';
