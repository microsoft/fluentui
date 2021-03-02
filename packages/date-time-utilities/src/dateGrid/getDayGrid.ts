import { addDays, compareDates, getDateRangeArray, isInDateRangeArray } from '../dateMath/dateMath';
import { DAYS_IN_WEEK } from '../dateValues/dateValues';
import { IDay, IDayGridOptions } from './dateGrid.types';
import { getDateRangeTypeToUse } from './getDateRangeTypeToUse';
import { getBoundedDateRange } from './getBoundedDateRange';
import { isRestrictedDate } from './isRestrictedDate';

/**
 * Generates a grid of days, given the `options`.
 * Returns one additional week at the begining from the previous range
 * and one at the end from the future range
 * @param options - parameters to specify date related restrictions for the resulting grid
 */
export const getDayGrid = (options: IDayGridOptions): IDay[][] => {
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
  const restrictedDateOptions = { minDate, maxDate, restrictedDates };

  const todaysDate = today || new Date();

  const navigatedDate = options.navigatedDate ? options.navigatedDate : todaysDate;

  let date;
  if (weeksToShow && weeksToShow <= 4) {
    // if showing less than a full month, just use date == navigatedDate
    date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), navigatedDate.getDate());
  } else {
    date = new Date(navigatedDate.getFullYear(), navigatedDate.getMonth(), 1);
  }
  const weeks: IDay[][] = [];

  // Cycle the date backwards to get to the first day of the week.
  while (date.getDay() !== firstDayOfWeek) {
    date.setDate(date.getDate() - 1);
  }

  // add the transition week as last week of previous range
  date = addDays(date, -DAYS_IN_WEEK);

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
    );
    selectedDates = getBoundedDateRange(selectedDates, minDate, maxDate);
  }

  let shouldGetWeeks = true;

  for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
    const week: IDay[] = [];

    isAllDaysOfWeekOutOfMonth = true;

    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const originalDate = new Date(date.getTime());
      const dayInfo: IDay = {
        key: date.toString(),
        date: date.getDate().toString(),
        originalDate: originalDate,
        isInMonth: date.getMonth() === navigatedDate.getMonth(),
        isToday: compareDates(todaysDate, date),
        isSelected: isInDateRangeArray(date, selectedDates),
        isInBounds: !isRestrictedDate(date, restrictedDateOptions),
        isMarked: markedDays?.some(markedDay => compareDates(originalDate, markedDay)) || false,
      };

      week.push(dayInfo);

      if (dayInfo.isInMonth) {
        isAllDaysOfWeekOutOfMonth = false;
      }

      date.setDate(date.getDate() + 1);
    }

    // We append the condition of the loop depending upon the showSixWeeksByDefault prop.
    shouldGetWeeks = weeksToShow ? weekIndex < weeksToShow + 1 : !isAllDaysOfWeekOutOfMonth || weekIndex === 0;

    // we don't check shouldGetWeeks before pushing because we want to add one extra week for transition state
    weeks.push(week);
  }

  return weeks;
};
