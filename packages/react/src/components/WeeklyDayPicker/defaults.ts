import { DEFAULT_CALENDAR_STRINGS } from '@fluentui/date-time-utilities';
import type { IWeeklyDayPickerStrings, IWeeklyDayPickerNavigationIcons } from './WeeklyDayPicker.types';

export const defaultWeeklyDayPickerStrings: IWeeklyDayPickerStrings = {
  ...DEFAULT_CALENDAR_STRINGS,
  prevWeekAriaLabel: 'Previous week',
  nextWeekAriaLabel: 'Next week',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
};

export const defaultWeeklyDayPickerNavigationIcons: IWeeklyDayPickerNavigationIcons = {
  leftNavigation: 'ChevronLeft',
  rightNavigation: 'ChevronRight',
};
