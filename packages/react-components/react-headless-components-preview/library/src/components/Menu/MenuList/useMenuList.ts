'use client';

import type * as React from 'react';
import { useMergedRefs } from '@fluentui/react-utilities';
import { useMenuListBase_unstable } from '@fluentui/react-menu';
import type { MenuListProps, MenuListState } from './MenuList.types';
import { useArrowNavigationGroup } from '../../../hooks/focusgroup';

/**
 * Returns the state for a MenuList.
 * Uses the native focusgroup attribute for arrow key navigation. Focus is moved
 * into the list by MenuPopover via the HTML autofocus attribute on the first
 * focusable MenuItem (set imperatively because React skips autoFocus on divs).
 */
export const useMenuList = (props: MenuListProps, ref: React.Ref<HTMLElement>): MenuListState => {
  const baseState: MenuListState = useMenuListBase_unstable(props, ref);

  const { ref: focusgroupRef, ...arrowNavigationAttributes } = useArrowNavigationGroup({
    axis: 'vertical',
    circular: true,
    behavior: 'menu',
  });

  Object.assign(baseState.root, arrowNavigationAttributes);

  // eslint-disable-next-line react-hooks/immutability
  baseState.root.ref = useMergedRefs(baseState.root.ref, focusgroupRef);

  return baseState;
};
