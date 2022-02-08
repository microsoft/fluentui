import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { ComboboxState, ComboboxSlots } from './Combobox.types';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import { ComboboxContextValues } from '../../contexts/ComboboxContext';

/**
 * Render the final JSX of Combobox
 */
export const renderCombobox = (state: ComboboxState, contextValues: ComboboxContextValues) => {
  const { slots, slotProps } = getSlots<ComboboxSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <ComboboxContext.Provider value={contextValues.combobox}>
        <slots.trigger {...slotProps.trigger} />
        {state.open ? <slots.listbox {...slotProps.listbox}>{slotProps.root.children}</slots.listbox> : null}
      </ComboboxContext.Provider>
    </slots.root>
  );
};
