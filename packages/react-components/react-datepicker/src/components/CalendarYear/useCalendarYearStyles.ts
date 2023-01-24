import { useCalendarPickerStyles_unstable } from '../CalendarPicker/useCalendarPickerStyles';
import type { SlotClassNames } from '@fluentui/react-utilities';
import type { CalendarYearSlots, CalendarYearStyleProps, CalendarYearStyles } from './CalendarYear.types';

export const CalendarYearClassNames: SlotClassNames<CalendarYearSlots> = {
  root: 'fui-CalendarYear',
};
/**
 * Apply styling to the CalendarYear slots based on the state
 */
export const useCalendarYearStyles_unstable = (
  props: CalendarYearStyleProps,
): Record<keyof CalendarYearStyles, string> => {
  return useCalendarPickerStyles_unstable(props);
};
