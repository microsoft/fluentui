import { useCalendarPickerStyles_unstable } from '../CalendarPicker/useCalendarPickerStyles.styles';
import type { CalendarMonthStyleProps, CalendarMonthStyles } from './CalendarMonth.types';

/**
 *  @internal
 *
 * Apply styling to the CalendarMonth slots based on the state
 */
export const useCalendarMonthStyles_unstable = (props: CalendarMonthStyleProps): CalendarMonthStyles => {
  'use no memo';

  return useCalendarPickerStyles_unstable(props);
};
