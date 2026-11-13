import type * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  DistributiveOmit,
  EventData,
  EventHandler,
  JSXElement,
  RefAttributes,
  Slot,
} from '@fluentui/react-utilities';
import type { CalendarFormatters, Day, DateRangeType, DayOfWeek, FirstWeekOfYear } from './utils';

/** The grids Calendar can show. The month panel shows either the month grid or the year grid. */
export type CalendarView = 'day' | 'month' | 'year';

/** Controls how the day and month panels are arranged. */
export type CalendarLayout = 'sideBySide' | 'overlay';

type CalendarEventData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>>;

/**
 * Slots rendered once by Calendar.
 */
export type CalendarSlots = {
  /** Root container. */
  root: NonNullable<Slot<'div'>>;
  /** Announces the selected date to assistive technology. */
  liveRegion: NonNullable<Slot<'div'>>;
  /** The day panel, with `data-view="day"`. Set to `null` to select months without a day grid. */
  dayPicker?: Slot<'div'>;
  /** Separates the panels when both are visible. */
  divider: NonNullable<Slot<'div'>>;
  /** The month panel, with `data-view="month"` or `data-view="year"`. Set to `null` to show only the day grid. */
  monthPicker?: Slot<'div'>;
  /** The "go to today" button, rendered as the root's last child. Set to `null` to hide it. */
  goToTodayButton?: Slot<'button'>;
};

/**
 * Slots rendered once per visible panel. Consumer props apply to every panel; target a panel with its `data-view`.
 */
export type CalendarPanelSlots = {
  /** The panel container: the resolved `dayPicker` or `monthPicker` slot. */
  root: NonNullable<Slot<'div'>>;
  /** Holds the heading and the navigation. */
  header: NonNullable<Slot<'div'>>;
  /** Wraps the heading label; its `children` replace the label. A `button` when it switches views, otherwise a `div`. */
  heading: NonNullable<Slot<'button', 'div'>>;
  /** The month, year or year-range text, announced when it changes. */
  headingLabel: NonNullable<Slot<'span'>>;
  /** Wraps the previous, next and close buttons. */
  navigation: NonNullable<Slot<'div'>>;
  /** Navigates to the previous month, year or year range. */
  previousButton: NonNullable<Slot<'button'>>;
  /** Navigates to the next month, year or year range. */
  nextButton: NonNullable<Slot<'button'>>;
  /** The close button, rendered in the first panel only. */
  closeButton?: Slot<'button'>;
  /**
   * The `role="grid"` element: a `table` for days, a `div` for months and years. Single roving tab stop. Its
   * `children` replace every row, including the weekday header.
   */
  grid: NonNullable<Slot<'div'>>;
  /** The day grid's `thead`, holding the weekday header row. Day panel only; `null` omits the weekday header. */
  gridHeader?: Slot<'thead'>;
  /** The day grid's `tbody`, holding the week rows. Day panel only; `null` omits the week rows. */
  gridBody?: Slot<'tbody'>;
};

/** A day cell. `originalDate` is `null` for a civil date that does not exist in the local timezone. */
export type CalendarDayCellData = Day & {
  type: 'day';
  /** The formatted day number, or the civil date label when `originalDate` is `null`. */
  label: string;
  /** Whether this day is the grid's initial focus target. */
  isNavigated: boolean;
  /** Whether `getMarkedDays` marked this day. */
  isMarked: boolean;
};

/** A month cell. */
export type CalendarMonthCellData = {
  type: 'month';
  key: string;
  /** Zero-based month index. */
  index: number;
  label: string;
  isNavigated: boolean;
  /** Whether this is the current month. */
  isCurrent: boolean;
  isSelected: boolean;
  isInBounds: boolean;
};

/** A year cell. */
export type CalendarYearCellData = {
  type: 'year';
  key: string;
  year: number;
  label: string;
  isNavigated: boolean;
  /** Whether this is the current year. */
  isCurrent: boolean;
  isSelected: boolean;
  isInBounds: boolean;
};

/** Semantic data of any grid cell. Use `type` to tell them apart. */
export type CalendarCellData = CalendarDayCellData | CalendarMonthCellData | CalendarYearCellData;

/** Semantic weekday header data. */
export type CalendarWeekdayCellData = {
  key: string;
  dayOfWeek: DayOfWeek;
  /** The visible short weekday label, or a short month label at a month boundary in single-week view. */
  label: string;
  /** The full weekday or month label used as the cell's accessible name and title. */
  accessibleLabel: string;
};

/** A visible grid row. */
export type CalendarRowData =
  | { type: 'week'; key: number; cells: CalendarDayCellData[]; weekNumber?: number }
  | { type: 'weekday'; key: number; cells: CalendarWeekdayCellData[] }
  | { type: 'month'; key: number; cells: CalendarMonthCellData[] }
  | { type: 'year'; key: number; cells: CalendarYearCellData[] };

/** The props of the elements of a cell. */
export type CalendarCellProps = {
  /** The `role="gridcell"` element: a `td` for days, a `div` for months and years. */
  root: Omit<React.HTMLAttributes<HTMLElement>, 'children'> & RefAttributes<HTMLElement>;
  /** The cell button. Its `children` replace the label and marker when defined. */
  button: React.ComponentProps<'button'>;
  /** The day-number `span`. Day cells only. */
  label?: React.ComponentProps<'span'>;
  /** The marker `span`. Marked days only. */
  marker?: React.ComponentProps<'span'>;
};

