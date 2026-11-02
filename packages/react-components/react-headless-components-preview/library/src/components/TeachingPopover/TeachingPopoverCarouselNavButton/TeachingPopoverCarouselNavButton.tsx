'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselNavButtonProps } from './TeachingPopoverCarouselNavButton.types';
import { useTeachingPopoverCarouselNavButton } from './useTeachingPopoverCarouselNavButton';
import { renderTeachingPopoverCarouselNavButton } from './renderTeachingPopoverCarouselNavButton';
import { composeComponent } from '../../../utils/composeComponent';

export const TeachingPopoverCarouselNavButton: ForwardRefComponent<TeachingPopoverCarouselNavButtonProps> =
  /*#__PURE__*/ composeComponent(
    'TeachingPopoverCarouselNavButton',
    useTeachingPopoverCarouselNavButton,
    renderTeachingPopoverCarouselNavButton,
  );
