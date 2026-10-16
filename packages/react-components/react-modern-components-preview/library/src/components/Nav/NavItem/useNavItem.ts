'use client';

import type * as React from 'react';
import { useNavContext, useNavItem as useNavItemBase } from '@fluentui/react-headless-components-preview/nav';
import type { NavItemProps, NavItemState } from './NavItem.types';

export const useNavItem = (
  props: NavItemProps,
  ref: React.Ref<HTMLAnchorElement | HTMLButtonElement>,
): NavItemState => {
  const { density = 'medium' } = useNavContext();
  const state = useNavItemBase(props, ref);

  return {
    ...state,
    density,
    root: {
      ...state.root,
      'data-density': density,
    },
  };
};
