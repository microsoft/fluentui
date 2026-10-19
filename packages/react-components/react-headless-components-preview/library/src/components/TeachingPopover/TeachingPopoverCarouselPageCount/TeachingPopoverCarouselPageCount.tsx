'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselPageCountProps } from './TeachingPopoverCarouselPageCount.types';
import { useTeachingPopoverCarouselPageCount } from './useTeachingPopoverCarouselPageCount';
import { renderTeachingPopoverCarouselPageCount } from './renderTeachingPopoverCarouselPageCount';
import { composeComponent } from '../../../utils/composeComponent';

export const TeachingPopoverCarouselPageCount: ForwardRefComponent<TeachingPopoverCarouselPageCountProps> =
  /*#__PURE__*/ composeComponent(
    'TeachingPopoverCarouselPageCount',
    useTeachingPopoverCarouselPageCount,
    renderTeachingPopoverCarouselPageCount,
  );
