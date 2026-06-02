'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselPageCountProps } from './TeachingPopoverCarouselPageCount.types';
import { useTeachingPopoverCarouselPageCount } from './useTeachingPopoverCarouselPageCount';
import { renderTeachingPopoverCarouselPageCount } from './renderTeachingPopoverCarouselPageCount';

export const TeachingPopoverCarouselPageCount: ForwardRefComponent<TeachingPopoverCarouselPageCountProps> =
  React.forwardRef((props, ref) => {
    const state = useTeachingPopoverCarouselPageCount(props, ref);
    return renderTeachingPopoverCarouselPageCount(state);
  });

TeachingPopoverCarouselPageCount.displayName = 'TeachingPopoverCarouselPageCount';
