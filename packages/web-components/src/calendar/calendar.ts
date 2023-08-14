import { attr, Updates } from '@microsoft/fast-element';
import { CalendarDateInfo, FASTCalendar, WeekdayFormat } from '@microsoft/fast-foundation';
import {
  keyArrowDown,
  keyArrowLeft,
  keyArrowRight,
  keyArrowUp,
  keyEnd,
  keyEnter,
  keyHome,
  keyPageDown,
  keyPageUp,
} from '@microsoft/fast-web-utilities';
import { CalendarFilter, CalendarType, DaysOfWeek, FirstWeekOfYear } from './calendar.options.js';
import { FluentDateFormatter, NUM_DAYS_IN_WEEK, NUM_YEARS_IN_DECADE } from './date-formatter.js';

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
  public highlightSelectedMonth?: boolean;

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

  /**
   * keeps track of the current focused and active date on the day grid
   */
  protected navigatedDate: Date = new Date(`${this.year}/${this.month}/01`);

  /**
   * element array that contains the current secondary panel cells
   */
  protected secondaryPanelCells: Element[] | null =
    this.shadowRoot && Array.from(this.shadowRoot.querySelectorAll('.secondary-panel-cell-outer'));

  public connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('dateselected', this.dateSelectedHandler);
    this.addEventListener('secondaryPanelCellSelected', this.secondaryCellSelectedHandler);
  }

  public disconnectedCallback() {
    this.removeEventListener('dateselected', this.dateSelectedHandler);
    this.removeEventListener('secondaryPanelCellSelected', this.secondaryCellSelectedHandler);
    super.disconnectedCallback();
  }

  public attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    // Sets focus on day grid cell when the month is updated on the day grid
    if (name === 'month') {
      if (this.navigatedDate.getMonth() + 1 != this.month || this.navigatedDate.getFullYear() != this.year) {
        this.navigatedDate = new Date(`${this.year}/${this.month}/01`);
      } else {
        Updates.enqueue(() => {
          const el = this.getNavigatedDayElement();
          el.tabIndex = 0;
          el.focus();
        });
      }
    }

    // Updates the secondaryPanelCells array and sets focus on the first cell
    // on the secondary panel
    if (name === 'monthpickeryear' || name === 'yearpickerdecade' || name === 'yearpickeropen') {
      Updates.enqueue(() => {
        this.secondaryPanelCells =
          this.shadowRoot && Array.from(this.shadowRoot.querySelectorAll('.secondary-panel-cell-outer'));
        if (this.secondaryPanelCells) {
          this.secondaryPanelCells.forEach(cell => cell.setAttribute('tabindex', '-1'));
          const focus = this.secondaryPanelCells[0] as HTMLElement;
          focus.tabIndex = 0;
        }
      });
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
      decadeEnd: decadeStart + NUM_YEARS_IN_DECADE - 1,
      previousStart: decadeStart - NUM_YEARS_IN_DECADE,
      nextStart: decadeStart + NUM_YEARS_IN_DECADE,
    };
  }

  /**
   * Checks if the calendar is on today's month and year
   * @public
   */
  public isToday() {
    const today: Date = new Date();

    //when the month picker is not visible, this.monthPickerYear is always going to be the current year.
    return (
      this.month === today.getMonth() + 1 &&
      this.year === today.getFullYear() &&
      this.monthPickerYear === today.getFullYear()
    );
  }

  /**
   * Changes the month and year on the calendar
   * @param month - the month to be switched to
   * @param year - the year to be switched to
   * @public
   */
  public handleSwitchMonth(month: number, year: number) {
    // // TODO: For range selection, instead of clearing out the selected dates,
    // // filter them by current month
    // this.selectedDates = '';

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
   * Creates a class string for cells on the secondary panel
   * @returns - string of class names
   * @public
   */
  public getSecondaryPanelCellClassNames(detail: number, todayMonth: number, todayYear: number) {
    const isToday = this.yearPickerOpen ? detail === todayYear : detail === todayMonth;
    const isSelected = this.yearPickerOpen ? detail === this.year : detail === this.month;

    return [
      'secondary-panel-cell-outer',
      this.hasAttribute('highlightCurrentMonth') && isToday && 'secondary-panel-today',
      this.hasAttribute('highlightSelectedMonth') && isSelected && 'secondary-panel-selected',
    ]
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Creates an aria-label string for cells on the secondary panel
   * @param - the value of the secondary panel cell
   * @returns - aria-label string
   * @public
   */
  public getSecondaryPanelCellLabels(detail: number): string {
    return this.yearPickerOpen
      ? this.dateFormatter.getYear(detail)
      : [this.dateFormatter.getMonth(detail), this.dateFormatter.getYear(this.year)].join(' ');
  }

  /**
   * Determines whether a secondary panel cell is selected based on its value
   * @param - the value of the secondary panel cell
   * @returns - a boolean indicating whether the cell is selected
   * @public
   */
  public getSecondaryPanelCellSelected(detail: number): boolean {
    return this.yearPickerOpen ? detail === this.year : detail === this.month;
  }

  /**
   * Returns a list of month labels
   * @returns A 2D array of month texts
   * @public
   */
  public getMonthText(): { text: string; detail: number }[][] {
    const months = this.dateFormatter.getMonths();
    const monthsText: { text: string; detail: number }[][] = [];

    // Ensure that the months array is not undefined or null and has elements in it.
    if (months && Array.isArray(months) && months.length > 0) {
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
    } else {
      // Handle the case when months is not populated correctly.
      // Maybe throw an error or return a default value.
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
  public handleGoToToday() {
    const today: Date = new Date();
    this.handleSwitchMonth(today.getMonth() + 1, today.getFullYear());
    this.yearPickerOpen = false;
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
  public secondaryCellSelectedHandler(event: any) {
    const month = this.yearPickerOpen ? this.month : event.detail;
    const year = this.yearPickerOpen ? event.detail : this.monthPickerYear;
    if (this.yearPickerOpen) {
      this.yearPickerOpen = false;
    }
    this.handleSwitchMonth(month, year);
  }

  /**
   * Handles keyboard events on the navigation icons for both
   * the date panel and the secondary panel
   * @param event - Keyboard event
   * @param panel - Panel to navigate on: primary or secondary
   * @param direction - Direction of navigation: previous or next
   */
  public handleNavIconKeydown(event: KeyboardEvent, panel: string, direction: string): boolean {
    if (event.key === keyEnter) {
      if (panel === 'primary') {
        if (direction === 'previous') {
          this.handleSwitchMonth(this.getMonthInfo().previous.month, this.getMonthInfo().previous.year);
        } else if (direction === 'next') {
          this.handleSwitchMonth(this.getMonthInfo().next.month, this.getMonthInfo().next.year);
        }
      } else if (panel === 'secondary') {
        if (direction === 'previous') {
          this.yearPickerOpen
            ? (this.yearPickerDecade = this.getYearPickerInfo().previousStart)
            : (this.monthPickerYear = this.getMonthPickerInfo().previous);
        } else if (direction === 'next') {
          this.yearPickerOpen
            ? (this.yearPickerDecade = this.getYearPickerInfo().nextStart)
            : (this.monthPickerYear = this.getMonthPickerInfo().next);
        }
      }
    }
    return true;
  }

  /**
   * Handles keyboard events on the secondary panel title.
   * @param event - Keyboard event
   */
  public handleSecondaryPanelTitleKeydown(event: KeyboardEvent): boolean {
    if (event.key === keyEnter) {
      this.toggleYearPicker();
    }
    return true;
  }

  /**
   * Handles keyboard events on the "Go to today" link
   * @param event - Keyboard event
   */
  public handleLinkKeydown(event: KeyboardEvent): boolean {
    if (event.key === keyEnter) {
      this.handleGoToToday();
    }
    return true;
  }

  /**
   * Handles keyboard events on a day grid cell
   * @param event - Keyboard event
   * @param date - Date of the event target cell
   */
  public handleKeydown(event: KeyboardEvent, date: CalendarDateInfo): boolean {
    super.handleKeydown(event, date);

    const currentCell = event.target as HTMLElement;

    // set navigatedDate to correspond to the date on the event target cell
    this.navigatedDate = new Date(`${date.year}/${date.month}/${date.day}`);

    switch (event.key) {
      case keyArrowRight: {
        event.preventDefault();
        // Update navigatedDate
        this.navigatedDate.setDate(date.day + 1);

        // Update the month on the calendar if reached the end of the current month
        if (currentCell.getAttribute('grid-column') == '7' && this.navigatedDate.getMonth() + 1 != this.month) {
          this.handleSwitchMonth(this.navigatedDate.getMonth() + 1, this.navigatedDate.getFullYear());
          return true;
        }
        break;
      }
      case keyArrowLeft: {
        event.preventDefault();
        this.navigatedDate.setDate(date.day - 1);

        if (currentCell.getAttribute('grid-column') == '1' && this.navigatedDate.getMonth() + 1 != this.month) {
          this.handleSwitchMonth(this.navigatedDate.getMonth() + 1, this.navigatedDate.getFullYear());
          return true;
        }
        break;
      }
      case keyArrowDown: {
        event.preventDefault();
        this.navigatedDate.setDate(date.day + 7);

        // Update the month on the calendar if the new navigatedDate is not in the current month and cannot be found on the DOM
        if (this.navigatedDate.getMonth() + 1 != this.month && this.getNavigatedDayElement() === undefined) {
          this.handleSwitchMonth(this.navigatedDate.getMonth() + 1, this.navigatedDate.getFullYear());
          return true;
        }
        break;
      }
      case keyArrowUp: {
        event.preventDefault();
        this.navigatedDate.setDate(date.day - 7);
        if (this.navigatedDate.getMonth() + 1 != this.month && this.getNavigatedDayElement() === undefined) {
          this.handleSwitchMonth(this.navigatedDate.getMonth() + 1, this.navigatedDate.getFullYear());
          return true;
        }
        break;
      }
      case keyHome: {
        event.preventDefault();
        // Set navigatedDate to the first day of the week
        const column = Number(currentCell.getAttribute('grid-column'));
        this.navigatedDate.setDate(date.day - column + 1);
        break;
      }
      case keyEnd: {
        event.preventDefault();
        // Set navigatedDate to the last day of the week
        const column = Number(currentCell.getAttribute('grid-column'));
        this.navigatedDate.setDate(date.day + NUM_DAYS_IN_WEEK - column);
        break;
      }
      default:
        return true;
    }

    // Get the navigated element and set focus
    currentCell.tabIndex = -1;
    const el = this.getNavigatedDayElement();
    el.tabIndex = 0;
    el.focus();

    // return true;
  }

  /**
   * Helper that gets the current navigated cell element on the day grid
   */
  public getNavigatedDayElement(): HTMLElement {
    const navigatedDateString = `${
      this.navigatedDate.getMonth() + 1
    }-${this.navigatedDate.getDate()}-${this.navigatedDate.getFullYear()}`;

    const el = this.shadowRoot?.querySelector(`slot[name=${CSS.escape(navigatedDateString)}]`)
      ?.parentElement as HTMLElement;

    return el;
  }

  /**
   * Handles keyboard events on a secondary panel cell
   * @param event - Keyboard event
   * @param detail - the year or month of the event target cell
   */
  public handleSecondaryPanelKeydown(event: KeyboardEvent, detail: number): boolean {
    const currentCell = event.target as HTMLElement;

    if (!this.secondaryPanelCells) {
      return false;
    }

    // Get the index of the event target cell in the secondaryPanelCells array
    let index = this.secondaryPanelCells.indexOf(currentCell);

    switch (event.key) {
      case keyEnter: {
        this.$emit('secondaryPanelCellSelected', detail);
        break;
      }
      case keyArrowRight: {
        event.preventDefault();

        // Check if reached the end of the current year/decade
        if (index === this.secondaryPanelCells.length - 1) {
          this.yearPickerOpen
            ? (this.yearPickerDecade = this.getYearPickerInfo().nextStart)
            : (this.monthPickerYear = this.getMonthPickerInfo().next);
          return true;
        }
        index = (index + 1) % this.secondaryPanelCells.length;
        break;
      }
      case keyArrowLeft: {
        event.preventDefault();
        if (index === 0) {
          this.yearPickerOpen
            ? (this.yearPickerDecade = this.getYearPickerInfo().previousStart)
            : (this.monthPickerYear = this.getMonthPickerInfo().previous);
          return true;
        }
        index = (index - 1) % this.secondaryPanelCells.length;
        break;
      }
      case keyArrowDown: {
        event.preventDefault();
        if (index >= this.secondaryPanelCells.length - 4) {
          this.yearPickerOpen
            ? (this.yearPickerDecade = this.getYearPickerInfo().nextStart)
            : (this.monthPickerYear = this.getMonthPickerInfo().next);
        }
        index = (index + 4) % this.secondaryPanelCells.length;
        break;
      }
      case keyArrowUp: {
        event.preventDefault();
        if (index < 4) {
          this.yearPickerOpen
            ? (this.yearPickerDecade = this.getYearPickerInfo().previousStart)
            : (this.monthPickerYear = this.getMonthPickerInfo().previous);
        }
        index = (index - 4) % this.secondaryPanelCells.length;
        break;
      }
      case keyHome: {
        event.preventDefault();
        // Update focus to the first cell on the panel
        index = 0;
        break;
      }
      case keyEnd: {
        event.preventDefault();

        // Update focus to the last cell on the panel
        index = this.secondaryPanelCells.length - 1;
        break;
      }
      default:
        return true;
    }

    // Set focus on the cell corresponding to the updated index
    currentCell.tabIndex = -1;
    const focus = this.secondaryPanelCells[index] as HTMLElement;
    focus.tabIndex = 0;
    focus.focus();

    // return true;
  }

  /**
   * Handles keyboard events on the calendar control
   * Includes navigating months using page up and page down keys
   * @param event - Keyboard event
   */
  public handleControlKeydown(event: KeyboardEvent): boolean {
    switch (event.key) {
      case keyPageDown: {
        event.preventDefault();
        this.handleSwitchMonth(this.getMonthInfo().next.month, this.getMonthInfo().next.year);
        break;
      }
      case keyPageUp: {
        event.preventDefault();
        this.handleSwitchMonth(this.getMonthInfo().previous.month, this.getMonthInfo().previous.year);
        break;
      }
    }

    return true;
  }
}
