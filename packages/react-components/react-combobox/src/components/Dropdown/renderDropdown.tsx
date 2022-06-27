import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { DropdownContextValues, DropdownState, DropdownSlots } from './Dropdown.types';

/**
 * Render the final JSX of Dropdown
 */
export const renderDropdown_unstable = (state: DropdownState, contextValues: DropdownContextValues) => {
  const { slots, slotProps } = getSlots<DropdownSlots>(state);

  const listbox = <slots.listbox {...slotProps.listbox}>{slotProps.root.children}</slots.listbox>;
  const popup = state.inlinePopup ? listbox : <Portal>{listbox}</Portal>;

  return (
    <slots.root {...slotProps.root}>
      <ComboboxContext.Provider value={contextValues.combobox}>
        <slots.button {...slotProps.button}>
          {slotProps.button.children}
          {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
        </slots.button>
        {state.open ? popup : null}
      </ComboboxContext.Provider>
    </slots.root>
  );
};
