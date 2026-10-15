'use client';

import * as React from 'react';
import type { MenuContextValues, MenuState } from './Menu.types';

export function useMenuContextValues_unstable(state: MenuState): MenuContextValues {
  const {
    checkedValues,
    disableAutoFocus = false,
    hasCheckmarks,
    hasIcons,
    inline,
    isSubmenu,
    menuPopoverRef,
    mountNode,
    onCheckedValueChange,
    open,
    openOnContext,
    openOnHover,
    persistOnItemClick,
    safeZone,
    setOpen,
    triggerId,
    triggerRef,
  } = state;

  const menu = React.useMemo(
    () => ({
      checkedValues,
      disableAutoFocus,
      hasCheckmarks,
      hasIcons,
      inline,
      isSubmenu,
      menuPopoverRef,
      mountNode,
      onCheckedValueChange,
      open,
      openOnContext,
      openOnHover,
      persistOnItemClick,
      safeZone,
      setOpen,
      triggerId,
      triggerRef,
    }),
    [
      checkedValues,
      disableAutoFocus,
      hasCheckmarks,
      hasIcons,
      inline,
      isSubmenu,
      menuPopoverRef,
      mountNode,
      onCheckedValueChange,
      open,
      openOnContext,
      openOnHover,
      persistOnItemClick,
      safeZone,
      setOpen,
      triggerId,
      triggerRef,
    ],
  );

  return { menu };
}
