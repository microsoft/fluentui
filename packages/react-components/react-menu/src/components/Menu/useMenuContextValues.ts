import type { MenuContextValues, MenuState } from './Menu.types';

export function useMenuContextValues_unstable(state: MenuState): MenuContextValues {
  const {
    checkedValues,
    defaultCheckedValues,
    hasCheckmarks,
    hasIcons,
    inline,
    isSubmenu,
    menuPopoverRef,
    onCheckedValueChange,
    open,
    openOnContext,
    openOnHover,
    persistOnItemClick,
    setOpen,
    triggerId,
    triggerRef,
  } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const menu = {
    checkedValues,
    defaultCheckedValues,
    hasCheckmarks,
    hasIcons,
    inline,
    isSubmenu,
    menuPopoverRef,
    onCheckedValueChange,
    open,
    openOnContext,
    openOnHover,
    persistOnItemClick,
    setOpen,
    triggerId,
    triggerRef,
  };

  return { menu };
}
