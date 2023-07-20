import { DateFormatter, MonthFormat, YearFormat } from '@microsoft/fast-foundation';

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
    const months = Array(12)
      .fill(null)
      .map((_, month) => this.getMonth((month + 1) % 12, MonthFormat.short, locale));

    return months;
  }

  /**
   *
   * @param locale - The locale data used for formatting
   * @returns - An array of the decade labels
   * @public
   */
  public getDecade(decadeStartYear: number, locale: string = this.locale): string[] {
    const decade = Array(12)
      .fill(null)
      .map((_, count) => this.getYear(decadeStartYear + count, YearFormat.numeric, locale));

    return decade;
  }
}
