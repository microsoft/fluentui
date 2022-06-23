import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import type { ComboboxState, ComboboxSlots, ComboboxContextValues } from './Combobox.types';
import { ComboboxContext } from '../../contexts/ComboboxContext';

/**
 * Render the final JSX of Combobox
 */
export const renderCombobox_unstable = (state: ComboboxState, contextValues: ComboboxContextValues) => {
  const { slots, slotProps } = getSlots<ComboboxSlots>(state);

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
