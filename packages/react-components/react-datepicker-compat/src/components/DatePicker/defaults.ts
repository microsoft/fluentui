import { defaultCalendarStrings } from '../Calendar/defaults';
import type { CalendarStrings } from '../../utils/index';
import type { DatePickerErrorType } from './DatePicker.types';

export const defaultDatePickerStrings: CalendarStrings = {
  ...defaultCalendarStrings,
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
};

export const defaultDatePickerErrorStrings: Record<DatePickerErrorType, string> = {
  'invalid-input': 'Invalid date format',
  'out-of-bounds': 'Date is out of bounds',
  'required-input': 'Field is required',
};
