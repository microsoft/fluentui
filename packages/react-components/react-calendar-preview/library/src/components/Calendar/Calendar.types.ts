import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { Button } from '@fluentui/react-button';
import type { DateRangeType, DayOfWeek, FirstWeekOfYear, FormatCalendarLabel, FormatDateTime } from '../../utils';
import type { CalendarContextValue, CalendarDayHandle } from '../CalendarDay/CalendarDay.types';
import type { CalendarMonthHandle } from '../CalendarMonth/CalendarMonth.types';
import type { CalendarDay } from '../../CalendarDay';
import type { CalendarMonth } from '../../CalendarMonth';

export type { CalendarContextValue, CalendarContextValues } from '../../contexts/calendarContext';

/**
 * Slots available to the Calendar component.
 */
export type CalendarSlots = {
  /**
   * Root container.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Announces the selected date to assistive technology.
   */
  liveRegion: NonNullable<Slot<'div'>>;

  /**
   * The day picker. Only rendered while `isDayPickerVisible` is set.
   */
  dayPicker: NonNullable<Slot<typeof CalendarDay>>;

  /**
   * Separates the day picker from the month picker when both are visible.
   */
  divider: NonNullable<Slot<'div'>>;

  /**
   * Wraps the month picker and the "go to today" button.
   */
  monthPickerWrapper: NonNullable<Slot<'div'>>;

  /**
   * The month picker. Only rendered while `isMonthPickerVisible` is set.
   */
  monthPicker: NonNullable<Slot<typeof CalendarMonth>>;

  /**
   * The "go to today" button. Set to `null` to hide it.
   */
  goToTodayButton?: Slot<typeof Button>;
};

/**
 * Event data for a date selection.
 */
export type CalendarSelectDateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  /**
   * The date selected by the user.
   */
  date: Date;
  /**
   * Dates selected according to the configured range type.
   */
  selectedDateRangeArray: Date[];
};

/**
 * Event data for dismissing the Calendar.
 */
export type CalendarDismissData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>>;

/**
 * Props for the Calendar component.
 */
export type CalendarProps = ComponentProps<Partial<CalendarSlots>> & {
  /**
   * Callback for when a date is selected
   * @param date - The date the user selected
   * @param selectedDateRangeArray - The resultant list of dates that are selected based on the date range type set
   * for the component.
   */
  onSelectDate?: EventHandler<CalendarSelectDateData>;

  /**
   * Callback for when calendar is closed
   */
  onDismiss?: EventHandler<CalendarDismissData>;

  /**
   * Default value of the Calendar, if any
   */
  value?: Date;

  /**
   * Value of today. If unspecified, current time in client machine will be used.
   */
  today?: Date;

  /**
   * The date range type indicating how many days should be selected as the user
   * selects days
   * @default 'day'
   */
  dateRangeType?: DateRangeType;

  /**
   * The first day of the week for your locale.
   * @default 'sunday'
   */
  firstDayOfWeek?: DayOfWeek;

  /**
   * Defines when the first week of the year should start.
   * @default 'firstDay'
   */
  firstWeekOfYear?: FirstWeekOfYear;

  /**
   * Whether the month picker is shown beside the day picker or hidden.
   * @default true
   */
  isMonthPickerVisible?: boolean;

  /**
   * Whether the day picker is shown beside the month picker or hidden.
   * @default true
   */
  isDayPickerVisible?: boolean;

  /**
   * Show month picker on top of date picker when visible.
   * @default false
   */
  showMonthPickerAsOverlay?: boolean;

  /**
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Formats localized labels used throughout the Calendar.
   */
  formatLabel?: FormatCalendarLabel;

  /**
   * Formats date values used throughout the Calendar.
   */
  formatDateTime?: FormatDateTime;

  /**
   * If set the Calendar will not allow navigation to or selection of a date earlier than this value.
   */
  minDate?: Date;

  /**
   * If set the Calendar will not allow navigation to or selection of a date later than this value.
   */
  maxDate?: Date;

  /**
   * If set the Calendar will not allow selection of dates in this array.
   */
  restrictedDates?: Date[];

  /**
   * The days that are selectable when `dateRangeType` is `WorkWeek`.
   * If `dateRangeType` is not `WorkWeek` this property does nothing.
   * @default [Monday,Tuesday,Wednesday,Thursday,Friday]
   */
  workWeekDays?: DayOfWeek[];

  /**
   * Whether the month picker should highlight the current month
   * @default false
   */
  highlightCurrentMonth?: boolean;

  /**
   * Whether the month picker should highlight the selected month
   * @default false
   */
  highlightSelectedMonth?: boolean;

  /**
   * Allows all dates and buttons to be focused, including disabled ones
   * @default false
   */
  allFocusable?: boolean;
};

/**
 * State used to render the Calendar component.
 */
export type CalendarState = ComponentState<CalendarSlots> &
  CalendarContextValue & {
    /**
     * Reference to the day picker.
     */
    dayPickerRef: React.RefObject<CalendarDayHandle | null>;

    /**
     * Reference to the month picker.
     */
    monthPickerRef: React.RefObject<CalendarMonthHandle | null>;

    /**
     * Whether the day picker is rendered.
     */
    isDayPickerVisible: boolean;

    /**
     * Whether the month picker is rendered.
     */
    isMonthPickerVisible: boolean;

    /**
     * Whether only the month picker is visible.
     */
    monthPickerOnly: boolean;

    /**
     * Whether the month picker overlays the day picker.
     */
    showMonthPickerAsOverlay: boolean;
  };

/**
 * Props used by the base Calendar state hook.
 */
export type CalendarBaseProps = CalendarProps;

/**
 * State returned by the base Calendar state hook.
 */
export type CalendarBaseState = CalendarState;
