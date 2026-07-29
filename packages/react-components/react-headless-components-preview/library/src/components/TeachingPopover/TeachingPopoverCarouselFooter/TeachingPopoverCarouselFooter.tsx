'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterProps } from './TeachingPopoverCarouselFooter.types';
import { useTeachingPopoverCarouselFooter } from './useTeachingPopoverCarouselFooter';
import { renderTeachingPopoverCarouselFooter } from './renderTeachingPopoverCarouselFooter';

export const TeachingPopoverCarouselFooter: ForwardRefComponent<TeachingPopoverCarouselFooterProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselFooter(props, ref);
    return renderTeachingPopoverCarouselFooter(state);
  },
);

TeachingPopoverCarouselFooter.displayName = 'TeachingPopoverCarouselFooter';
