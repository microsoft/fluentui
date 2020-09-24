import { IDatePickerStrings } from './DatePicker.types';
import { defaultDayPickerStrings } from '../../Calendar';

export const DayPickerStrings: IDatePickerStrings = {
  ...defaultDayPickerStrings,
  isRequiredErrorMessage: 'Field is required.',
  invalidInputErrorMessage: 'Invalid date format.',
};
