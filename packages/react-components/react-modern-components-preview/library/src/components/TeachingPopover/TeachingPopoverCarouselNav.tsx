'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselNavProps } from './TeachingPopoverCarouselNav.types';
import { renderTeachingPopoverCarouselNav } from './renderTeachingPopoverCarouselNav';
import { useTeachingPopoverCarouselNav } from './useTeachingPopoverCarouselNav';
import { useTeachingPopoverCarouselNavStyles } from './useTeachingPopoverCarouselNavStyles.styles';

export const TeachingPopoverCarouselNav: ForwardRefComponent<TeachingPopoverCarouselNavProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselNav(props, ref);
    useTeachingPopoverCarouselNavStyles(state);
    return renderTeachingPopoverCarouselNav(state);
  },
);

TeachingPopoverCarouselNav.displayName = 'TeachingPopoverCarouselNav';
