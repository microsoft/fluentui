import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { ComboboxContextValues, ComboboxState, ComboboxSlots } from './Combobox.types';

/**
 * Render the final JSX of Combobox
 */
export const renderCombobox_unstable = (state: ComboboxState, contextValues: ComboboxContextValues) => {
  const { slots, slotProps } = getSlots<ComboboxSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <ComboboxContext.Provider value={contextValues.combobox}>
        <slots.input {...slotProps.input} />
        {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
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
