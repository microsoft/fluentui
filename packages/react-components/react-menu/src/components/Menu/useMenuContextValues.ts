import type { MenuContextValues, MenuState } from './Menu.types';

export function useMenuContextValues_unstable(state: MenuState): MenuContextValues {
  const {
    open,
    setOpen,
    onCheckedValueChange,
    checkedValues,
    defaultCheckedValues,
    openOnHover,
    openOnContext,
    triggerRef,
    triggerId,
    menuPopoverRef,
    isSubmenu,
    hasCheckmarks,
    hasIcons,
    persistOnItemClick,
    inline,
  } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const menu = {
    open,
    setOpen,
    onCheckedValueChange,
    checkedValues,
    defaultCheckedValues,
    triggerRef,
    openOnHover,
    openOnContext,
    triggerId,
    menuPopoverRef,
    isSubmenu,
    hasCheckmarks,
    hasIcons,
    persistOnItemClick,
    inline,
  };

  return { menu };
}
