'use client';

import type * as React from 'react';
import { useTeachingPopoverCarouselNavButton as useTeachingPopoverCarouselNavButtonBase } from '@fluentui/react-headless-components-preview/teaching-popover';
import { usePopoverAppearanceContext } from '../../Popover/Popover/popoverAppearanceContext';
import type {
  TeachingPopoverCarouselNavButtonProps,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';

export const useTeachingPopoverCarouselNavButton = (
  props: TeachingPopoverCarouselNavButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselNavButtonState => {
  const state = useTeachingPopoverCarouselNavButtonBase(props, ref);
  const { appearance } = usePopoverAppearanceContext();
  return { ...state, appearance, root: { ...state.root, 'data-appearance': appearance } };
};
