'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverCarouselPageCount,
  useTeachingPopoverCarouselPageCount,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import type { TeachingPopoverCarouselPageCountProps } from './TeachingPopoverCarouselPageCount.types';
import { useTeachingPopoverCarouselPageCountStyles } from './useTeachingPopoverCarouselPageCountStyles';

/**
 * The "page N of M" readout in a carousel footer. Windmod TeachingPopoverCarouselPageCount: the
 * headless page count decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const TeachingPopoverCarouselPageCount: ForwardRefComponent<TeachingPopoverCarouselPageCountProps> =
  React.forwardRef((props, ref) =>
    renderTeachingPopoverCarouselPageCount(
      useTeachingPopoverCarouselPageCountStyles(useTeachingPopoverCarouselPageCount(props, ref)),
    ),
  );

TeachingPopoverCarouselPageCount.displayName = 'TeachingPopoverCarouselPageCount';
