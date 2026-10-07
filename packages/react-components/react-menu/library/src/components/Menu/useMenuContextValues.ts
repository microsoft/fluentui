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
    unstable_disableAutoFocus: disableAutoFocus,
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
      // eslint-disable-next-line @typescript-eslint/naming-convention -- matches the unstable Popover API
      unstable_disableAutoFocus: disableAutoFocus,
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
      disableAutoFocus,
    ],
  );

  return { menu };
}
