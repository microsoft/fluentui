import { DateRangeType, DayOfWeek } from '../dateValues/dateValues';
import { isContiguous } from './isContiguous';
/**
 * Return corrected date range type, given `dateRangeType` and list of working days.
 * For non-contiguous working days and working week range type, returns general week range type.
 * For other cases returns input date range type.
 * @param dateRangeType - input type of range
 * @param workWeekDays - list of working days in a week
 */
export const getDateRangeTypeToUse = (
  dateRangeType: DateRangeType,
  workWeekDays: DayOfWeek[] | undefined,
  firstDayOfWeek: DayOfWeek,
): DateRangeType => {
  if (workWeekDays && dateRangeType === DateRangeType.WorkWeek) {
    if (!isContiguous(workWeekDays, true, firstDayOfWeek) || workWeekDays.length === 0) {
      return DateRangeType.Week;
    }
  }

  return dateRangeType;
};
