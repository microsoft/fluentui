import type { DatePickerErrorType } from './DatePicker.types';

/** Default validation messages. Applications may supply localized messages to Field. */
export const defaultDatePickerErrorStrings: Record<DatePickerErrorType, string> = {
  'invalid-input': 'Invalid date format',
  'out-of-bounds': 'Date is out of bounds',
  'required-input': 'Field is required',
};
