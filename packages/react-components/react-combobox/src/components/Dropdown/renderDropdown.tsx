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

  return (
    <slots.root {...slotProps.root}>
      <ComboboxContext.Provider value={contextValues.combobox}>
        <slots.button {...slotProps.button}>
          {slotProps.button.children}
          {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
        </slots.button>
        {slots.listbox &&
          (state.inlinePopup ? (
            <slots.listbox {...slotProps.listbox} />
          ) : (
            <Portal>
              <slots.listbox {...slotProps.listbox} />
            </Portal>
          ))}
      </ComboboxContext.Provider>
    </slots.root>
  );
};
