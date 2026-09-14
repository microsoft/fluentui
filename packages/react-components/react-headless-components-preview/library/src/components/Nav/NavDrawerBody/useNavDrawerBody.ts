'use client';

import type * as React from 'react';
import type { NavDrawerBodyProps, NavDrawerBodyState } from './NavDrawerBody.types';
import { useDrawerBody } from '../../Drawer/DrawerBody';

/**
 * Create the state required to render NavDrawerBody.
 */
export const useNavDrawerBody = (props: NavDrawerBodyProps, ref: React.Ref<HTMLElement>): NavDrawerBodyState => {
  const state: NavDrawerBodyState = useDrawerBody(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root.role = 'navigation';

  return state;
};
