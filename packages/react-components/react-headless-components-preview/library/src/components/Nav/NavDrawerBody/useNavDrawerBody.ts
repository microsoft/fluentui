'use client';

import type * as React from 'react';
import type { NavDrawerBodyProps, NavDrawerBodyState } from './NavDrawerBody.types';
import { useDrawerBody } from '../../Drawer/DrawerBody';

export const useNavDrawerBody = (props: NavDrawerBodyProps, ref: React.Ref<HTMLElement>): NavDrawerBodyState => {
  const state = useDrawerBody(props, ref);

  // eslint-disable-next-line react-compiler/react-compiler
  state.root.role = 'navigation';

  return state;
};
