import { attr } from '@microsoft/fast-element';
import { CalendarDateInfo, FASTCalendar, WeekdayFormat } from '@microsoft/fast-foundation';
import { keyArrowDown, keyArrowLeft, keyArrowRight, keyArrowUp } from '@microsoft/fast-web-utilities';
import { CalendarFilter, CalendarType, DaysOfWeek, FirstWeekOfYear } from './calendar.options.js';
import { FluentDateFormatter } from './date-formatter.js';

/**
 * Month picker information needed for rendering
 * including the next and previous years
 * @public
 */
export type MonthPickerInfo = {
  year: number;
  previous: number;
  next: number;
};

/**
 * Year picker information needed for rendering
 * including the next and previous decade's start years
 * @public
 */
export type YearPickerInfo = {
  decadeStart: number;
  decadeEnd: number;
  previousStart: number;
  nextStart: number;
};

/**
 * The base class used for constructing a fluent-calendar custom element
 * @public
 */
export class Calendar extends FASTCalendar {
  /**
   * date formatter utitlity for getting localized strings
   * @public
   */
  public dateFormatter: FluentDateFormatter = new FluentDateFormatter();

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
   * The type of filter on the calendar
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
   * Show "Go to today" link at the link slot
   *
   * @public
   * @remarks
   * HTML Attribute: show-slotted-link
   */
  @attr({ attribute: 'show-slotted-link', mode: 'boolean' })
  public showSlottedLink?: boolean;

  /**
   * the month picker highlights the current month
   *
   * @public
   * @remarks
   * HTML Attribute: highlight-current-month
   */
  @attr({ attribute: 'highlight-current-month', mode: 'boolean' })
  public highlightCurrentMonth?: boolean;

  /**
   * the month picker highlights the selected month
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
  @attr public weekdayFormat: WeekdayFormat = WeekdayFormat.narrow;

  /**
   * the year on the month picker
   */
  @attr public monthPickerYear: number = new Date().getFullYear();

  /**
   * the decade on the year picker
   */
  @attr public yearPickerDecade: number = this.monthPickerYear - (this.monthPickerYear % 10);

  /**
   * whether the year picker is open
   */
  @attr public yearPickerOpen: boolean = false;

  protected days: Element[] | null = this.shadowRoot && Array.from(this.shadowRoot.querySelectorAll('.day'));

