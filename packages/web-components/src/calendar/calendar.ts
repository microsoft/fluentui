import { attr } from '@microsoft/fast-element';
import { FASTCalendar, MonthFormat, WeekdayFormat, YearFormat } from '@microsoft/fast-foundation';
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

  /**
   * whether the year picker is open
   */
  @attr public yearPickerOpen: boolean = false;

  /**
   * the decade on the year picker
   */
  @attr public yearPickerDecade: number = this.year - (this.year % 10);

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('dateselected', this.dateSelectedHandler);
    this.addEventListener('monthselected', this.rightCellSelectedHandler);
  }

  public disconnectedCallback() {
    this.removeEventListener('dateselected', this.dateSelectedHandler);
    this.removeEventListener('monthselected', this.rightCellSelectedHandler);
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
    this.yearPickerDecade = year - (year % 10);
  }

  public handleGoToToday(event: MouseEvent) {
    const today: Date = new Date();
    this.switchMonth(today.getMonth() + 1, today.getFullYear());
    this.yearPickerOpen = false;
  }

  public getLinkClassNames(isMonthPickerLink: boolean) {
    const today: Date = new Date();

    if (isMonthPickerLink) {
      return this.month === today.getMonth() + 1 && this.monthPickerYear === today.getFullYear()
        ? 'slotted-link inactive'
        : 'slotted-link';
    } else if (this.month === today.getMonth() + 1 && this.year === today.getFullYear()) {
      return 'slotted-link inactive';
    } else {
      return 'slotted-link';
    }
  }

  public getRightCellClassNames(detail: number, todayMonth: number, todayYear: number) {
    const isToday = this.yearPickerOpen ? detail === todayYear : detail === todayMonth;

    return ['right-cell-outer', this.hasAttribute('highlightCurrentMonth') && isToday && 'right-panel-today']
      .filter(Boolean)
      .join(' ');
  }

  /**
   *
   * @param locale - The locale data used for formatting
   * @returns - An array of the month labels
   * @public
   */
  public getMonths(locale: string = this.locale): string[] {
    const months = Array(12)
      .fill(null)
      .map((_, month) => this.dateFormatter.getMonth((month + 1) % 12, MonthFormat.short, locale));

    return months;
  }

  /**
   * Returns a list of month labels
   * @returns A 2D array of month text
   * @public
   */
  public getMonthText(): { text: string; detail: number }[][] {
    const months = this.getMonths();
    const monthsText: { text: string; detail: number }[][] = [];
    let monthCount = 0;

    while (monthCount < months.length || monthsText[monthsText.length - 1].length % 4 !== 0) {
      const month = { text: months[monthCount], detail: monthCount + 1 };
      const target = monthsText[monthsText.length - 1];
      if (monthsText.length === 0 || target.length % 4 === 0) {
        monthsText.push([month]);
      } else {
        target.push(month);
      }
      monthCount++;
    }
    return monthsText;
  }

  /**
   * Emits the "month-select" event with the seleced month.
   * @param month - Month cell
   * @public
   */
  public handleRightCellSelect(event: Event, month: number): void {
    event.preventDefault;
    this.$emit('monthselected', month);
  }

  public rightCellSelectedHandler(event: any) {
    const month = this.yearPickerOpen ? this.month : event.detail;
    const year = this.yearPickerOpen ? event.detail : this.monthPickerYear;
    if (this.yearPickerOpen) {
      this.yearPickerOpen = false;
    }
    this.switchMonth(month, year);
  }

  public toggleYearPicker() {
    this.yearPickerOpen = !this.yearPickerOpen;
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
      .map((_, count) => this.dateFormatter.getYear(decadeStartYear + count, YearFormat.numeric, locale));

    console.log(decade);

    return decade;
  }

  /**
   * Returns a list of month labels
   * @returns A 2D array of month text
   * @public
   */
  public getDecadeText(decadeStartYear: number): { text: string; detail: number }[][] {
    const decade = this.getDecade(decadeStartYear);
    const decadeText: { text: string; detail: number }[][] = [];
    let yearCount = 0;

    while (yearCount < decade.length || decadeText[decadeText.length - 1].length % 4 !== 0) {
      const yearText = { text: decade[yearCount], detail: decadeStartYear + yearCount };
      const target = decadeText[decadeText.length - 1];
      if (decadeText.length === 0 || target.length % 4 === 0) {
        decadeText.push([yearText]);
      } else {
        target.push(yearText);
      }
      yearCount++;
    }

    console.log(decadeText);
    return decadeText;
  }
}
