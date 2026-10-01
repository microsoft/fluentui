'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselNavButtonProps } from './TeachingPopoverCarouselNavButton.types';
import { renderTeachingPopoverCarouselNavButton } from './renderTeachingPopoverCarouselNavButton';
import { useTeachingPopoverCarouselNavButton } from './useTeachingPopoverCarouselNavButton';
import { useTeachingPopoverCarouselNavButtonStyles } from './useTeachingPopoverCarouselNavButtonStyles.styles';

export const TeachingPopoverCarouselNavButton: ForwardRefComponent<TeachingPopoverCarouselNavButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselNavButton(props, ref);
    useTeachingPopoverCarouselNavButtonStyles(state);
    return renderTeachingPopoverCarouselNavButton(state);
  });

TeachingPopoverCarouselNavButton.displayName = 'TeachingPopoverCarouselNavButton';
