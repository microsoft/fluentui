export namespace DateMath {
  const DAYS_IN_WEEK = 7;
  const MONTHS_IN_YEAR = 12;

  /**
   * Returns a date offset from the given date by the specified number of days.
   * @param {Date} date - The origin date
   * @param {number} days - The number of days to offset. 'days' can be negative.
   * @return {Date} A new Date object offset from the origin date by the given number of days
   */
  export function addDays(date: Date, days: number) : Date {
    let result = new Date(date.getTime());
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Returns a date offset from the given date by the specified number of weeks.
   * @param {Date} date - The origin date
   * @param {number} weeks - The number of weeks to offset. 'weeks' can be negative.
   * @return {Date} A new Date object offset from the origin date by the given number of weeks
   */
  export function addWeeks(date: Date, weeks: number) : Date {
    return addDays(date, weeks * DAYS_IN_WEEK);
  }

  /**
   * Returns a date offset from the given date by the specified number of months.
   * The method tries to preserve the day-of-month; however, if the new month does not have enough days
   * to contain the original day-of-month, we'll use the last day of the new month.
   * @param {Date} date - The origin date
   * @param {number} months - The number of months to offset. 'months' can be negative.
   * @return {Date} A new Date object offset from the origin date by the given number of months
   */
  export function addMonths(date: Date, months: number) : Date {
    let result = new Date(date.getTime());
    let newMonth = result.getMonth() + months;
    result.setMonth(newMonth);

    // We want to maintain the same day-of-month, but that may not be possible if the new month doesn't have enough days.
    // Loop until we back up to a day the new month has.
    // (Weird modulo math is due to Javascript's treatment of negative numbers in modulo)
    if (result.getMonth() !== ((newMonth % MONTHS_IN_YEAR) + MONTHS_IN_YEAR) % MONTHS_IN_YEAR) {
      result = addDays(result, -result.getDate());
    }
    return result;
  }

  /**
   * Returns a date offset from the given date by the specified number of years.
   * The method tries to preserve the day-of-month; however, if the new month does not have enough days
   * to contain the original day-of-month, we'll use the last day of the new month.
   * @param {Date} date - The origin date
   * @param {number} years - The number of years to offset. 'years' can be negative.
   * @return {Date} A new Date object offset from the origin date by the given number of years
   */
  export function addYears(date: Date, years: number) : Date {
    let result = new Date(date.getTime());
    result.setFullYear(date.getFullYear() + years);

    // We want to maintain the same day-of-month, but that may not be possible if the new month doesn't have enough days.
    // Loop until we back up to a day the new month has.
    // (Weird modulo math is due to Javascript's treatment of negative numbers in modulo)
    if (result.getMonth() !== ((date.getMonth() % MONTHS_IN_YEAR) + MONTHS_IN_YEAR) % MONTHS_IN_YEAR) {
      result = addDays(result, -result.getDate());
    }
    return result;
  }

  /**
   * Returns a date that is a copy of the given date, aside from the month changing to the given month.
   *  The method tries to preserve the day-of-month; however, if the new month does not have enough days
   * to contain the original day-of-month, we'll use the last day of the new month.
   * @param {Date} date - The origin date
   * @param {number} month - The 0-based index of the month to set on the date.
   * @return {Date} A new Date object with the given month set.
   */
  export function setMonth(date: Date, month: number) : Date {
    return addMonths(date, month - date.getMonth());
  }

  /**
   * Compares two dates, and returns true if the two dates (not accounting for time-of-day) are equal.
   * @return {boolean} True if the two dates represent the same date (regardless of time-of-day), false otherwise.
   */
  export function compareDates(date1: Date, date2: Date) : boolean {
    return (date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate());
  }
}

export default DateMath;