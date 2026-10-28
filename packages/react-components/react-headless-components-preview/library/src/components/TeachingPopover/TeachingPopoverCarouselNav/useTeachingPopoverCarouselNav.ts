'use client';

import type * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
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
  const { ref: focusgroupRef, ...arrowNavigationAttributes } = useArrowNavigationGroup({
    axis: 'horizontal',
    circular: false,
    memorizeCurrent: false,
    behavior: 'tablist',
  });

  Object.assign(state.root, arrowNavigationAttributes);

  // eslint-disable-next-line react-hooks/immutability
  state.root.ref = useMergedRefs(state.root.ref, focusgroupRef);

  return state;
};
