'use client';

import { useCalendarPickerStyles_unstable } from '../CalendarPicker/useCalendarPickerStyles.styles';
import type { CalendarMonthStyleProps, CalendarMonthStyles } from './CalendarMonth.types';

/**
 * Apply styling to the CalendarMonth slots based on the state
 *
 * @internal
 */
export const useCalendarMonthStyles_unstable = (props: CalendarMonthStyleProps): CalendarMonthStyles => {
  'use no memo';

  return useCalendarPickerStyles_unstable(props);
};
