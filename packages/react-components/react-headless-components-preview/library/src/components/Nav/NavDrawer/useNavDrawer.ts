'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';

import { Drawer } from '../../Drawer';
import { useNav } from '../useNav';
import type { NavDrawerProps, NavDrawerState } from './NavDrawer.types';

/**
 * Create the state required to render NavDrawer.
 *
 * Combines headless Nav state with a headless Drawer as root.
 *
 * @param props - props from this instance of NavDrawer
 * @param ref - reference to root HTMLElement of NavDrawer
 */
export const useNavDrawer = (props: NavDrawerProps, ref: React.Ref<HTMLElement>): NavDrawerState => {
  const navState = useNav(props, ref as React.Ref<HTMLDivElement>);

  return {
    ...navState,
    components: {
      root: Drawer,
    },
    root: slot.always(
      { ref: ref as React.Ref<HTMLDivElement>, ...props },
      {
        elementType: Drawer,
      },
    ),
  };
};
