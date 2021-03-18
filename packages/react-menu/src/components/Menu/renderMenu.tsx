import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuState } from './Menu.types';
import { menuShorthandProps } from './useMenu';
import { MenuProvider } from '../../menuContext';

/**
 * Render the final JSX of Menu
 * {@docCategory Menu }
 */
export const renderMenu = (state: MenuState) => {
  const { slots, slotProps } = getSlots(state, menuShorthandProps);
  const {
    open,
    setOpen,
    onCheckedValueChange,
    checkedValues,
    defaultCheckedValues,
    onHover,
    onContext,
    triggerRef,
    triggerId,
  } = state;

  return (
    <MenuProvider
      value={{
        open,
        setOpen,
        onCheckedValueChange,
        checkedValues,
        defaultCheckedValues,
        hasMenuContext: true,
        triggerRef,
        onHover,
        onContext,
        triggerId,
      }}
    >
      {state.menuTrigger}
      {state.open && <slots.menuPopup {...slotProps.menuPopup} />}
    </MenuProvider>
  );
};
