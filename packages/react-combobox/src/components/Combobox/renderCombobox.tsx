import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import type { ComboboxContextValues, ComboboxState, ComboboxSlots } from './Combobox.types';
import { ComboboxContext } from '../../contexts/ComboboxContext';

/**
 * Render the final JSX of Combobox
 */
export const renderCombobox_unstable = (state: ComboboxState, contextValues: ComboboxContextValues) => {
  const { slots, slotProps } = getSlots<ComboboxSlots>(state);

  const popup = state.inline ? state.listbox : <Portal>{state.listbox}</Portal>;

  return (
    <slots.root {...slotProps.root}>
      <ComboboxContext.Provider value={contextValues.combobox}>
        {state.root.children}
        {state.open ? popup : null}
      </ComboboxContext.Provider>
    </slots.root>
  );
};
