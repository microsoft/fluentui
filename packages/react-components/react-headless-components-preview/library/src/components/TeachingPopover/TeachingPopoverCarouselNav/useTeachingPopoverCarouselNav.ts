'use client';

import type * as React from 'react';
import { useTeachingPopoverCarouselNavBase_unstable } from '@fluentui/react-teaching-popover';

import type {
  TeachingPopoverCarouselNavProps,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';
import { useArrowNavigationGroup } from '../../../hooks/focusgroup';

/**
 * Returns the state for a TeachingPopoverCarouselNav component, given its props and ref.
 * Arrow keys move between the page buttons; Tab enters on the selected page.
 */
export const useTeachingPopoverCarouselNav = (
  props: TeachingPopoverCarouselNavProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselNavState => {
  const state: TeachingPopoverCarouselNavState = useTeachingPopoverCarouselNavBase_unstable(props, ref);
  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'horizontal',
    circular: false,
    memorizeCurrent: false,
    behavior: 'tablist',
  });

  Object.assign(state.root, arrowNavigationAttributes);

  return state;
};
