'use client';

import type * as React from 'react';
import { useTeachingPopoverCarouselFooterBase_unstable } from '@fluentui/react-teaching-popover';
import { TeachingPopoverCarouselFooterButton } from '../TeachingPopoverCarouselFooterButton/TeachingPopoverCarouselFooterButton';
import type {
  TeachingPopoverCarouselFooterProps,
  TeachingPopoverCarouselFooterState,
} from './TeachingPopoverCarouselFooter.types';

export const useTeachingPopoverCarouselFooter = (
  props: TeachingPopoverCarouselFooterProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselFooterState =>
  useTeachingPopoverCarouselFooterBase_unstable({ ...props, footerButton: TeachingPopoverCarouselFooterButton }, ref);
