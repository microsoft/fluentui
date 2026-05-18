'use client';

import type * as React from 'react';
import { useMenuListBase_unstable } from '@fluentui/react-menu';
import type { MenuListProps, MenuListState } from './MenuList.types';

/**
 * Returns the state for a MenuList.
 * Uses the native focusgroup attribute for arrow key navigation. Focus is moved
 * into the list by MenuPopover via the HTML autofocus attribute on the first
 * focusable MenuItem (set imperatively because React skips autoFocus on divs).
 */
export const useMenuList = (props: MenuListProps, ref: React.Ref<HTMLElement>): MenuListState => {
  const baseState = useMenuListBase_unstable(props, ref) as MenuListState;

  // eslint-disable-next-line react-compiler/react-compiler -- attribute is mutated to opt into the focusgroup polyfill.
  baseState.root.focusgroup = 'menu block wrap';

  return baseState;
};
