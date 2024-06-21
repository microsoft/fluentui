import { useCalendarPickerStyles_unstable } from '../CalendarPicker/useCalendarPickerStyles.styles';
import type { CalendarYearStyleProps, CalendarYearStyles } from './CalendarYear.types';

/**
 * @internal
 *
 * Apply styling to the CalendarYear slots based on the state
 */
export const useCalendarYearStyles_unstable = (props: CalendarYearStyleProps): CalendarYearStyles => {
  'use no memo';

  return useCalendarPickerStyles_unstable(props);
};
