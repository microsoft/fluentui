import { makeStyles, mergeClasses } from '@griffel/react';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { DatePickerSlots, DatePickerState } from './DatePicker.types';

export const datePickerClassNames: SlotClassNames<DatePickerSlots> = {
  root: 'fui-DatePicker',
  calendar: 'fui-DatePicker__calendar',
  popover: 'fui-DatePicker__popover',
  popoverSurface: 'fui-DatePicker__popoverSurface',
};

const useStyles = makeStyles({
  base: {
    position: 'relative',
    cursor: 'pointer',
    '& input': {
      cursor: 'pointer',
    },
  },
  disabled: {
    cursor: 'default',
    '& input': {
      cursor: 'default',
    },
  },
});

/**
 * Apply styling to the DatePicker slots based on the state
 */
export const useDatePickerStyles_unstable = (state: DatePickerState): DatePickerState => {
  const styles = useStyles();
  const { disabled } = state;

  state.root.className = mergeClasses(
    datePickerClassNames.root,
    styles.base,
    disabled && styles.disabled,
    state.root.className,
  );

  state.popoverSurface.className = mergeClasses(datePickerClassNames.popoverSurface, state.popoverSurface.className);

  state.calendar.className = mergeClasses(datePickerClassNames.calendar, state.calendar.className);

  return state;
};
