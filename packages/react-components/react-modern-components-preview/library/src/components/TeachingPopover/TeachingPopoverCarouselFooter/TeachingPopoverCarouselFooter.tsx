'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterProps } from './TeachingPopoverCarouselFooter.types';
import { renderTeachingPopoverCarouselFooter } from './renderTeachingPopoverCarouselFooter';
import { useTeachingPopoverCarouselFooter } from './useTeachingPopoverCarouselFooter';
import { useTeachingPopoverCarouselFooterStyles } from './useTeachingPopoverCarouselFooterStyles.styles';

export const TeachingPopoverCarouselFooter: ForwardRefComponent<TeachingPopoverCarouselFooterProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselFooter(props, ref);
    useTeachingPopoverCarouselFooterStyles(state);
    return renderTeachingPopoverCarouselFooter(state);
  },
);

TeachingPopoverCarouselFooter.displayName = 'TeachingPopoverCarouselFooter';
