import { DAYS_IN_WEEK } from './constants';
import type { DateRangeType, DayOfWeek } from './constants';
import { addCivilDays, addDays, compareDatePart, createDate, getStartDateOfWeek, matchesCivilDate } from './dateMath';
import { getDateRange } from './dateRange';
import { getAvailableDates, isRestrictedDate } from './dateAvailability';
import type { RestrictedDatesOptions } from './dateAvailability';

/** A day of the day grid. */
export type Day = {
  /** Local year, zero-based month and day joined with hyphens (`year-month-day`). */
  key: string;
  /** The day of the month. */
  date: string;
  /** The local date, or `null` for a civil date that does not exist in the local timezone. */
  originalDate: Date | null;
  /** Whether the day is in the displayed month. */
  isInMonth: boolean;
  /** Whether the day is today. */
  isToday: boolean;
  /** Whether the day is part of the selected range. */
  isSelected: boolean;
  /** Whether the day is available. */
  isInBounds: boolean;
};

/** Options for `getDayGrid`. */
export type DayGridOptions = RestrictedDatesOptions & {
  firstDayOfWeek: DayOfWeek;
  /** How many days a selection covers. */
  dateRangeType: DateRangeType;
  /** The number of days of a `day` range. */
  daysToSelectInDayView?: number;
  today: Date;
  /** The days of a `workWeek` range. */
  workWeekDays?: readonly DayOfWeek[];
  selectedDate?: Date | null;
  /** The date whose month, or week when four or fewer weeks are shown, the grid displays. */
  navigatedDate: Date;
  /** How many weeks to show. Defaults to the weeks of the navigated month. */
  weeksToShow?: number;
};

/**
 * Returns the visible weeks of the day grid, including the outside-month days that complete each week.
 * @throws RangeError if the week count is invalid or grid dates cannot be represented.
 */
export const getDayGrid = (options: DayGridOptions): Day[][] => {
  const { selectedDate, dateRangeType, firstDayOfWeek, today, weeksToShow, workWeekDays, navigatedDate } = options;

  if (weeksToShow !== undefined && !(Number.isInteger(weeksToShow) && weeksToShow > 0)) {
    throw new RangeError('weeksToShow must be a positive finite integer.');
  }
  if (!Number.isFinite(navigatedDate.getTime())) {
    throw new RangeError('navigatedDate must be valid.');
  }

  const year = navigatedDate.getFullYear();
  const month = navigatedDate.getMonth();
  // Four or fewer weeks start at the navigated week rather than the start of the month.
  let start = getStartDateOfWeek(
    createDate(year, month, weeksToShow && weeksToShow <= 4 ? navigatedDate.getDate() : 1),
    firstDayOfWeek,
  );
  if (weeksToShow === 5 && compareDatePart(navigatedDate, addDays(start, weeksToShow * DAYS_IN_WEEK)) >= 0) {
    start = addDays(start, DAYS_IN_WEEK);
  }

  const selectedDates = selectedDate
    ? getAvailableDates(
        getDateRange(selectedDate, dateRangeType, firstDayOfWeek, workWeekDays, options.daysToSelectInDayView),
        options,
      )
    : [];

  let civilDate = { year: start.getFullYear(), month: start.getMonth(), day: start.getDate() };
  const weeks: Day[][] = [];
  while (
    weeksToShow !== undefined
      ? weeks.length < weeksToShow
      : !Number.isFinite(civilDate.year) ||
        civilDate.year < year ||
        (civilDate.year === year && civilDate.month <= month)
  ) {
    const week: Day[] = [];
    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const date = createDate(civilDate.year, civilDate.month, civilDate.day);
      if (!Number.isFinite(date.getTime())) {
        throw new RangeError('Cannot generate a grid containing an out-of-range date.');
      }
      const originalDate = matchesCivilDate(date, civilDate) ? date : null;
      week.push({
        key: `${civilDate.year}-${civilDate.month}-${civilDate.day}`,
        date: `${civilDate.day}`,
        originalDate,
        isInMonth: civilDate.year === year && civilDate.month === month,
        isToday: !!originalDate && compareDatePart(today, originalDate) === 0,
        isSelected: !!originalDate && selectedDates.some(selected => compareDatePart(selected, originalDate) === 0),
        isInBounds: !!originalDate && !isRestrictedDate(originalDate, options),
      });
      civilDate = addCivilDays(civilDate, 1);
    }
    weeks.push(week);
  }
  return weeks;
};
