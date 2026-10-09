'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverCarouselNavButton,
  useTeachingPopoverCarouselNavButton,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import { usePopoverLook } from '../Popover/PopoverContext';
import type { TeachingPopoverCarouselNavButtonProps } from './TeachingPopoverCarouselNavButton.types';
import { useTeachingPopoverCarouselNavButtonStyles } from './useTeachingPopoverCarouselNavButtonStyles';

/**
 * One page indicator in a carousel's navigation row. Windmod TeachingPopoverCarouselNavButton: the
 * headless nav button decorated with the Fluent visual contract, including the brand inversion the
 * headless surface leaves to the styled layer.
 */
export const TeachingPopoverCarouselNavButton: ForwardRefComponent<TeachingPopoverCarouselNavButtonProps> =
  React.forwardRef((props, ref) => {
    const base = useTeachingPopoverCarouselNavButton(props, ref);
    const { appearance } = usePopoverLook();

    const styled = useTeachingPopoverCarouselNavButtonStyles({ ...base, appearance });

    return renderTeachingPopoverCarouselNavButton(styled);
  });

TeachingPopoverCarouselNavButton.displayName = 'TeachingPopoverCarouselNavButton';
