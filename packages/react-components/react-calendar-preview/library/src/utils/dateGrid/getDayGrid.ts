import { compareDates, getDateRangeArray, isInDateRangeArray } from '../dateMath/dateMath';
import { DAYS_IN_WEEK, getDayIndex } from '../constants';
import { dateAdapter as defaultDateAdapter } from '../dateAdapter';
import type { Day, DayGridOptions } from './dateGrid.types';
import { getDateRangeTypeToUse } from './getDateRangeTypeToUse';
import { getBoundedDateRange } from './getBoundedDateRange';
import { isRestrictedDate } from './isRestrictedDate';

/**
 * Generates a grid of days, given the `options`.
 * Returns one additional week at the beginning from the previous range
 * and one at the end from the future range
 * @param options - parameters to specify date related restrictions for the resulting grid
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
    dateAdapter = defaultDateAdapter,
  } = options;
  const restrictedDateOptions = { dateAdapter, minDate, maxDate, restrictedDates };

  const todaysDate = today || dateAdapter.now();

  const navigatedDate = options.navigatedDate ? options.navigatedDate : todaysDate;

  let date;
  if (weeksToShow && weeksToShow <= 4) {
    // if showing less than a full month, just use date == navigatedDate
    date = dateAdapter.createDate(
      dateAdapter.getYear(navigatedDate),
      dateAdapter.getMonth(navigatedDate),
      dateAdapter.getDate(navigatedDate),
    );
  } else {
    date = dateAdapter.createDate(dateAdapter.getYear(navigatedDate), dateAdapter.getMonth(navigatedDate), 1);
  }
  const weeks: Day[][] = [];

  // Cycle the date backwards to get to the first day of the week.
  const firstDayOfWeekIndex = getDayIndex(firstDayOfWeek);
  while (dateAdapter.getDay(date) !== firstDayOfWeekIndex) {
    date = dateAdapter.addDays(date, -1);
  }

  // add the transition week as last week of previous range
  date = dateAdapter.addDays(date, -DAYS_IN_WEEK);

  // a flag to indicate whether all days of the week are outside the month
  let isAllDaysOfWeekOutOfMonth = false;

  // in work week view if the days aren't contiguous we use week view instead
  const selectedDateRangeType = getDateRangeTypeToUse(dateRangeType, workWeekDays, firstDayOfWeek);

  let selectedDates: Date[] = [];

  if (selectedDate) {
    selectedDates = getDateRangeArray(
      selectedDate,
      selectedDateRangeType,
      firstDayOfWeek,
      workWeekDays,
      daysToSelectInDayView,
      dateAdapter,
    );
    selectedDates = getBoundedDateRange(selectedDates, minDate, maxDate, dateAdapter);
  }

  let shouldGetWeeks = true;

  for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
    const week: Day[] = [];

    isAllDaysOfWeekOutOfMonth = true;

    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const originalDate = dateAdapter.createDate(
        dateAdapter.getYear(date),
        dateAdapter.getMonth(date),
        dateAdapter.getDate(date),
      );
      const dayInfo: Day = {
        key: `${dateAdapter.getYear(date)}-${dateAdapter.getMonth(date)}-${dateAdapter.getDate(date)}`,
        date: dateAdapter.getDate(date).toString(),
        originalDate,
        isInMonth: dateAdapter.getMonth(date) === dateAdapter.getMonth(navigatedDate),
        isToday: compareDates(todaysDate, date, dateAdapter),
        isSelected: isInDateRangeArray(date, selectedDates, dateAdapter),
        isSingleSelected: selectedDates.length === 1 && compareDates(date, selectedDate, dateAdapter),
        isInBounds: !isRestrictedDate(date, restrictedDateOptions),
        isMarked: markedDays?.some((markedDay: Date) => compareDates(originalDate, markedDay, dateAdapter)) || false,
      };

      week.push(dayInfo);

      if (dayInfo.isInMonth) {
        isAllDaysOfWeekOutOfMonth = false;
      }

      date = dateAdapter.addDays(date, 1);
    }

    // A fixed week count includes one additional row for the transition state.
    shouldGetWeeks = weeksToShow ? weekIndex < weeksToShow + 1 : !isAllDaysOfWeekOutOfMonth || weekIndex === 0;

    // we don't check shouldGetWeeks before pushing because we want to add one extra week for transition state
    weeks.push(week);
  }

  return weeks;
};
