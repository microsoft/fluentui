'use client';

import type * as React from 'react';
import { useTeachingPopoverCarouselNavButtonBase_unstable } from '@fluentui/react-teaching-popover';
import { toDataAttributeValue } from '../../../utils';
import type {
  TeachingPopoverCarouselNavButtonProps,
  TeachingPopoverCarouselNavButtonState,
} from './TeachingPopoverCarouselNavButton.types';

export const useTeachingPopoverCarouselNavButton = (
  props: TeachingPopoverCarouselNavButtonProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): TeachingPopoverCarouselNavButtonState => {
  const state: TeachingPopoverCarouselNavButtonState = useTeachingPopoverCarouselNavButtonBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selected'] = toDataAttributeValue(state.isSelected);

  return state;
};
