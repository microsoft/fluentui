import type * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  DistributiveOmit,
  EventData,
  EventHandler,
  Slot,
} from '@fluentui/react-utilities';
import type { CalendarFormatters, DateRangeType, DayOfWeek, FirstWeekOfYear } from './utils';
import type { CalendarContextValue } from './calendarContext';
import type { CalendarDay } from './CalendarDay';
import type { CalendarMonth } from './CalendarMonth';

export type { CalendarContextValue, CalendarContextValues } from './calendarContext';

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
   * The day picker. Set to `null` to select months without showing the day picker.
   */
  dayPicker?: Slot<typeof CalendarDay>;

  /**
   * Separates the day picker from the month picker when both are visible.
   */
  divider: NonNullable<Slot<'div'>>;

  /**
   * Wraps the month picker.
   */
  monthPickerWrapper: NonNullable<Slot<'div'>>;

  /**
   * The month picker. Set to `null` to show only the day picker.
   */
  monthPicker?: Slot<typeof CalendarMonth>;

  /**
   * The "go to today" button, rendered as the root's last child.
   * Use CSS to position it below either picker or across the full width. Set to `null` to hide it.
   */
  goToTodayButton?: Slot<'button'>;
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
  selectedDateRange: Date[];
};

/** Event data reported when the displayed date changes through user interaction. */
export type CalendarNavigateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  /** The date displayed by the calendar. */
  displayedDate: Date;
};

/** Picker views available when Calendar uses an overlay layout. */
export type CalendarView = 'day' | 'month';

/** Event data reported when user interaction changes the active overlay view. */
export type CalendarViewChangeData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  /** The active picker when the calendar uses an overlay layout. */
  view: CalendarView;
};

/** Controls how the day and month pickers are arranged. */
export type CalendarLayout = 'sideBySide' | 'overlay';

/**
 * Event data for dismissing the Calendar.
 */
export type CalendarDismissData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>>;

/**
 * Props for the Calendar component.
 */
export type CalendarProps = DistributiveOmit<ComponentProps<Partial<CalendarSlots>>, 'defaultValue'> & {
  /**
   * Callback for when a date is selected
   * @param date - The date the user selected
   * @param selectedDateRange - The resultant list of dates that are selected based on the date range type set
   * for the component.
   */
  onSelectDate?: EventHandler<CalendarSelectDateData>;

  /**
   * Callback for when calendar is closed
   */
  onDismiss?: EventHandler<CalendarDismissData>;

  /**
   * The selected date. `null` represents an explicitly empty controlled selection.
   * A value outside `minDate`/`maxDate` renders as an empty selection and warns in development.
   */
  value?: Date | null;

  /** The initial selected date when uncontrolled. `null` starts with no selection. */
  defaultValue?: Date | null;

  /** The displayed date, controlled independently of value. When omitted, external value changes navigate automatically. */
  displayedDate?: Date;

  /** The initial displayed date when uncontrolled. */
  defaultDisplayedDate?: Date;

  /** Called once per user navigation or selection action. External prop changes do not fire this callback. */
  onDisplayedDateChange?: EventHandler<CalendarNavigateData>;

  /** The active picker in an overlay layout. */
  view?: CalendarView;

  /** The initial active picker when uncontrolled. */
  defaultView?: CalendarView;

  /** Called when user interaction changes the active picker. */
  onViewChange?: EventHandler<CalendarViewChangeData>;

  /**
   * How the day and month pickers are arranged. Consumers control responsive layout changes.
   * @default 'sideBySide'
   */
  layout?: CalendarLayout;

  /**
   * Value of today. If unspecified, the current time on the client machine is used. Pass this explicitly
   * while server rendering to keep the server and client calendars consistent.
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
   * Whether the calendar should show the week-of-year number before each week row.
   * @default false
   */
  showWeekNumbers?: boolean;

  /**
   * Overrides date and accessibility label formatters. Omitted formatters use the defaults.
   */
  formatters?: Partial<CalendarFormatters>;

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
   * The days that are selectable when `dateRangeType` is `workWeek`.
   * If `dateRangeType` is not `workWeek` this property does nothing.
   * @default ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
   */
  workWeekDays?: DayOfWeek[];

  /**
   * Allows all dates and buttons to be focused, including disabled ones
   * @default false
   */
  allFocusable?: boolean;

  /**
   * Number of columns in the month picker.
   * @default 4
   */
  calendarMonthColumns?: 3 | 4;

  /**
   * Number of columns in the year picker.
   * @default 4
   */
  calendarYearColumns?: 3 | 4;
};

/**
 * State used to render the Calendar component.
 */
export type CalendarState = ComponentState<CalendarSlots> &
  CalendarContextValue & {
    /**
     * Whether the day picker is rendered.
     */
    isDayPickerVisible: boolean;

    /**
     * Whether the month picker is rendered.
     */
    isMonthPickerVisible: boolean;
  };
