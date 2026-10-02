import { areDatesEqual, createDate, getDateRange, getStartDateOfWeek, isDateInRange } from '../dateMath';
import { DAYS_IN_WEEK, DEFAULT_WORK_WEEK_DAYS } from '../constants';
import type { DayOfWeek } from '../constants';
import type { Day, DayGridOptions } from './dateGrid.types';
import { getBoundedDateRange, isRestrictedDate } from './dateAvailability';
import { getDateRangeTypeToUse } from './workWeek';

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
  const effectiveWorkWeekDays: DayOfWeek[] = workWeekDays ?? [...DEFAULT_WORK_WEEK_DAYS];

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

  date = getStartDateOfWeek(date, firstDayOfWeek);

  // add the transition week as last week of previous range
  date = createDate(date.getFullYear(), date.getMonth(), date.getDate() - DAYS_IN_WEEK);
  let civilDate = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };

  // a flag to indicate whether all days of the week are outside the month
  let isAllDaysOfWeekOutOfMonth = false;
  let hasReachedNavigatedMonth = false;

  // in work week view if the days aren't contiguous we use week view instead
  const selectedDateRangeType = getDateRangeTypeToUse(dateRangeType, effectiveWorkWeekDays, firstDayOfWeek);

  let selectedDates: Date[] = [];

  if (selectedDate) {
    selectedDates = getDateRange(
      selectedDate,
      selectedDateRangeType,
      firstDayOfWeek,
      effectiveWorkWeekDays,
      daysToSelectInDayView,
    );
    selectedDates = getBoundedDateRange(selectedDates, minDate, maxDate);
  }

  let shouldGetWeeks = true;

  for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
    const week: Day[] = [];

    isAllDaysOfWeekOutOfMonth = true;

    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const { year: civilYear, month: civilMonth, day: civilDay } = civilDate;
      if (!Number.isFinite(civilYear) || !Number.isFinite(civilMonth) || !Number.isFinite(civilDay)) {
        throw new RangeError('Cannot generate a grid containing an out-of-range date.');
      }
      const originalDate = createDate(civilYear, civilMonth, civilDay);
      const isPlaceholder =
        originalDate.getFullYear() !== civilYear ||
        originalDate.getMonth() !== civilMonth ||
        originalDate.getDate() !== civilDay;
      if (!isPlaceholder && !Number.isFinite(originalDate.getTime())) {
        throw new RangeError('Cannot generate a grid containing an out-of-range date.');
      }
      const dayInfo: Day = {
        key: `${civilYear}-${civilMonth}-${civilDay}`,
        date: civilDay.toString(),
        originalDate: isPlaceholder ? null : originalDate,
        isPlaceholder,
        isInMonth: civilYear === navigatedDate.getFullYear() && civilMonth === navigatedDate.getMonth(),
        isToday: !isPlaceholder && areDatesEqual(todaysDate, originalDate),
        isSelected: !isPlaceholder && isDateInRange(originalDate, selectedDates),
        isSingleSelected:
          !isPlaceholder && !!selectedDate && selectedDates.length === 1 && areDatesEqual(originalDate, selectedDate),
        isInBounds: !isPlaceholder && !isRestrictedDate(originalDate, restrictedDateOptions),
        isMarked:
          (!isPlaceholder && markedDays?.some((markedDay: Date) => areDatesEqual(originalDate, markedDay))) || false,
      };

      week.push(dayInfo);

      if (dayInfo.isInMonth) {
        isAllDaysOfWeekOutOfMonth = false;
        hasReachedNavigatedMonth = true;
      }

      const nextCivilDate = new Date(0);
      nextCivilDate.setUTCFullYear(civilYear, civilMonth, civilDay + 1);
      civilDate = {
        year: nextCivilDate.getUTCFullYear(),
        month: nextCivilDate.getUTCMonth(),
        day: nextCivilDate.getUTCDate(),
      };
      date = createDate(civilDate.year, civilDate.month, civilDate.day);
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
