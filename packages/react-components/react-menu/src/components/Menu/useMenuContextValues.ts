import type { MenuContextValues, MenuState } from './Menu.types';

export function useMenuContextValues_unstable(state: MenuState): MenuContextValues {
  const {
    checkedValues,
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
    autoSize,
  } = state;

  // This context is created with "@fluentui/react-context-selector", these is no sense to memoize it
  const menu = {
    checkedValues,
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
    autoSize,
  };

  return { menu };
}
