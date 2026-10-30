'use client';

import type * as React from 'react';
import type { NavDrawerBodyProps, NavDrawerBodyState } from './NavDrawerBody.types';
import { useDrawerBody } from '../../Drawer/DrawerBody';

/**
 * Create the state required to render NavDrawerBody.
 * Arrow up/down move between the navigation items, wrapping around at the ends.
 */
export const useNavDrawerBody = (props: NavDrawerBodyProps, ref: React.Ref<HTMLElement>): NavDrawerBodyState => {
  const state = useDrawerBody({ role: 'navigation', ...props }, ref);

  if (state.root.focusgroup === undefined) {
    // eslint-disable-next-line react-hooks/immutability
    state.root.focusgroup = 'toolbar block wrap';
  }

  return state;
};
