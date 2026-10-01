'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterButtonProps } from './TeachingPopoverCarouselFooterButton.types';
import { renderTeachingPopoverCarouselFooterButton } from './renderTeachingPopoverCarouselFooterButton';
import { useTeachingPopoverCarouselFooterButton } from './useTeachingPopoverCarouselFooterButton';
import { useTeachingPopoverCarouselFooterButtonStyles } from './useTeachingPopoverCarouselFooterButtonStyles.styles';

export const TeachingPopoverCarouselFooterButton: ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselFooterButton(props, ref);
    useTeachingPopoverCarouselFooterButtonStyles(state);
    return renderTeachingPopoverCarouselFooterButton(state);
  });

TeachingPopoverCarouselFooterButton.displayName = 'TeachingPopoverCarouselFooterButton';
