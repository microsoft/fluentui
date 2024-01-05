import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TimePickerSlots, TimePickerState } from './TimePicker.types';
import { useComboboxStyles_unstable } from '@fluentui/react-combobox';

/**
 * @deprecated
 */
export const timePickerClassNames: SlotClassNames<TimePickerSlots> = {
  root: 'fui-TimePicker',
  input: 'fui-TimePicker__input',
  expandIcon: 'fui-TimePicker__expandIcon',
  listbox: 'fui-TimePicker__listbox',
};

const useStyles = makeStyles({
  listbox: {
    maxHeight: 'min(80vh, 416px)', // height for 12 items or 80vh, whichever is smaller
  },
});

/**
 * Apply styling to the TimePicker slots based on the state
 * @deprecated
 */
export const useTimePickerStyles_unstable = (state: TimePickerState): TimePickerState => {
  const styles = useStyles();

  state.root.className = mergeClasses(timePickerClassNames.root, state.root.className);

  state.input.className = mergeClasses(timePickerClassNames.input, state.input.className);

  if (state.expandIcon) {
    state.expandIcon.className = mergeClasses(timePickerClassNames.expandIcon, state.expandIcon.className);
  }

  if (state.listbox) {
    state.listbox.className = mergeClasses(timePickerClassNames.listbox, styles.listbox, state.listbox.className);
  }

  useComboboxStyles_unstable(state);

  return state;
};
