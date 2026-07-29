'use client';

import type * as React from 'react';
import { useDrawerFooter } from '../../Drawer/DrawerFooter';
import type { NavDrawerFooterProps, NavDrawerFooterState } from './NavDrawerFooter.types';

/**
 * Create the state required to render NavDrawerFooter.
 *
 * @param props - props from this instance of NavDrawerFooter
 * @param ref - reference to root HTMLElement of NavDrawerFooter
 */
export const useNavDrawerFooter = (props: NavDrawerFooterProps, ref: React.Ref<HTMLElement>): NavDrawerFooterState => {
  return useDrawerFooter(props, ref);
};
