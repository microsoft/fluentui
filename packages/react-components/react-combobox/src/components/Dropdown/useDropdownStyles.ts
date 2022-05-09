import type { SlotClassNames } from '@fluentui/react-utilities';
import { useComboboxBaseStyles_unstable } from '../ComboboxBase/useComboboxBaseStyles';
import type { ComboboxBaseState } from '../ComboboxBase/ComboboxBase.types';
import type { DropdownSlots, DropdownState } from './Dropdown.types';

export const dropdownClassNames: SlotClassNames<DropdownSlots> = {
  root: 'fui-Dropdown',
  listbox: 'fui-Dropdown__listbox',
  input: 'fui-Dropdown__input',
};

/**
 * Apply styling to the Dropdown slots based on the state
 */
export const useDropdownStyles_unstable = (state: DropdownState): DropdownState => {
  return useComboboxBaseStyles_unstable(state as ComboboxBaseState) as DropdownState;
};
