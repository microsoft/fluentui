'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterButtonProps } from './TeachingPopoverCarouselFooterButton.types';
import { useTeachingPopoverCarouselFooterButton } from './useTeachingPopoverCarouselFooterButton';
import { renderTeachingPopoverCarouselFooterButton } from './renderTeachingPopoverCarouselFooterButton';

export const TeachingPopoverCarouselFooterButton: ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselFooterButton(props, ref);
    return renderTeachingPopoverCarouselFooterButton(state);
  });

TeachingPopoverCarouselFooterButton.displayName = 'TeachingPopoverCarouselFooterButton';
