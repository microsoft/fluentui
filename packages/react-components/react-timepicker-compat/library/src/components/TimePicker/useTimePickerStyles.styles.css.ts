'use client';

import { clsx } from 'clsx';
import { useComboboxStyles_unstable } from '@fluentui/react-combobox';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { TimePickerSlots, TimePickerState } from './TimePicker.types';
import styles from './TimePicker.module.css';

export const timePickerClassNames: SlotClassNames<TimePickerSlots> = {
  root: 'fui-TimePicker',
  input: 'fui-TimePicker__input',
  expandIcon: 'fui-TimePicker__expandIcon',
  clearIcon: 'fui-TimePicker__clearIcon',
  listbox: 'fui-TimePicker__listbox',
};

export const useTimePickerStyles_unstable = (state: TimePickerState): TimePickerState => {
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(timePickerClassNames.root, state.root.className);
  // eslint-disable-next-line react-hooks/immutability
  state.input.className = clsx(timePickerClassNames.input, state.input.className);
  if (state.expandIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.expandIcon.className = clsx(timePickerClassNames.expandIcon, state.expandIcon.className);
  }
  if (state.clearIcon) {
    // eslint-disable-next-line react-hooks/immutability
    state.clearIcon.className = clsx(timePickerClassNames.clearIcon, state.clearIcon.className);
  }
  if (state.listbox) {
    // eslint-disable-next-line react-hooks/immutability
    state.listbox.className = clsx(timePickerClassNames.listbox, styles.listbox, state.listbox.className);
  }
  useComboboxStyles_unstable(state);
  return state;
};
