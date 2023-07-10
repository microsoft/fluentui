import { attr } from '@microsoft/fast-element';
import { FASTCalendar } from '@microsoft/fast-foundation';
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
  public monthPickerVisible?: boolean = true;

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
  public showSlottedLink?: boolean = true;

  /**
   * the month picker should highlight the current month
   *
   * @public
   * @remarks
   * HTML Attribute: highlight-current-month
   */
  @attr({ attribute: 'highlight-current-month', mode: 'boolean' })
  public highlightCurrentMonth?: boolean = false;

  /**
   * the month picker should highlight the selected month
   *
   * @public
   * @remarks
   * HTML Attribute: highlight-selected-month
   */
  @attr({ attribute: 'highlight-selected-month', mode: 'boolean' })
  public highlightSelectedMonth?: boolean = false;
}
