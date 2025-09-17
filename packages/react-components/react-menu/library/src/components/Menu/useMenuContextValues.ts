import type { MenuContextValues, MenuState } from './Menu.types';

export function useMenuContextValues_unstable(state: MenuState): MenuContextValues {
  const {
    checkedValues,
    hasCheckmarks,
    hasIcons,
    isSubmenu,
    menuPopoverRef,
    onCheckedValueChange,
    open,
    openOnContext,
    openOnHover,
    persistOnItemClick,
    safeZone,
    setOpen,
    triggerId,
    triggerRef,
    popoverId,
    positioning,
    submenuFallbackPositions,
  } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const menu = {
    checkedValues,
    hasCheckmarks,
    hasIcons,
    isSubmenu,
    menuPopoverRef,
    onCheckedValueChange,
    open,
    openOnContext,
    openOnHover,
    persistOnItemClick,
    safeZone,
    setOpen,
    triggerId,
    triggerRef,
    popoverId,
    positioning,
    submenuFallbackPositions,
  };

  return { menu };
}
