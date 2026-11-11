import type * as React from 'react';
import type {
  ComponentProps,
  ComponentState,
  DistributiveOmit,
  EventData,
  EventHandler,
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
  /** The month, year or year-range label. A `button` when it switches views, otherwise a `div`. */
  heading: NonNullable<Slot<'button', 'div'>>;
  /** Wraps the previous, next and close buttons. */
  navigation: NonNullable<Slot<'div'>>;
  /** Navigates to the previous month, year or year range. */
  previousButton: NonNullable<Slot<'button'>>;
  /** Navigates to the next month, year or year range. */
  nextButton: NonNullable<Slot<'button'>>;
  /** The close button, rendered in the first panel only. */
  closeButton?: Slot<'button'>;
  /** The `role="grid"` element: a `table` for days, a `div` for months and years. Single roving tab stop. */
  grid: NonNullable<Slot<'div'>>;
};

/** A day cell. `originalDate` is `null` for a civil date that does not exist in the local timezone. */
export type CalendarDayCellData = Day & {
  type: 'day';
  /** The formatted day number, or the civil date label when `originalDate` is `null`. */
  label: string;
  /** Whether this day is the grid's initial focus target. */
  isNavigated: boolean;
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

/** Overrides for the elements of a cell. These are prop bags, not slots. */
export type CalendarCellProps = {
  /** The `role="gridcell"` element. Its children remain controlled by the renderer. */
  root?: Omit<React.HTMLAttributes<HTMLElement> & RefAttributes<HTMLElement>, 'children'>;
  /** The cell button. Set `children` to replace the label and marker. */
  button?: React.ComponentProps<'button'>;
  /** The day-number span. Day cells only. */
  label?: React.ComponentProps<'span'>;
  /** The marker span, applied only to marked days. */
  marker?: React.ComponentProps<'span'>;
};

/** Overrides for a row. */
export type CalendarRowProps = {
  root?: Omit<React.HTMLAttributes<HTMLElement>, 'children'>;
  /** The week-number `th`, or the weekday row's spacer. Day grid only, when week numbers are shown. */
  weekNumber?: React.ComponentProps<'th'>;
};

/** Overrides for a weekday header cell. */
export type CalendarWeekdayCellProps = {
  root?: React.ComponentProps<'th'>;
};

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
  workWeekDays?: DayOfWeek[];
  allFocusable?: boolean;
  /** @default 4 */
  calendarMonthColumns?: 3 | 4;
  /** @default 4 */
  calendarYearColumns?: 3 | 4;
  /** How many weeks to show. Defaults to the weeks of the displayed month. */
  weeksToShow?: number;
  /** Returns the days between the first and last visible dates that should be marked. */
  getMarkedDays?: (startingDate: Date, endingDate: Date) => Date[];
  /** Overrides the elements of each cell. Handlers run before the built-in behavior; preventDefault cancels it. */
  getCellProps?: (cell: CalendarCellData) => CalendarCellProps;
  /** Overrides each row, including the weekday header row. */
  getRowProps?: (row: CalendarRowData) => CalendarRowProps;
  /** Overrides each weekday header cell. */
  getWeekdayCellProps?: (weekday: CalendarWeekdayCellData) => CalendarWeekdayCellProps;
};

/** A visible panel and its rows. */
export type CalendarPanelState = ComponentState<CalendarPanelSlots> & {
  view: CalendarView;
  /** Grid rows. The day grid's first row is the weekday header. */
  rows: CalendarRowData[];
};

/** State used to render Calendar. */
export type CalendarState = ComponentState<CalendarSlots> & {
  /** The visible panels, in render order. */
  panels: CalendarPanelState[];
  /** Resolves built-in props and consumer overrides for a cell. */
  resolveCellProps: (cell: CalendarCellData) => CalendarCellProps & { root: object; button: object };
  /** Resolves built-in props and consumer overrides for a row. */
  resolveRowProps: (row: CalendarRowData) => CalendarRowProps & { root: object };
  /** Resolves built-in props and consumer overrides for a weekday header cell. */
  resolveWeekdayCellProps: (weekday: CalendarWeekdayCellData) => React.ComponentProps<'th'>;
};
