import { IDatePickerStrings } from '@uifabric/date-time';
import { defaultDayPickerStrings } from '@uifabric/date-time';

export const DayPickerStrings: IDatePickerStrings = {
  ...defaultDayPickerStrings,
  isRequiredErrorMessage: 'Field is required.',
  invalidInputErrorMessage: 'Invalid date format.'
};
