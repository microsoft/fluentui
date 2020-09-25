import { IWeeklyDayPickerStrings } from './WeeklyDayPicker.types';
import { defaultDayPickerStrings } from '../../Calendar';

export const WeeklyDayPickerStrings: IWeeklyDayPickerStrings = {
  ...defaultDayPickerStrings,
  prevWeekAriaLabel: 'Previous week',
  nextWeekAriaLabel: 'Next week',
};
