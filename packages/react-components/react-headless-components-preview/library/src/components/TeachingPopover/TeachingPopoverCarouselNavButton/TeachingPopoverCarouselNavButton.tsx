'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselNavButtonProps } from './TeachingPopoverCarouselNavButton.types';
import { useTeachingPopoverCarouselNavButton } from './useTeachingPopoverCarouselNavButton';
import { renderTeachingPopoverCarouselNavButton } from './renderTeachingPopoverCarouselNavButton';

export const TeachingPopoverCarouselNavButton: ForwardRefComponent<TeachingPopoverCarouselNavButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselNavButton(props, ref);
    return renderTeachingPopoverCarouselNavButton(state);
  });

TeachingPopoverCarouselNavButton.displayName = 'TeachingPopoverCarouselNavButton';
