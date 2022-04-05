import { defaultCalendarStrings } from '../../Calendar';
import type { IDatePickerStrings } from './DatePicker.types';

export const defaultDatePickerStrings: IDatePickerStrings = {
  ...defaultCalendarStrings,
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  isRequiredErrorMessage: 'Field is required',
  invalidInputErrorMessage: 'Invalid date format',
  isResetStatusMessage: 'Invalid entry "{0}", date reset to "{1}"',
};
