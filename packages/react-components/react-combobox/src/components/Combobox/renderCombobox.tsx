import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import type { ComboboxContextValues } from '../../ComboboxBase/ComboboxBase.types';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { ComboboxState, ComboboxSlots } from './Combobox.types';

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
        <slots.input {...slotProps.input} />
        {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
        {state.open ? popup : null}
      </ComboboxContext.Provider>
    </slots.root>
  );
};
