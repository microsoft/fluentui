import { clsx } from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';
import styles from './DatePicker.module.css';

export const datePickerClassNames: SlotClassNames<DatePickerSlots> = {
  root: 'fui-DatePicker',
  calendar: 'fui-DatePicker__calendar',
  popupSurface: 'fui-DatePicker__popupSurface',
};

export const useDatePickerStyles_unstable = (state: DatePickerState): DatePickerState => {
  state.root.className = clsx(
    datePickerClassNames.root,
    styles.root,
    state.disabled && styles.disabled,
    state.root.className,
  );
  if (state.popupSurface) {
    state.popupSurface.className = clsx(
      datePickerClassNames.popupSurface,
      styles.popupSurface,
      state.inlinePopup && styles.inline,
      state.popupSurface.className,
    );
  }
  state.calendar.className = clsx(datePickerClassNames.calendar, state.calendar.className);
  return state;
};
