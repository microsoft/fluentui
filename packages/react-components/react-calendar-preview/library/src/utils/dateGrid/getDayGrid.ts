import { areDatesEqual, createDate, getDateRange, isDateInRange } from '../dateMath';
import { DAYS_IN_WEEK } from '../constants';
import { getDayIndex } from '../dateUtils';
import type { Day, DayGridOptions } from './dateGrid.types';
import { getBoundedDateRange, isRestrictedDate } from './dateAvailability';
import { getDateRangeTypeToUse } from './workWeek';

const alignToWeekStart = (date: Date, firstDayOfWeekIndex: number): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Advance independently of Date normalization, allowing for a skipped weekday.
  for (let daysBack = 0; daysBack < 2 * DAYS_IN_WEEK; daysBack++) {
    const candidate = createDate(year, month, day - daysBack);
    if (!Number.isFinite(candidate.getTime())) {
      throw new RangeError('Cannot align an invalid or out-of-range date.');
    }
    if (candidate.getDay() === firstDayOfWeekIndex) {
      return candidate;
    }
  }

  throw new RangeError('Could not find a representable week start within two weeks.');
};

/**
 * Generates a grid of days, given the `options`.
 * Returns one additional week at the beginning from the previous range
 * and one at the end from the future range
 * @param options - parameters to specify date related restrictions for the resulting grid
 * @throws RangeError if the week count is invalid or grid dates cannot be represented.
 */
export const getDayGrid = (options: DayGridOptions): Day[][] => {
  const {
    selectedDate,
    dateRangeType,
    firstDayOfWeek,
    today,
    minDate,
    maxDate,
    weeksToShow,
    workWeekDays,
    daysToSelectInDayView,
    restrictedDates,
    markedDays,
  } = options;

  if (
    weeksToShow !== undefined &&
    (!Number.isFinite(weeksToShow) || !Number.isInteger(weeksToShow) || weeksToShow <= 0)
  ) {
    throw new RangeError('weeksToShow must be a positive finite integer.');
  }

  const restrictedDateOptions = { minDate, maxDate, restrictedDates };

  const todaysDate = today || new Date();

  const navigatedDate = options.navigatedDate ? options.navigatedDate : todaysDate;

  if (!Number.isFinite(navigatedDate.getTime())) {
    throw new RangeError('navigatedDate must be valid.');
  }

  let date;
  if (weeksToShow && weeksToShow <= 4) {
    // if showing less than a full month, just use date == navigatedDate
    date = createDate(navigatedDate.getFullYear(), navigatedDate.getMonth(), navigatedDate.getDate());
  } else {
    date = createDate(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
  }
  const weeks: Day[][] = [];

  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);
  date = alignToWeekStart(date, firstDayOfWeekIndex);

  // add the transition week as last week of previous range
  date = createDate(date.getFullYear(), date.getMonth(), date.getDate() - DAYS_IN_WEEK);

  // a flag to indicate whether all days of the week are outside the month
  let isAllDaysOfWeekOutOfMonth = false;
  let hasReachedNavigatedMonth = false;

  // in work week view if the days aren't contiguous we use week view instead
  const selectedDateRangeType = getDateRangeTypeToUse(dateRangeType, workWeekDays, firstDayOfWeek);

  let selectedDates: Date[] = [];

  if (selectedDate) {
    selectedDates = getDateRange(
      selectedDate,
      selectedDateRangeType,
      firstDayOfWeek,
      workWeekDays,
      daysToSelectInDayView,
    );
    selectedDates = getBoundedDateRange(selectedDates, minDate, maxDate);
  }

  let shouldGetWeeks = true;

  for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
    const week: Day[] = [];

    isAllDaysOfWeekOutOfMonth = true;

    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const originalDate = createDate(date.getFullYear(), date.getMonth(), date.getDate());
      if (!Number.isFinite(originalDate.getTime())) {
        throw new RangeError('Cannot generate a grid containing an out-of-range date.');
      }
      const dayInfo: Day = {
        key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
        date: date.getDate().toString(),
        originalDate,
        isInMonth: date.getMonth() === navigatedDate.getMonth(),
        isToday: areDatesEqual(todaysDate, date),
        isSelected: isDateInRange(date, selectedDates),
        isSingleSelected: !!selectedDate && selectedDates.length === 1 && areDatesEqual(date, selectedDate),
        isInBounds: !isRestrictedDate(date, restrictedDateOptions),
        isMarked: markedDays?.some((markedDay: Date) => areDatesEqual(originalDate, markedDay)) || false,
      };

      week.push(dayInfo);

      if (dayInfo.isInMonth) {
        isAllDaysOfWeekOutOfMonth = false;
        hasReachedNavigatedMonth = true;
      }

      date = createDate(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    }

    // A fixed week count includes both transition rows; a skipped weekday may add leading rows in month view.
    shouldGetWeeks = weeksToShow
      ? weekIndex < weeksToShow + 1
      : !isAllDaysOfWeekOutOfMonth || !hasReachedNavigatedMonth;

    // we don't check shouldGetWeeks before pushing because we want to add one extra week for transition state
    weeks.push(week);
  }

  return weeks;
};
