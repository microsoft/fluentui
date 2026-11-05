import {
  addDays,
  addCivilDays,
  areDatesEqual,
  compareDatePart,
  createDate,
  getDateRange,
  getStartDateOfWeek,
  isDateInRange,
  matchesCivilDate,
} from '../dateMath';
import { DAYS_IN_WEEK, DEFAULT_WORK_WEEK_DAYS } from '../constants';
import type { DayOfWeek } from '../constants';
import type { Day, DayGridOptions } from './dateGrid.types';
import { getAvailableDates, isRestrictedDate } from './dateAvailability';

/**
 * Generates a grid of days, given the `options`.
 * Returns only visible weeks, including outside-month days needed to complete each row.
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

  if (weeksToShow === 5 && compareDatePart(navigatedDate, addDays(date, weeksToShow * DAYS_IN_WEEK)) >= 0) {
    date = addDays(date, DAYS_IN_WEEK);
  }

  let civilDate = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };

  let selectedDates: Date[] = [];

  if (selectedDate) {
    selectedDates = getAvailableDates(
      getDateRange(selectedDate, dateRangeType, firstDayOfWeek, effectiveWorkWeekDays, daysToSelectInDayView),
      restrictedDateOptions,
    );
  }

  while (
    weeksToShow !== undefined
      ? weeks.length < weeksToShow
      : !Number.isFinite(civilDate.year) ||
        civilDate.year < navigatedDate.getFullYear() ||
        (civilDate.year === navigatedDate.getFullYear() && civilDate.month <= navigatedDate.getMonth())
  ) {
    const week: Day[] = [];

    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const { year: civilYear, month: civilMonth, day: civilDay } = civilDate;
      if (!Number.isFinite(civilYear) || !Number.isFinite(civilMonth) || !Number.isFinite(civilDay)) {
        throw new RangeError('Cannot generate a grid containing an out-of-range date.');
      }
      const originalDate = createDate(civilYear, civilMonth, civilDay);
      if (!Number.isFinite(originalDate.getTime())) {
        throw new RangeError('Cannot generate a grid containing an out-of-range date.');
      }
      const isPlaceholder = !matchesCivilDate(originalDate, civilDate);
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

      civilDate = addCivilDays(civilDate, 1);
    }

    weeks.push(week);
  }

  return weeks;
};
