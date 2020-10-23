import { ICalendarNavigationIcons } from './Calendar.types';
import { ICalendarStrings, DEFAULT_CALENDAR_STRINGS } from '@fluentui/date-time-utilities';

export const defaultCalendarStrings: ICalendarStrings = DEFAULT_CALENDAR_STRINGS;

/**
 * @deprecated Use `defaultCalendarStrings`
 */
export const defaultDayPickerStrings = defaultCalendarStrings;

export const defaultCalendarNavigationIcons: ICalendarNavigationIcons = {
  leftNavigation: 'Up',
  rightNavigation: 'Down',
  closeIcon: 'CalculatorMultiply',
};
