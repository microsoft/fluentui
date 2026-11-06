'use client';

import type * as React from 'react';
import { useTeachingPopoverCarouselNavBase_unstable } from '@fluentui/react-teaching-popover';

import type {
  TeachingPopoverCarouselNavProps,
  TeachingPopoverCarouselNavState,
} from './TeachingPopoverCarouselNav.types';

/**
 * Returns the state for a TeachingPopoverCarouselNav component, given its props and ref.
 * Arrow keys move between the page buttons; Tab enters on the selected page.
 */
export const useTeachingPopoverCarouselNav = (
  props: TeachingPopoverCarouselNavProps,
  ref: React.Ref<HTMLDivElement>,
): TeachingPopoverCarouselNavState => {
  const state: TeachingPopoverCarouselNavState = useTeachingPopoverCarouselNavBase_unstable(props, ref);
  // eslint-disable-next-line react-hooks/immutability
  state.root.focusgroup = 'tablist inline nowrap nomemory';

  return state;
};
