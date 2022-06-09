import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import type { ComboboxContextValues } from '../../ComboboxBase/ComboboxBase.types';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { DropdownState, DropdownSlots } from './Dropdown.types';

/**
 * Render the final JSX of Dropdown
 */
export const renderDropdown_unstable = (state: DropdownState, contextValues: ComboboxContextValues) => {
  const { slots, slotProps } = getSlots<DropdownSlots>(state);

  const listbox = <slots.listbox {...slotProps.listbox}>{slotProps.root.children}</slots.listbox>;
  const popup = state.inline ? listbox : <Portal>{listbox}</Portal>;

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
