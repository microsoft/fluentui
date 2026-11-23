'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TeachingPopoverCarouselFooterButtonProps } from './TeachingPopoverCarouselFooterButton.types';
import { useTeachingPopoverCarouselFooterButton } from './useTeachingPopoverCarouselFooterButton';
import { renderTeachingPopoverCarouselFooterButton } from './renderTeachingPopoverCarouselFooterButton';
import { composeComponent } from '../../../utils/composeComponent';

export const TeachingPopoverCarouselFooterButton: ForwardRefComponent<TeachingPopoverCarouselFooterButtonProps> =
  /*#__PURE__*/ composeComponent(
    'TeachingPopoverCarouselFooterButton',
    useTeachingPopoverCarouselFooterButton,
    renderTeachingPopoverCarouselFooterButton,
  );