/** The props of the elements of a row. */
export type CalendarRowProps = {
  /** The `role="row"` element: a `tr` for the day grid, a `div` for months and years. */
  root: Omit<React.HTMLAttributes<HTMLElement>, 'children'> & RefAttributes<HTMLElement>;
  /** The week-number `th`, or the weekday row's spacer. Day grid only, when week numbers are shown. */
  weekNumber?: React.ComponentProps<'th'>;
  /** The rendered cells. */
  children: React.ReactNode;
};

/** The props of a weekday header cell. */
export type CalendarWeekdayCellProps = {
  /** The `role="columnheader"` `th`. */
  root: React.ComponentProps<'th'>;
};

/**
 * Renders an element Calendar repeats. It receives the built-in props and the item's data, and `defaultRender`, which
 * renders the built-in markup from (possibly changed) props. Keep the grid roles, `tabIndex` and `aria-*` props so
 * keyboard navigation and assistive technology keep working.
 */
export type CalendarRenderFunction<TProps, TData> = (
  props: TProps,
  data: TData,
  defaultRender: (props: TProps) => JSXElement,
) => React.ReactNode;

/** Event data for a date selection. */
export type CalendarSelectDateData = CalendarEventData & {
  date: Date;
  /** Dates selected according to the configured range type, excluding unavailable dates. */
  selectedDateRange: Date[];
};

/** Event data reported when the displayed date changes through user interaction. */
export type CalendarNavigateData = CalendarEventData & { displayedDate: Date };

/** Event data reported when user interaction changes the view. */
export type CalendarViewChangeData = CalendarEventData & { view: CalendarView };

/** Event data for dismissing the Calendar. */
export type CalendarDismissData = CalendarEventData;

/** Props for Calendar. */
export type CalendarProps = DistributiveOmit<
  ComponentProps<Partial<CalendarSlots & Omit<CalendarPanelSlots, 'root'>>>,
  'defaultValue'
> & {
  onSelectDate?: EventHandler<CalendarSelectDateData>;
  onDismiss?: EventHandler<CalendarDismissData>;
  /** The selected date. `null` is an explicitly empty controlled selection. */
  value?: Date | null;
  defaultValue?: Date | null;
  displayedDate?: Date;
  defaultDisplayedDate?: Date;
  onDisplayedDateChange?: EventHandler<CalendarNavigateData>;
  /**
   * The active view. In the side-by-side layout the day grid stays visible and `view` only chooses between the month
   * and year grid.
   */
  view?: CalendarView;
  defaultView?: CalendarView;
  onViewChange?: EventHandler<CalendarViewChangeData>;
  /** @default 'sideBySide' */
  layout?: CalendarLayout;
  /**
   * The view the day heading opens. Defaults to `'month'` in the overlay layout; in the side-by-side layout the
   * heading is static unless this is set.
   */
  dayHeadingView?: 'month' | 'year';
  /** Hides the year grid, so the month heading does not open it. */
  yearPickerHidden?: boolean;
  today?: Date;
  /** @default 'day' */
  dateRangeType?: DateRangeType;
  /** Number of days selected in the `day` range type. */
  daysToSelectInDayView?: number;
  /** @default 'sunday' */
  firstDayOfWeek?: DayOfWeek;
  /** @default 'firstDay' */
  firstWeekOfYear?: FirstWeekOfYear;
  showWeekNumbers?: boolean;
  formatters?: Partial<CalendarFormatters>;
  minDate?: Date;
  maxDate?: Date;
  restrictedDates?: Date[];
  workWeekDays?: readonly DayOfWeek[];
  allFocusable?: boolean;
  /** @default 4 */
  calendarMonthColumns?: 3 | 4;
  /** @default 4 */
  calendarYearColumns?: 3 | 4;
  /** How many weeks to show. Defaults to the weeks of the displayed month. */
  weeksToShow?: number;
  /** Returns the days between the first and last visible dates that should be marked. */
  getMarkedDays?: (startingDate: Date, endingDate: Date) => Date[];
  /**
   * Renders each grid cell. Handlers added to the cell run before the grid's delegated selection and navigation;
   * `preventDefault` cancels the built-in action.
   */
  renderCell?: CalendarRenderFunction<CalendarCellProps, CalendarCellData>;
  /** Renders each grid row, including the weekday header row. */
  renderRow?: CalendarRenderFunction<CalendarRowProps, CalendarRowData>;
  /** Renders each weekday header cell. */
  renderWeekdayCell?: CalendarRenderFunction<CalendarWeekdayCellProps, CalendarWeekdayCellData>;
};

/** A visible panel and its rows. */
export type CalendarPanelState = ComponentState<CalendarPanelSlots> & {
  view: CalendarView;
  /** Grid rows. The day grid's first row is the weekday header. */
  rows: CalendarRowData[];
};

/** State used to render Calendar. */
export type CalendarState = ComponentState<CalendarSlots> &
  Pick<CalendarProps, 'renderCell' | 'renderRow' | 'renderWeekdayCell'> & {
    /** The visible panels, in render order. */
    panels: CalendarPanelState[];
    /** Returns the built-in props of a cell. */
    resolveCellProps: (cell: CalendarCellData) => CalendarCellProps;
    /** Returns the built-in props of a row, without its cells. */
    resolveRowProps: (row: CalendarRowData) => Omit<CalendarRowProps, 'children'>;
    /** Returns the built-in props of a weekday header cell. */
    resolveWeekdayCellProps: (weekday: CalendarWeekdayCellData) => CalendarWeekdayCellProps;
  };
