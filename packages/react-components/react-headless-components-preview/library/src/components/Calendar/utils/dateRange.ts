import { DAYS_IN_WEEK, DEFAULT_WORK_WEEK_DAYS } from './constants';
import type { DateRangeType, DayOfWeek } from './constants';
import {
  addDays,
  addMonths,
  compareDatePart,
  createDate,
  getDayFromIndex,
  getDayIndex,
  getStartDateOfWeek,
} from './dateMath';

/**
 * Returns the dates of the range that contains `date`.
 * @param workWeekDays - The days of a `workWeek` range. Defaults to Monday through Friday.
 * @param daysToSelectInDayView - The number of days of a `day` range; negative counts select backwards.
 * @throws RangeError if the date or day count is invalid, or the range is not representable.
 */
export const getDateRange = (
  date: Date,
  dateRangeType: DateRangeType,
  firstDayOfWeek: DayOfWeek,
  workWeekDays: readonly DayOfWeek[] = DEFAULT_WORK_WEEK_DAYS,
  daysToSelectInDayView: number = 1,
): Date[] => {
  if (!Number.isFinite(date.valueOf())) {
    throw new RangeError('date must be valid');
  }
  if (!Number.isInteger(daysToSelectInDayView)) {
    throw new RangeError('daysToSelectInDayView must be a finite integer');
  }
  if (dateRangeType === 'day' && daysToSelectInDayView === 0) {
    return [];
  }

  let startDate: Date;
  let endDate: Date;
  let maximumRangeLength: number;
  switch (dateRangeType) {
    case 'day':
      [startDate, endDate] = [date, addDays(date, daysToSelectInDayView)];
      maximumRangeLength = Math.abs(daysToSelectInDayView);
      if (compareDatePart(startDate, endDate) > 0) {
        // A backward range ends on the selected date.
        [startDate, endDate] = [addDays(endDate, 1), addDays(startDate, 1)];
      }
      break;
    case 'week':
    case 'workWeek':
      startDate = getStartDateOfWeek(date, firstDayOfWeek);
      endDate = addDays(startDate, DAYS_IN_WEEK);
      if (compareDatePart(date, endDate) >= 0) {
        startDate = addDays(startDate, DAYS_IN_WEEK);
        endDate = addDays(endDate, DAYS_IN_WEEK);
      }
      maximumRangeLength = DAYS_IN_WEEK;
      break;
    case 'month':
      startDate = createDate(date.getFullYear(), date.getMonth(), 1);
      endDate = addMonths(startDate, 1);
      maximumRangeLength = 31;
      break;
    default:
      throw new Error('Unexpected object: ' + dateRangeType);
  }
  if (!Number.isFinite(endDate.getTime())) {
    throw new RangeError('Date range end is outside the representable date range');
  }

  const workWeekDayIndices = workWeekDays.map(getDayIndex);
  const dates: Date[] = [];
  // The range-specific bound keeps a faulty date adapter from hanging rendering.
  let nextDate = startDate;
  for (let index = 0; index < maximumRangeLength && compareDatePart(nextDate, endDate) !== 0; index++) {
    if (dateRangeType !== 'workWeek' || workWeekDayIndices.includes(nextDate.getDay())) {
      dates.push(nextDate);
    }
    nextDate = addDays(nextDate, 1);
  }
  if (compareDatePart(nextDate, endDate) !== 0) {
    throw new Error('Date range iteration did not reach the end of the requested range');
  }
  return dates;
};

/**
 * Returns the range type to highlight: a `workWeek` whose working days are empty or not contiguous within the week
 * is highlighted as a whole `week`.
 */
export const getDateRangeTypeToUse = (
  dateRangeType: DateRangeType,
  workWeekDays: readonly DayOfWeek[] | undefined,
  firstDayOfWeek: DayOfWeek,
): DateRangeType => {
  if (!workWeekDays || dateRangeType !== 'workWeek') {
    return dateRangeType;
  }
  const days = new Set(workWeekDays);
  // A contiguous run has exactly one day whose next day is missing or starts a new week; a full week has none.
  let runEnds = 0;
  for (const day of days) {
    const nextDay = getDayFromIndex(getDayIndex(day) + 1);
    if (!days.has(nextDay) || nextDay === firstDayOfWeek) {
      runEnds++;
    }
  }
  return days.size === 0 || runEnds > 1 ? 'week' : dateRangeType;
};
