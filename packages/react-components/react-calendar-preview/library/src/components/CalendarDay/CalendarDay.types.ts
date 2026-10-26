import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { Day, DayGridOptions } from '../../utils';
import type { CalendarElementProps, CalendarRowWrapper } from '../../utils/calendarGrid.types';

export type { CalendarContextValue, CalendarContextValues } from '../../contexts/calendarContext';

/**
 * The imperative API exposed on CalendarDay's forwarded ref.
 */
export type CalendarDayHandle = {
  /**
   * Moves focus to the day the grid is currently navigated to.
   */
  focus(options?: FocusOptions): void;
};

export type CalendarDaySlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Holds the month/year title and the navigation buttons.
   */
  header: NonNullable<Slot<'div'>>;

  /**
   * The month and year label. Renders as a `button` when `onHeaderSelect` is set, otherwise as a
   * plain `div`.
   */
  heading: NonNullable<Slot<'button', 'div'>>;

  /**
   * Wraps the previous/next month and close buttons.
   */
  navigation: NonNullable<Slot<'div'>>;

  /**
   * The button to navigate to the previous month.
   */
  previousMonthButton: NonNullable<Slot<'button'>>;

  /**
   * The button to navigate to the next month.
   */
  nextMonthButton: NonNullable<Slot<'button'>>;

  /**
   * The close button.
   */
  closeButton?: Slot<'button'>;

  /**
   * The `<table role="grid">` holding the days of the navigated month. Owns arrow key navigation,
   * selection, range hover and the roving tab stop for every day cell.
   */
  grid: NonNullable<Slot<'table'>>;

  /**
   * The `<tbody>` wrapping the weekday header row and every week row.
   */
  body: NonNullable<Slot<'tbody'>>;
};

/**
 * A day in the grid. `originalDate` is `null` for a civil date that does not exist in the local timezone.
 */
export type DayInfo = Day;

/**
 * A day cell in the grid, with the props of each element rendered for it.
 */
export type CalendarDayCell = DayInfo & {
  /**
   * Props of the `<td role="gridcell">`, including the consumer props from `getDayCellProps`.
   */
  props: CalendarElementProps<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>;

  /**
   * Props of the `button` inside the cell, which carries the day's accessible name.
   */
  button: CalendarElementProps<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>;

  /**
   * Props of the `span` holding the formatted day number.
   */
  label: CalendarElementProps<HTMLSpanElement>;

  /**
   * Props of the dot shown under marked days. Only set while the day is marked.
   */
  marker?: CalendarElementProps<HTMLDivElement>;
};

/**
 * A week row of the grid.
 */
export type CalendarDayWeek = {
  /**
   * Stable key of the row, so rows keep their DOM elements across month navigation.
   */
  key: number;

  /**
   * Set on the hidden rows before and after the visible weeks, which only exist to be animated out.
   * They are rendered only when the layer animates rows.
   */
  transition?: 'first' | 'last';

  /**
   * Props of the `<tr>`.
   */
  props: CalendarElementProps<HTMLTableRowElement>;

  /**
   * Props of the leading week number `<th>`. Only set while week numbers are shown.
   */
  weekNumber?: CalendarElementProps<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>;

  /**
   * The day cells of the week.
   */
  days: CalendarDayCell[];
};

/**
 * The weekday header row of the grid.
 */
export type CalendarDayWeekdayRow = {
  /**
   * Props of the `<tr>`.
   */
  props: CalendarElementProps<HTMLTableRowElement>;

  /**
   * Props of the empty `<th>` above the week numbers. Only set while week numbers are shown.
   */
  weekNumberSpacer?: CalendarElementProps<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>;

  /**
   * The weekday `<th>` cells.
   */
  cells: {
    key: string;
    props: CalendarElementProps<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>;
  }[];
};

export type CalendarDaySelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  date: Date;
  selectedDateRange: Date[];
};

export type CalendarDayNavigateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  date: Date;
  focusOnNavigatedDay: boolean;
};

export type CalendarDayDismissData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>>;

