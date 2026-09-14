'use client';

import * as React from 'react';
import type { MenuContextValues, MenuState } from './Menu.types';

export function useMenuContextValues_unstable(state: MenuState): MenuContextValues {
  const {
    checkedValues,
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
