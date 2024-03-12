import { DateFormatter, MonthFormat, YearFormat } from '@microsoft/fast-foundation';

/**
 * Constant for number of months in a year
 * @public
 */
export const NUM_MONTHS_IN_YEAR = 12;

/**
 * Constant for number of years in a decade in the year picker
 * @public
 */
export const NUM_YEARS_IN_DECADE = 12;

/**
 * Constant for number of days in a week
 * @public
 */
export const NUM_DAYS_IN_WEEK = 7;

/**
 * Date formatting utility
 * @public
 */
export class FluentDateFormatter extends DateFormatter {
  /**
   *
   * @param locale - The locale data used for formatting
   * @returns - An array of the month labels
   * @public
   */
  public getMonths(locale: string = this.locale): string[] {
    const months = Array(NUM_MONTHS_IN_YEAR)
      .fill(null)
      .map((_, month) => this.getMonth((month + 1) % NUM_MONTHS_IN_YEAR, MonthFormat.short, locale));

    return months;
  }

  /**
   *
   * @param locale - The locale data used for formatting
   * @returns - An array of the decade labels
   * @public
   */
  public getDecade(decadeStartYear: number, locale: string = this.locale): string[] {
    const decade = Array(NUM_YEARS_IN_DECADE)
      .fill(null)
      .map((_, count) => this.getYear(decadeStartYear + count, YearFormat.numeric, locale));

    return decade;
  }
}
