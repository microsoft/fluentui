'use client';

import { useCalendarPickerStyles_unstable } from '../CalendarPicker/useCalendarPickerStyles.styles.css';
import type { CalendarYearStyleProps, CalendarYearStyles } from './CalendarYear.types';

/**
 * Apply styling to the CalendarYear slots based on the state
 *
 * @internal
 */
export const useCalendarYearStyles_unstable = (props: CalendarYearStyleProps): CalendarYearStyles => {
  return useCalendarPickerStyles_unstable(props);
};
