import * as React from 'react';
import { Portal } from '@fluentui/react-portal';
import { getSlots } from '@fluentui/react-utilities';
import type { ComboboxContextValues, ComboboxBaseState, ComboboxBaseSlots } from './ComboboxBase.types';
import { ComboboxContext } from '../../contexts/ComboboxContext';

/**
 * Render the final JSX of ComboboxBase
 */
export const renderComboboxBase_unstable = (state: ComboboxBaseState, contextValues: ComboboxContextValues) => {
  const { slots, slotProps } = getSlots<ComboboxBaseSlots>(state);

  const listbox = <slots.listbox {...slotProps.listbox}>{slotProps.root.children}</slots.listbox>;
  const popup = state.inline ? listbox : <Portal>{listbox}</Portal>;

  return (
    <slots.root {...slotProps.root}>
      <ComboboxContext.Provider value={contextValues.combobox}>
        <slots.input {...slotProps.input} />
        {state.open ? popup : null}
      </ComboboxContext.Provider>
    </slots.root>
  );
};
