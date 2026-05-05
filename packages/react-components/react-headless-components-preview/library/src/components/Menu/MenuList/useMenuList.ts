'use client';

import * as React from 'react';
import { useMenuListBase_unstable } from '@fluentui/react-menu';
import { useEventCallback, useMergedRefs } from '@fluentui/react-utilities';
import { useArrowNavigation } from './useArrowNavigation';
import type { MenuListProps, MenuListState } from './MenuList.types';

const MENU_ITEM_SELECTOR = ['[role="menuitem"]', '[role="menuitemcheckbox"]', '[role="menuitemradio"]'].join(', ');

/**
 * Returns the state for a MenuList.
 *
 * Builds on v9's `useMenuListBase_unstable` and layers on:
 * - **Arrow-key navigation** (ArrowDown / ArrowUp / Home / End) via a
 *   tabster-free roving-focus implementation.
 * - **`focusgroup` attribute** as a forward-compat hint for the WICG draft;
 *   it is a no-op in shipping browsers.
 *
 * Type-ahead (`setFocusByFirstCharacter`) is already wired by the base
 * hook through `useMenuItemBase_unstable` → `useCharacterSearch`.
 */
export const useMenuList = (props: MenuListProps, ref: React.Ref<HTMLElement>): MenuListState => {
  const baseState = useMenuListBase_unstable(props, ref) as MenuListState;
  const containerRef = React.useRef<HTMLElement>(null);
  const { onKeyDown: onArrowKeyDown } = useArrowNavigation(containerRef, {
    itemSelector: MENU_ITEM_SELECTOR,
    circular: true,
  });

  const { onKeyDown: baseOnKeyDown } = baseState.root;
  baseState.root.onKeyDown = useEventCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    onArrowKeyDown(event);
    baseOnKeyDown?.(event);
  });

  baseState.root.ref = useMergedRefs(baseState.root.ref, containerRef) as React.Ref<HTMLDivElement>;
  baseState.root.focusgroup ??= 'block wrap';

  return baseState;
};
