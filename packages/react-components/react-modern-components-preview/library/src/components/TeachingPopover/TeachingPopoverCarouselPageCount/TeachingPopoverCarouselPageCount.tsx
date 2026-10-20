'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselPageCountProps } from './TeachingPopoverCarouselPageCount.types';
import { renderTeachingPopoverCarouselPageCount } from './renderTeachingPopoverCarouselPageCount';
import { useTeachingPopoverCarouselPageCount } from './useTeachingPopoverCarouselPageCount';
import { useTeachingPopoverCarouselPageCountStyles } from './useTeachingPopoverCarouselPageCountStyles.styles';

export const TeachingPopoverCarouselPageCount: ForwardRefComponent<TeachingPopoverCarouselPageCountProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselPageCount(props, ref);
    useTeachingPopoverCarouselPageCountStyles(state);
    return renderTeachingPopoverCarouselPageCount(state);
  });

TeachingPopoverCarouselPageCount.displayName = 'TeachingPopoverCarouselPageCount';
