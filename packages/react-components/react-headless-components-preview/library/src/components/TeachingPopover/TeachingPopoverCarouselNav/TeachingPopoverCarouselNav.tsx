'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselNavProps } from './TeachingPopoverCarouselNav.types';
import { useTeachingPopoverCarouselNav } from './useTeachingPopoverCarouselNav';
import { renderTeachingPopoverCarouselNav } from './renderTeachingPopoverCarouselNav';
import { composeComponent } from '../../../utils/composeComponent';

export const TeachingPopoverCarouselNav: ForwardRefComponent<TeachingPopoverCarouselNavProps> =
  /*#__PURE__*/ composeComponent(
    'TeachingPopoverCarouselNav',
    useTeachingPopoverCarouselNav,
    renderTeachingPopoverCarouselNav,
  );
