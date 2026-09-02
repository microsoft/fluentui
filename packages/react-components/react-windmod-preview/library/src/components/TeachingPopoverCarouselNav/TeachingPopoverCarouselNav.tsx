'use client';

import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import {
  renderTeachingPopoverCarouselNav,
  useTeachingPopoverCarouselNav,
} from '@fluentui/react-headless-components-preview/teaching-popover';

import type { TeachingPopoverCarouselNavProps } from './TeachingPopoverCarouselNav.types';
import { useTeachingPopoverCarouselNavStyles } from './useTeachingPopoverCarouselNavStyles';

/**
 * The row of page indicators in a carousel. Windmod TeachingPopoverCarouselNav: the headless nav
 * decorated with the Fluent visual contract (Tailwind v4 + CSS Modules).
 */
export const TeachingPopoverCarouselNav: ForwardRefComponent<TeachingPopoverCarouselNavProps> = React.forwardRef(
  (props, ref) =>
    renderTeachingPopoverCarouselNav(useTeachingPopoverCarouselNavStyles(useTeachingPopoverCarouselNav(props, ref))),
);

TeachingPopoverCarouselNav.displayName = 'TeachingPopoverCarouselNav';