export type CalendarDayHeaderSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>>;

/**
 * Custom props and ref for a visible day cell.
 */
export type CalendarDayCellProps = React.TdHTMLAttributes<HTMLTableCellElement> &
  CalendarElementProps<HTMLTableCellElement>;

/**
 * Props for the day picker. Shared selection, boundaries, and formatting come from CalendarProvider.
 */
export type CalendarDayProps = ComponentProps<Partial<CalendarDaySlots>> &
  Pick<Partial<DayGridOptions>, 'daysToSelectInDayView' | 'markedDays'> & {
    /**
     * The currently navigated date
     */
    navigatedDate?: Date;

    /**
     * Callback issued when a date in the calendar is navigated
     * @param date - The date that is navigated to
     * @param focusOnNavigatedDay - Whether to set the focus to the navigated date.
     */
    onNavigateDate?: EventHandler<CalendarDayNavigateData>;

    /**
     * Callback issued when calendar day is closed
     */
    onDismiss?: EventHandler<CalendarDayDismissData>;

    /**
     * Callback function when the header is selected
     */
    onHeaderSelect?: EventHandler<CalendarDayHeaderSelectData>;

    /**
     * How many weeks to show. If not provided, shows enough weeks to display the navigated month,
     * between 4 and 6 depending.
     * @default undefined
     */
    weeksToShow?: number;

    /**
     * Whether to show days outside the selected month with lighter styles
     * @default true
     */
    lightenDaysOutsideNavigatedMonth?: boolean;

    /**
     * Optional callback function to mark specific days with a small symbol. Fires when the date range changes,
     * gives the starting and ending displayed dates and expects the list of which days in between should be
     * marked.
     */
    getMarkedDays?: (startingDate: Date, endingDate: Date) => Date[];

    /**
     * Customizes each visible day cell. Cell refs are merged with the calendar's refs. Click and keyboard handlers
     * run before selection and navigation; preventDefault suppresses the built-in action.
     */
    getDayCellProps?: (date: Date) => CalendarDayCellProps;

    /**
     * Renders the content of each visible day's button without replacing its selection and keyboard behavior.
     * `defaultContent` is the formatted day number and the marker of a marked day.
     */
    renderDay?: (day: CalendarDayCell, defaultContent: React.ReactNode) => React.ReactNode;
  };

export type CalendarDayState = ComponentState<CalendarDaySlots> & {
  /**
   * The date currently displayed in the day grid.
   */
  navigatedDate: Date;

  /**
   * The available date that receives focus when focus moves into the grid.
   */
  focusTargetDate?: Date;

  /**
   * The formatted month and year shown in the header.
   */
  monthAndYear: string;

  /**
   * Whether navigating to the previous month is allowed by `minDate`.
   */
  prevMonthInBounds: boolean;

  /**
   * Whether navigating to the next month is allowed by `maxDate`.
   */
  nextMonthInBounds: boolean;

  /**
   * Whether the heading is a button.
   */
  headerIsClickable: boolean;

  /**
   * Whether days outside the displayed month use reduced emphasis.
   */
  lightenDaysOutsideNavigatedMonth: boolean;

  /**
   * Whether week numbers appear before each week row.
   */
  showWeekNumbers: boolean;

  /**
   * The weekday header row.
   */
  weekdayRow: CalendarDayWeekdayRow;

  /**
   * Every week row, including the leading and trailing transition rows.
   */
  weeks: CalendarDayWeek[];

  /**
   * Renders the content of each visible day's button.
   */
  renderDay?: CalendarDayProps['renderDay'];

  /**
   * Wraps each rendered week row. The styled layer uses it for the row motions.
   */
  wrapWeek?: CalendarRowWrapper<CalendarDayWeek>;

  /**
   * Wraps each rendered weekday header cell. The styled layer uses it for the label motion.
   */
  wrapWeekdayCell?: (cell: React.ReactElement) => React.ReactElement;
};

export type CalendarDayBaseProps = CalendarDayProps;

export type CalendarDayBaseState = CalendarDayState;
