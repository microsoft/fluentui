/** @jsxRuntime classic */
/** @jsx createElement */
import { Portal } from '@fluentui/react-portal';

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import { ComboboxContext } from '../../contexts/ComboboxContext';
import type { ComboboxContextValues, ComboboxState, ComboboxSlots } from './Combobox.types';

/**
 * Render the final JSX of Combobox
 */
export const renderCombobox_unstable = (state: ComboboxState, contextValues: ComboboxContextValues) => {
  const { slots, slotProps } = getSlotsNext<ComboboxSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <ComboboxContext.Provider value={contextValues.combobox}>
        <slots.input {...slotProps.input} />
        {slots.expandIcon && <slots.expandIcon {...slotProps.expandIcon} />}
        {slots.listbox &&
          (state.inlinePopup ? (
            <slots.listbox {...slotProps.listbox} />
          ) : (
            <Portal {...slotProps.portal}>
              <slots.listbox {...slotProps.listbox} />
            </Portal>
          ))}
      </ComboboxContext.Provider>
    </slots.root>
  );
};
