import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { DropdownState } from './Dropdown.types';
import { dropdownShorthandProps } from './useDropdown';
import { DropdownProvider } from '../../contexts/dropdownContext';

/**
 * Render the final JSX of Dropdown
 * {@docCategory Dropdown }
 */
export const renderDropdown = (state: DropdownState) => {
  const { slots, slotProps } = getSlots(state, dropdownShorthandProps);
  const { open, setOpen, triggerRef, triggerId, dropdownPopupRef } = state;

  return (
    <DropdownProvider
      value={{
        open,
        setOpen,
        triggerRef,
        triggerId,
        dropdownPopupRef,
        hasDropdownContext: true,
      }}
    >
      {state.dropdownTrigger}
      {state.open && <slots.dropdownPopup {...slotProps.dropdownPopup} />}
    </DropdownProvider>
  );
};
