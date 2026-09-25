'use client';

import type * as React from 'react';
import { slot } from '@fluentui/react-utilities';
import { Drawer } from '../../Drawer/Drawer';
import type { NavProps } from '../Nav.types';
import { useNav } from '../useNav';
import type { NavDrawerProps, NavDrawerState } from './NavDrawer.types';

export const useNavDrawer = (props: NavDrawerProps, ref: React.Ref<HTMLElement>): NavDrawerState => {
  const { density = 'medium', size, tabbable = false, ...rest } = props;
  const type = props.type ?? 'overlay';
  const navState = useNav({ ...(rest as NavProps), density }, ref as React.Ref<HTMLDivElement>);
  const root: NavDrawerState['root'] = slot.always(
    {
      ...rest,
      'data-nav-default-size': size === undefined ? '' : undefined,
      'data-type': type,
      ref,
      role: 'navigation',
      size,
    },
    { elementType: Drawer },
  );

  return {
    ...navState,
    components: {
      root: Drawer,
    },
    density,
    root,
    size,
    tabbable,
  };
};
