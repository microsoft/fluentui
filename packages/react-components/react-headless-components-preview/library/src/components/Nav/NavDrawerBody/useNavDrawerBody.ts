'use client';

import type * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import type { NavDrawerBodyProps, NavDrawerBodyState } from './NavDrawerBody.types';
import { useDrawerBody } from '../../Drawer/DrawerBody';
import { useArrowNavigationGroup } from '../../../hooks/focusgroup';

/**
 * Create the state required to render NavDrawerBody.
 * Arrow up/down move between the navigation items, wrapping around at the ends.
 */
export const useNavDrawerBody = (props: NavDrawerBodyProps, ref: React.Ref<HTMLElement>): NavDrawerBodyState => {
  const { ref: focusgroupRef, ...arrowNavigationAttributes } = useArrowNavigationGroup({
    axis: 'vertical',
    circular: true,
  });
  const state = useDrawerBody({ role: 'navigation', ...props }, ref);

  if (state.root.focusgroup === undefined) {
    Object.assign(state.root, arrowNavigationAttributes);
  }

  // eslint-disable-next-line react-hooks/immutability
  state.root.ref = useMergedRefs(state.root.ref, focusgroupRef);

  return state;
};