  protected navigatedDate: Date = new Date(`${this.month}-01-${this.year}`);

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('dateselected', this.dateSelectedHandler);
    this.addEventListener('rightcellselected', this.rightCellSelectedHandler);
  }

  public disconnectedCallback() {
    this.removeEventListener('dateselected', this.dateSelectedHandler);
    this.removeEventListener('rightcellselected', this.rightCellSelectedHandler);
    super.disconnectedCallback();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'month') {
      if (this.navigatedDate.getMonth() + 1 != this.month || this.navigatedDate.getFullYear() != this.year) {
        this.navigatedDate = new Date(`${this.month}-01-${this.year}`);
      }
      setTimeout(() => {
        this.setFocus();
      }, 0);
    }
  }

  /**
   * Gets data needed to render about a month picker year as well as the previous and next years
   * @param year - year of the month picker
   * @returns - an object with data about the current and 2 surrounding years
   * @public
   */
  public getMonthPickerInfo(year: number = this.monthPickerYear): MonthPickerInfo {
    return {
      year,
      previous: year - 1,
      next: year + 1,
    };
  }

  /**
   * Gets data needed to render about a month picker year as well as the previous and next years
   * @param decadeStart - the start of the decade on the year picker
   * @returns - an object with data about the current and 2 surrounding decades
   * @public
   */
  public getYearPickerInfo(decadeStart: number = this.yearPickerDecade): YearPickerInfo {
    return {
      decadeStart,
      decadeEnd: decadeStart + 11,
      previousStart: decadeStart - 12,
      nextStart: decadeStart + 12,
    };
  }

  /**
   * Changes the month and year on the calendar
   * @param month - the month to be switched to
   * @param year - the year to be switched to
   */
  public handleSwitchMonth(month: number, year: number) {
    this.selectedDates = '';

    this.year = year;
    this.month = month;

    this.monthPickerYear = year;
    this.yearPickerDecade = year - (year % 10);
  }

  /**
   * Open/close the year picker
   * @public
   */
  public toggleYearPicker() {
    this.yearPickerOpen = !this.yearPickerOpen;
    this.yearPickerDecade = this.monthPickerYear - (this.monthPickerYear % 10);
  }

  /**
   * Creates a class string for the "Go to today" link
   * @returns - string of class names
   * @public
   */
  public getLinkClassNames() {
    const today: Date = new Date();

    //when the month picker is not visible, this.monthPickerYear is always going to be the current year.
    return this.month === today.getMonth() + 1 &&
      this.year === today.getFullYear() &&
      this.monthPickerYear === today.getFullYear()
      ? 'slotted-link inactive'
      : 'slotted-link';
  }

  /**
   * Creates a class string for cells on the right panel
   * @returns - string of class names
   * @public
   */
  public getRightCellClassNames(detail: number, todayMonth: number, todayYear: number) {
    const isToday = this.yearPickerOpen ? detail === todayYear : detail === todayMonth;

    return ['right-cell-outer', this.hasAttribute('highlightCurrentMonth') && isToday && 'right-panel-today']
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Returns a list of month labels
   * @returns A 2D array of month texts
   * @public
   */
  public getMonthText(): { text: string; detail: number }[][] {
    const months = this.dateFormatter.getMonths();
    const monthsText: { text: string; detail: number }[][] = [];
    let monthCount = 0;

    while (monthCount < months.length || monthsText[monthsText.length - 1].length % 4 !== 0) {
      const month = { text: months[monthCount], detail: monthCount + 1 };
      const currentRow = monthsText[monthsText.length - 1];
      if (monthsText.length === 0 || currentRow.length % 4 === 0) {
        monthsText.push([month]);
      } else {
        currentRow.push(month);
      }
      monthCount++;
    }
    return monthsText;
  }

  /**
   * Returns a list of year labels for a decade
   * @returns A 2D array of year texts
   * @public
   */
  public getDecadeText(decadeStartYear: number): { text: string; detail: number }[][] {
    const decade = this.dateFormatter.getDecade(decadeStartYear);
    const decadeText: { text: string; detail: number }[][] = [];
    let yearCount = 0;

    while (yearCount < decade.length || decadeText[decadeText.length - 1].length % 4 !== 0) {
      const yearText = { text: decade[yearCount], detail: decadeStartYear + yearCount };
      const currentRow = decadeText[decadeText.length - 1];
      if (decadeText.length === 0 || currentRow.length % 4 === 0) {
        decadeText.push([yearText]);
      } else {
        currentRow.push(yearText);
      }
      yearCount++;
    }
    return decadeText;
  }

  /**
   * Updates calendar to show today when user clicks on "Go to today"
   * @param event - mouse event for clicking on the link
   */
  public handleGoToToday(event: MouseEvent) {
    const today: Date = new Date();
    this.handleSwitchMonth(today.getMonth() + 1, today.getFullYear());
    this.yearPickerOpen = false;
  }

  /**
   * Emits the "rightcellselected" event with the seleced month.
   * @param cellDetail - The month of year that's been selected
   * @public
   */
  public handleRightCellSelect(event: Event, cellDetail: number): void {
    event.preventDefault;
    this.$emit('rightcellselected', cellDetail);
  }

  /**
   * Handles selecting dates on the calendar's date view
   * Stores the selected dates in the selected-dates attribute
   * @param event - 'dateselected' event
   */
  public dateSelectedHandler(event: any) {
    const { day, month, year } = event.detail;

    if (month != this.month) {
      this.handleSwitchMonth(month, year);
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

  /**
   * Handles selecting month or year on the calendar's month/year picker
   * Updates the calendar view according to selected month/year
   * @param event - 'dateselected' event
   */
  public rightCellSelectedHandler(event: any) {
    const month = this.yearPickerOpen ? this.month : event.detail;
    const year = this.yearPickerOpen ? event.detail : this.monthPickerYear;
    if (this.yearPickerOpen) {
      this.yearPickerOpen = false;
    }
    this.handleSwitchMonth(month, year);
  }

  /**
   * Handles keyboard events on a cell
   * @param event - Keyboard event
   * @param date - Date of the cell selected
   */
  public handleKeydown(event: KeyboardEvent, date: CalendarDateInfo): boolean {
    event.preventDefault();
    super.handleKeydown(event, date);

    const currentCell = event.target as HTMLElement;
    currentCell.tabIndex = -1;

    this.navigatedDate = new Date(`${date.month}-${date.day}-${date.year}`);

    switch (event.key) {
      case keyArrowRight:
        this.navigatedDate.setDate(date.day + 1);
        if (currentCell.getAttribute('grid-column') == '7' && this.navigatedDate.getMonth() + 1 != this.month) {
          this.handleSwitchMonth(this.navigatedDate.getMonth() + 1, this.navigatedDate.getFullYear());
          return true;
        }
        break;
      case keyArrowLeft:
        this.navigatedDate.setDate(date.day - 1);
        if (currentCell.getAttribute('grid-column') == '1' && this.navigatedDate.getMonth() + 1 != this.month) {
          this.handleSwitchMonth(this.navigatedDate.getMonth() + 1, this.navigatedDate.getFullYear());
          return true;
        }
        break;
      case keyArrowDown:
        this.navigatedDate.setDate(date.day + 7);
        if (this.navigatedDate.getMonth() + 1 != this.month) {
          this.handleSwitchMonth(this.navigatedDate.getMonth() + 1, this.navigatedDate.getFullYear());
          return true;
        }
        break;
      case keyArrowUp:
        this.navigatedDate.setDate(date.day - 7);
        break;
      default:
        break;
    }

    this.setFocus();

    return true;
  }

  private setFocus() {
    const navigatedDateString = `${
      this.navigatedDate.getMonth() + 1
    }-${this.navigatedDate.getDate()}-${this.navigatedDate.getFullYear()}`;
    const focus = this.shadowRoot?.querySelector(`slot[name=${CSS.escape(navigatedDateString)}]`)
      ?.parentElement as HTMLElement;

    focus.tabIndex = 0;
    focus.focus();
  }
}
