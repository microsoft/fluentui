import { DateRangeType, DayOfWeek } from '../dateValues/dateValues';

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
): DateRangeType => {
  if (workWeekDays && dateRangeType === DateRangeType.WorkWeek) {
    const sortedWWDays = workWeekDays.slice().sort();
    let isContiguous = true;
    for (let i = 1; i < sortedWWDays.length; i++) {
      if (sortedWWDays[i] !== sortedWWDays[i - 1] + 1) {
        isContiguous = false;
        break;
      }
    }

    if (!isContiguous || workWeekDays.length === 0) {
      return DateRangeType.Week;
    }
  }

  return dateRangeType;
};
