'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselNavProps } from './TeachingPopoverCarouselNav.types';
import { useTeachingPopoverCarouselNav } from './useTeachingPopoverCarouselNav';
import { renderTeachingPopoverCarouselNav } from './renderTeachingPopoverCarouselNav';

export const TeachingPopoverCarouselNav: ForwardRefComponent<TeachingPopoverCarouselNavProps> = React.forwardRef(
  (props, ref) => {
    const state = useTeachingPopoverCarouselNav(props, ref);
    return renderTeachingPopoverCarouselNav(state);
  },
);

TeachingPopoverCarouselNav.displayName = 'TeachingPopoverCarouselNav';
