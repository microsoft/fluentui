'use client';

import * as React from 'react';
import { useFocusFinders } from '@fluentui/react-tabster';
import type { MenuBaseState } from './Menu.types';

/**
 * Focuses the first focusable element when Menu opens, including on initial mount.
 * Compose with the stable refs returned by a Menu state hook.
 */
export const useMenuFocusFirst_unstable = (state: Pick<MenuBaseState, 'open' | 'menuPopoverRef'>): void => {
  const { open, menuPopoverRef } = state;
  const { findFirstFocusable } = useFocusFinders();

  React.useEffect(() => {
    if (open) {
      findFirstFocusable(menuPopoverRef.current)?.focus();
    }
  }, [open, menuPopoverRef, findFirstFocusable]);
};
