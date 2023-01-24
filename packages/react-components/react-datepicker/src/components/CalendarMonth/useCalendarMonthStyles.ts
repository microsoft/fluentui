import { useCalendarPickerStyles_unstable } from '../CalendarPicker/useCalendarPickerStyles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarMonthSlots, CalendarMonthStyleProps, CalendarMonthStyles } from './CalendarMonth.types';

export const calendarMonthClassNames: SlotClassNames<CalendarMonthSlots> = {
  root: 'fui-CalendarMonth',
};
/**
 * Apply styling to the CalendarMonth slots based on the state
 */
export const useCalendarMonthStyles_unstable = (
  props: CalendarMonthStyleProps,
): Record<keyof CalendarMonthStyles, string> => {
  return useCalendarPickerStyles_unstable(props);
};
