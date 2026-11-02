'use client';

import type * as React from 'react';
import { useDrawerHeader } from '../../Drawer/DrawerHeader';
import type { NavDrawerHeaderProps, NavDrawerHeaderState } from './NavDrawerHeader.types';

/**
 * Create the state required to render NavDrawerHeader.
 *
 * @param props - props from this instance of NavDrawerHeader
 * @param ref - reference to root HTMLElement of NavDrawerHeader
 */
export const useNavDrawerHeader = (props: NavDrawerHeaderProps, ref: React.Ref<HTMLElement>): NavDrawerHeaderState => {
  return useDrawerHeader(props, ref);
};
