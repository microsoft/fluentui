import { mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TimePickerSlots, TimePickerState } from './TimePicker.types';
import { useComboboxStyles_unstable } from '@fluentui/react-combobox';

export const timePickerClassNames: SlotClassNames<TimePickerSlots> = {
  root: 'fui-TimePicker',
  input: 'fui-TimePicker__input',
  expandIcon: 'fui-TimePicker__expandIcon',
  listbox: 'fui-TimePicker__listbox',
};

/**
 * Apply styling to the TimePicker slots based on the state
 */
export const useTimePickerStyles_unstable = (state: TimePickerState): TimePickerState => {
  useComboboxStyles_unstable(state);

  state.root.className = mergeClasses(timePickerClassNames.root, state.root.className);

  state.input.className = mergeClasses(timePickerClassNames.input, state.input.className);

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(timePickerClassNames.expandIcon, state.expandIcon.className);
  }

  if (state.listbox) {
    state.listbox.className = mergeClasses(timePickerClassNames.listbox, state.listbox.className);
  }

  return state;
};
