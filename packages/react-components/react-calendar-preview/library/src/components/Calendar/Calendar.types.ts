import type * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  DistributiveOmit,
  EventData,
  EventHandler,
  Slot,
} from '@fluentui/react-utilities';
import type { CalendarFormatters, DateRangeType, DayOfWeek, FirstWeekOfYear } from '../../utils';
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
   * The day picker. Set to `null` to select months without showing the day picker.
   */
  dayPicker?: Slot<typeof CalendarDay>;

  /**
   * Separates the day picker from the month picker when both are visible.
   */
  divider: NonNullable<Slot<'div'>>;

  /**
   * Wraps the month picker and the "go to today" button.
   */
  monthPickerWrapper: NonNullable<Slot<'div'>>;

  /**
   * The month picker. Set to `null` to show only the day picker.
   */
  monthPicker?: Slot<typeof CalendarMonth>;

  /**
   * The "go to today" button. Set to `null` to hide it.
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
export type CalendarLayout = 'auto' | 'sideBySide' | 'overlay';

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

  /** The selected date. `null` represents an explicitly empty controlled selection. */
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
   * How the day and month pickers are arranged. `auto` switches to an overlay below 440px.
   * @default 'auto'
   */
  layout?: CalendarLayout;

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
   * Whether the calendar should show the week-of-year number (1 through 53) before each week row.
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
     * Whether the day and month pickers replace one another.
     */
    isOverlay: boolean;
  };

/**
 * Props used by the base Calendar state hook.
 */
export type CalendarBaseProps = CalendarProps;

/**
 * State returned by the base Calendar state hook.
 */
export type CalendarBaseState = CalendarState;
