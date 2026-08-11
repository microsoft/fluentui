'use client';

import type * as React from 'react';
import { useNavItemBase_unstable } from '@fluentui/react-nav';
import { stringifyDataAttribute } from '../../../utils';
import type { NavItemProps, NavItemState } from './NavItem.types';

export const useNavItem = (
  props: NavItemProps,
  ref: React.Ref<HTMLButtonElement | HTMLAnchorElement>,
): NavItemState => {
  const state: NavItemState = useNavItemBase_unstable(props, ref);

  // eslint-disable-next-line react-hooks/immutability
  state.root['data-selected'] = stringifyDataAttribute(state.selected);

  return state;
};
