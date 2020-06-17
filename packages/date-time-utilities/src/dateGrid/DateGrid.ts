import { IDay, IDayGridOptions, IRestrictedDatesOptions, IAvailableDateOptions, IGridStrings } from './DateGrid.types';
import { addDays, getDateRangeArray, compareDates, isInDateRangeArray, compareDatePart } from '../dateMath/DateMath';
import { DAYS_IN_WEEK, DateRangeType, DayOfWeek } from '../dateValues/DateValues';

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
  } = options;
  const restrictedDateOptions = { minDate, maxDate, restrictedDates };

  const todaysDate = today || new Date();

  const navigatedDate = options.navigatedDate ? options.navigatedDate : todaysDate;

  let date;
  if (weeksToShow && weeksToShow <= 4) {
    // if showing less than a full month, just use date == navigatedDate
    date = new Date(navigatedDate.toString());
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
  const selectedDateRangeType = getDateRangeTypeToUse(dateRangeType, workWeekDays);

  let selectedDates = getDateRangeArray(
    selectedDate,
    selectedDateRangeType,
    firstDayOfWeek,
    workWeekDays,
    daysToSelectInDayView,
  );
  selectedDates = getBoundedDateRange(selectedDates, minDate, maxDate);

  let shouldGetWeeks = true;

  for (let weekIndex = 0; shouldGetWeeks; weekIndex++) {
    const week: IDay[] = [];

    isAllDaysOfWeekOutOfMonth = true;

    for (let dayIndex = 0; dayIndex < DAYS_IN_WEEK; dayIndex++) {
      const originalDate = new Date(date.toString());
      const dayInfo: IDay = {
        key: date.toString(),
        date: date.getDate().toString(),
        originalDate: originalDate,
        isInMonth: date.getMonth() === navigatedDate.getMonth(),
        isToday: compareDates(todaysDate, date),
        isSelected: isInDateRangeArray(date, selectedDates),
        isInBounds: !isRestrictedDate(date, restrictedDateOptions),
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

export const isRestrictedDate = (date: Date, options: IRestrictedDatesOptions): boolean => {
  const { restrictedDates, minDate, maxDate } = options;
  if (!restrictedDates && !minDate && !maxDate) {
    return false;
  }
  const inRestrictedDates = restrictedDates && restrictedDates.some((rd: Date) => compareDates(rd, date));
  return inRestrictedDates || isBeforeMinDate(date, options) || isAfterMaxDate(date, options);
};

export const isBeforeMinDate = (date: Date, options: IRestrictedDatesOptions): boolean => {
  const { minDate } = options;
  return minDate ? compareDatePart(minDate, date) >= 1 : false;
};

export const isAfterMaxDate = (date: Date, options: IRestrictedDatesOptions): boolean => {
  const { maxDate } = options;
  return maxDate ? compareDatePart(date, maxDate) >= 1 : false;
};

export const getBoundedDateRange = (dateRange: Date[], minDate?: Date, maxDate?: Date): Date[] => {
  let boundedDateRange = [...dateRange];
  if (minDate) {
    boundedDateRange = boundedDateRange.filter((date: Date) => compareDatePart(date, minDate as Date) >= 0);
  }
  if (maxDate) {
    boundedDateRange = boundedDateRange.filter((date: Date) => compareDatePart(date, maxDate as Date) <= 0);
  }
  return boundedDateRange;
};

/**
 * When given work week, if the days are non-contiguous, the hover states look really weird. So for non-contiguous
 * work weeks, we'll just show week view instead.
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

export const findAvailableDate = (options: IAvailableDateOptions): Date | undefined => {
  const { targetDate, initialDate, direction, ...restrictedDateOptions } = options;
  let availableDate = targetDate;
  // if the target date is available, return it immediately
  if (!isRestrictedDate(targetDate, restrictedDateOptions)) {
    return targetDate;
  }

  while (
    compareDatePart(initialDate, availableDate) !== 0 &&
    isRestrictedDate(availableDate, restrictedDateOptions) &&
    !isAfterMaxDate(availableDate, restrictedDateOptions) &&
    !isBeforeMinDate(availableDate, restrictedDateOptions)
  ) {
    availableDate = addDays(availableDate, direction);
  }

  if (compareDatePart(initialDate, availableDate) !== 0 && !isRestrictedDate(availableDate, restrictedDateOptions)) {
    return availableDate;
  }

  return undefined;
};

export const formatMonthDayYear = (date: Date, strings: IGridStrings) =>
  strings.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
export const formatMonthYear = (date: Date, strings: IGridStrings) =>
  strings.months[date.getMonth()] + ' ' + date.getFullYear();
export const formatDay = (date: Date) => date.getDate().toString();
export const formatYear = (date: Date) => date.getFullYear().toString();
