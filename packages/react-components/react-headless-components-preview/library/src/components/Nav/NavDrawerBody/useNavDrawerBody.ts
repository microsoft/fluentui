'use client';

import type * as React from 'react';
import type { NavDrawerBodyProps, NavDrawerBodyState } from './NavDrawerBody.types';
import { useDrawerBody } from '../../Drawer/DrawerBody';
import { useArrowNavigationGroup } from '../../../hooks/focusgroup';

/**
 * Create the state required to render NavDrawerBody.
 * Arrow up/down move between the navigation items, wrapping around at the ends.
 */
export const useNavDrawerBody = (props: NavDrawerBodyProps, ref: React.Ref<HTMLElement>): NavDrawerBodyState => {
  const arrowNavigationAttributes = useArrowNavigationGroup({
    axis: 'vertical',
    circular: true,
  });
  const state = useDrawerBody({ role: 'navigation', ...props }, ref);

  if (state.root.focusgroup === undefined) {
    Object.assign(state.root, arrowNavigationAttributes);
  }

  return state;
};
