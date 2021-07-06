import * as React from 'react';
import { MenuState } from './Menu.types';
import { MenuProvider } from '../../contexts/menuContext';

/**
 * Render the final JSX of Menu
 * {@docCategory Menu }
 */
export const renderMenu = (state: MenuState) => {
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

  return (
    <MenuProvider
      value={{
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
        hasMenuContext: true,
        hasCheckmarks,
        hasIcons,
        persistOnItemClick,
        inline,
      }}
    >
      {state.menuTrigger}
      {state.open && state.menuPopover}
    </MenuProvider>
  );
};
