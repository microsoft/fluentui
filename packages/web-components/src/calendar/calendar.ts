import { attr } from '@microsoft/fast-element';
import { FASTCalendar, MonthFormat, WeekdayFormat } from '@microsoft/fast-foundation';
import { CalendarFilter, CalendarType, DaysOfWeek, FirstWeekOfYear } from './calendar.options.js';

/**
 * The base class used for constructing a fluent-radio custom element
 * @public
 */
export class Calendar extends FASTCalendar {
  /**
   * The type of the calendar.
   *
   * @public
   * @remarks
   * HTML Attribute: calendar-type
   */
  @attr
  public calendarType?: CalendarType | undefined;

  /**
   * The month-picker is visible
   *
   * @public
   * @remarks
   * HTML Attribute: month-picker-visible
   */
  @attr({ attribute: 'month-picker-visible', mode: 'boolean' })
  public monthPickerVisible?: boolean;

  /**
   * Show month picker on top of date picker when visible
   *
   * @public
   * @remarks
   * HTML Attribute: month-picker-overlay
   */
  @attr({ attribute: 'month-picker-overlay', mode: 'boolean' })
  public monthPickerOverlay?: boolean = false;

  /**
   * Show week numbers (1-53) before each week row
   *
   * @public
   * @remarks
   * HTML Attribute: show-week-numbers
   */
  @attr({ attribute: 'show-week-numbers', mode: 'boolean' })
  public showWeekNumbers?: boolean = false;

  /**
   * The filter on the calendar
   *
   * @public
   * @remarks
   * HTML Attribute: calendar-filter
   */
  @attr
  public calendarFilter?: CalendarFilter | undefined;

  /**
   * The days that are selectable with the filter work-week.
   *
   * @public
   * @remarks
   * HTML Attribute: work-week
   */
  @attr
  public workWeek?: DaysOfWeek[] | undefined;

  /**
   * The first day of the week for locale
   *
   * @public
   * @remarks
   * HTML Attribute: first-day-of-week
   */
  @attr
  public firstDayOfWeek?: DaysOfWeek | undefined;

  /**
   * Determines when the first week of the year should start
   *
   * @public
   * @remarks
   * HTML Attribute: first-week-of-year
   */
  @attr
  public firstWeekOfYear?: FirstWeekOfYear | undefined;

  /**
   * Show link at the link slot (e.g. Go to today)
   *
   * @public
   * @remarks
   * HTML Attribute: show-slotted-link
   */
  @attr({ attribute: 'show-slotted-link', mode: 'boolean' })
  public showSlottedLink?: boolean;

  /**
   * the month picker should highlight the current month
   *
   * @public
   * @remarks
   * HTML Attribute: highlight-current-month
   */
  @attr({ attribute: 'highlight-current-month', mode: 'boolean' })
  public highlightCurrentMonth?: boolean;

  /**
   * the month picker should highlight the selected month
   *
   * @public
   * @remarks
   * HTML Attribute: highlight-selected-month
   */
  @attr({ attribute: 'highlight-selected-month', mode: 'boolean' })
  public highlightSelectedMonth?: boolean = false;

  /**
   * the format in which weekdays are displayed (M W T)
   */
  public weekdayFormat: WeekdayFormat = WeekdayFormat.narrow;

  /**
   * the year on the month picker
   */
  @attr public monthPickerYear: number = this.year;

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('dateselected', this.dateSelectedHandler);
    this.addEventListener('monthselected', this.monthSelectedHandler);
  }

  public disconnectedCallback() {
    this.removeEventListener('dateselected', this.dateSelectedHandler);
    this.removeEventListener('monthselected', this.monthSelectedHandler);
    super.disconnectedCallback();
  }

  public dateSelectedHandler(event: any) {
    const { day, month, year } = event.detail;

    if (month != this.month) {
      this.switchMonth(month, year);
    }

    const selected_date_string = `${month}-${day}-${year}`;

    if (this.calendarType === 'range-picker') {
      if (!this.dateInString(selected_date_string, this.selectedDates)) {
        this.selectedDates += `${month}-${day}-${year},`;
      }
    } else {
      this.selectedDates = `${month}-${day}-${year},`;
    }

    console.log(this.selectedDates);
  }

  public switchMonth(month: number, year: number) {
    this.selectedDates = '';
    this.year = year;
    this.month = month;
    this.monthPickerYear = year;
  }

  public handleGoToToday(event: MouseEvent) {
    const today: Date = new Date();
    this.switchMonth(today.getMonth() + 1, today.getFullYear());
  }

  public getLinkClassNames() {
    const today: Date = new Date();

    if (this.month === today.getMonth() + 1 && this.year === today.getFullYear()) {
      console.log('here');
      return 'slotted-link inactive';
    } else {
      return 'slotted-link';
    }
  }

  public getMonthClassNames(month: number, todayMonth: number) {
    const thisMonth = month === todayMonth;

    console.log(this.hasAttribute('highlightCurrentMonth'));

    return ['month-cell', this.hasAttribute('highlightCurrentMonth') && thisMonth && 'this-month']
      .filter(Boolean)
      .join(' ');
  }

  /**
   *
   * @param format - The formatting for the weekdays
   * @param locale - The locale data used for formatting
   * @returns - An array of the weekday labels
   * @public
   */
  public getMonths(locale: string = this.locale): string[] {
    const months = Array(12)
      .fill(null)
      .map((_, month) => this.dateFormatter.getMonth((month + 1) % 12, MonthFormat.short, locale));

    return months;
  }

  /**
   * Returns a list of weekday labels
   * @returns An array of weekday text and full text if abbreviated
   * @public
   */
  public getMonthText(): { text: string; month: number }[][] {
    const months = this.getMonths();
    const monthsText: { text: string; month: number }[][] = [];
    let monthCount = 0;

    while (monthCount < months.length || monthsText[monthsText.length - 1].length % 4 !== 0) {
      const month = { text: months[monthCount], month: monthCount + 1 };
      const target = monthsText[monthsText.length - 1];
      if (monthsText.length === 0 || target.length % 4 === 0) {
        monthsText.push([month]);
      } else {
        target.push(month);
      }
      monthCount++;
    }

    console.log(monthsText);
    return monthsText;
  }

  /**
   * Emits the "month-select" event with the seleced month.
   * @param month - Month cell
   * @public
   */
  public handleMonthSelect(event: Event, month: number): void {
    event.preventDefault;
    this.$emit('monthselected', month);
  }

  public monthSelectedHandler(event: any) {
    const month = event.detail;
    this.switchMonth(month, this.monthPickerYear);
  }
}
