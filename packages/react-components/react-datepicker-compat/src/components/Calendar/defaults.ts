import { DEFAULT_CALENDAR_STRINGS } from '../../utils';
import type { CalendarNavigationIcons } from './Calendar.types';
import type { CalendarStrings } from '../../utils';

export const defaultCalendarStrings: CalendarStrings = DEFAULT_CALENDAR_STRINGS;

/**
 * @deprecated Use `defaultCalendarStrings`
 */
export const defaultDayPickerStrings = defaultCalendarStrings;

export const defaultCalendarNavigationIcons: CalendarNavigationIcons = {
  leftNavigation: 'Up',
  rightNavigation: 'Down',
  closeIcon: 'CalculatorMultiply',
};
