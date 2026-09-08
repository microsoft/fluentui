'use client';

import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TimePickerSlots, TimePickerState } from './TimePicker.types';
import { useComboboxStyles_unstable } from '@fluentui/react-combobox';

export const timePickerClassNames: SlotClassNames<TimePickerSlots> = {
  root: 'fui-TimePicker',
  input: 'fui-TimePicker__input',
  expandIcon: 'fui-TimePicker__expandIcon',
  clearIcon: 'fui-TimePicker__clearIcon',
  listbox: 'fui-TimePicker__listbox',
};

const useStyles = makeStyles({
  listbox: {
    maxHeight: 'min(80vh, 416px)', // height for 12 items or 80vh, whichever is smaller
  },
});

/**
 * Apply styling to the TimePicker slots based on the state
 */
export const useTimePickerStyles_unstable = (state: TimePickerState): TimePickerState => {
  const styles = useStyles();

  // eslint-disable-next-line react-hooks/immutability
  state.root.className = mergeClasses(timePickerClassNames.root, state.root.className);

  // eslint-disable-next-line react-hooks/immutability
  state.input.className = mergeClasses(timePickerClassNames.input, state.input.className);

  if (state.expandIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.expandIcon.className = mergeClasses(timePickerClassNames.expandIcon, state.expandIcon.className);
  }

  if (state.clearIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.clearIcon.className = mergeClasses(timePickerClassNames.clearIcon, state.clearIcon.className);
  }

  if (state.listbox) {
    // eslint-disable-next-line react-hooks/immutability
    state.listbox.className = mergeClasses(timePickerClassNames.listbox, styles.listbox, state.listbox.className);
  }

  useComboboxStyles_unstable(state);

  return state;
};
