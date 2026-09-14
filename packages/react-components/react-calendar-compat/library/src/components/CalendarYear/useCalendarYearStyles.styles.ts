'use client';

import { useCalendarPickerStyles_unstable } from '../CalendarPicker/useCalendarPickerStyles.styles';
import type { CalendarYearStyleProps, CalendarYearStyles } from './CalendarYear.types';

/**
 * Apply styling to the CalendarYear slots based on the state
 *
 * @internal
 */
export const useCalendarYearStyles_unstable = (props: CalendarYearStyleProps): CalendarYearStyles => {
  'use no memo'; // justified: compiler would optimize useCalendarYearStyles_unstable — manual opt-out to preserve runtime behavior

  return useCalendarPickerStyles_unstable(props);
};
