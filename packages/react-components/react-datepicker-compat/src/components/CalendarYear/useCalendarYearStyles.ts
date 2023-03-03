import { useCalendarPickerStyles_unstable } from '../CalendarPicker/useCalendarPickerStyles';
import type { CalendarYearStyleProps, CalendarYearStyles } from './CalendarYear.types';

/**
 * Apply styling to the CalendarYear slots based on the state
 */
export const useCalendarYearStyles_unstable = (props: CalendarYearStyleProps): CalendarYearStyles => {
  return useCalendarPickerStyles_unstable(props);
};
