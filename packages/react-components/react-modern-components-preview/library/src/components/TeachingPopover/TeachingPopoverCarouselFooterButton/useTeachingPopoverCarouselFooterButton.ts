'use client';

import type * as React from 'react';
import { useTeachingPopoverCarouselFooterButton as useTeachingPopoverCarouselFooterButtonBase } from '@fluentui/react-headless-components-preview/teaching-popover';
import { useButton } from '../../Button/useButton';
import { usePopoverAppearanceContext } from '../../Popover/Popover/popoverAppearanceContext';
import type {
  TeachingPopoverCarouselFooterButtonProps,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';

export const useTeachingPopoverCarouselFooterButton = (
  props: TeachingPopoverCarouselFooterButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselFooterButtonState => {
  const baseState = useTeachingPopoverCarouselFooterButtonBase(props, ref);
  const { appearance: popoverAppearance } = usePopoverAppearanceContext();
  const appearance = props.navType === 'next' ? (popoverAppearance === 'brand' ? 'subtle' : 'primary') : 'outline';
  const buttonState = useButton({ ...props, appearance }, ref);

  return {
    ...buttonState,
    navType: baseState.navType,
    altText: baseState.altText,
    popoverAppearance,
    root: {
      ...baseState.root,
      'data-nav-type': baseState.navType,
      'data-popover-appearance': popoverAppearance,
    },
  } as TeachingPopoverCarouselFooterButtonState;
};
