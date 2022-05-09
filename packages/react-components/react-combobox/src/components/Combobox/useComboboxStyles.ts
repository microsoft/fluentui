import { SlotClassNames } from '@fluentui/react-utilities';
import { ComboboxBaseState } from '../ComboboxBase/ComboboxBase.types';
import { useComboboxBaseStyles_unstable } from '../ComboboxBase/useComboboxBaseStyles';
import type { ComboboxSlots, ComboboxState } from './Combobox.types';

export const comboboxClassNames: SlotClassNames<ComboboxSlots> = {
  root: 'fui-Combobox',
  listbox: 'fui-Combobox__listbox',
  input: 'fui-Combobox__input',
};

/**
 * Apply styling to the Combobox slots based on the state
 */
export const useComboboxStyles_unstable = (state: ComboboxState): ComboboxState => {
  return useComboboxBaseStyles_unstable(state as ComboboxBaseState) as ComboboxState;
};
