import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { CalendarElementProps, CalendarGridRow, CalendarRowWrapper } from '../../utils/calendarGrid.types';
import type { CalendarYear } from '../CalendarYear/CalendarYear';
import type { CalendarYearHandle } from '../CalendarYear/CalendarYear.types';

/**
 * The imperative API exposed on CalendarMonth's forwarded ref.
 */
export type CalendarMonthHandle = {
  /**
   * Moves focus to the navigated month (or the first available month if it is disabled),
   * or to the year picker while it is open.
   */
  focus(options?: FocusOptions): void;
};

/**
 * One month cell in the grid.
 */
export type CalendarMonthCell = {
  /**
   * Index of the month within the year, matching `Date.prototype.getMonth()`.
   */
  index: number;
  /**
   * Visible month name.
   */
  label: string;
  /**
   * Whether this is the displayed month.
   */
  isNavigated: boolean;
  /**
   * Whether this is the current month.
   */
  isCurrent: boolean;
  /**
   * Whether this is the selected month.
   */
  isSelected: boolean;
  /**
   * Whether this month can be selected.
   */
  isInBounds: boolean;
  /**
   * Props of the `button` rendered for the cell.
   */
  props: CalendarElementProps<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>;
};

/**
 * One row of month cells.
 */
export type CalendarMonthRow = CalendarGridRow<CalendarMonthCell>;

export type CalendarMonthSlots = {
  root: NonNullable<Slot<'div'>>;

  /**
   * Holds the year title and the navigation buttons.
   */
  header: NonNullable<Slot<'div'>>;

  /**
   * The year label, which opens the year picker when it is not hidden.
   */
  heading: NonNullable<Slot<'button'>>;

  /**
   * Wraps the previous and next year buttons.
   */
  navigation: NonNullable<Slot<'div'>>;

  /**
   * The button to navigate to the previous year.
   */
  previousYearButton: NonNullable<Slot<'button'>>;

  /**
   * The button to navigate to the next year.
   */
  nextYearButton: NonNullable<Slot<'button'>>;

  /**
   * The `role="grid"` container holding the month rows. Owns arrow key navigation and the roving tab stop.
   */
  grid: NonNullable<Slot<'div'>>;

  /**
   * The year picker, which replaces the whole month picker while it is open. Only rendered while
   * `isYearPickerVisible` is set.
   */
  yearPicker: NonNullable<Slot<typeof CalendarYear>>;
};

export type CalendarMonthSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>> & {
  date: Date;
  selectedDateRange: Date[];
};

export type CalendarMonthNavigateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  date: Date;
  focusOnNavigatedDay: boolean;
};

export type CalendarMonthHeaderSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>>;

export type CalendarMonthProps = ComponentProps<Partial<CalendarMonthSlots>> & {
  /**
   * The currently navigated date
   */
  navigatedDate?: Date;

  /**
   * The date whose month is highlighted when `highlightSelectedMonth` is set, and whose year the
   * year picker opens on. Defaults to the Calendar's selected value.
   */
  selectedDate?: Date | null;

  /**
   * Called when a month is selected. The date is an available day in that month and the range
   * follows the CalendarProvider configuration. Year navigation does not select a month.
   */
  onSelectDate?: EventHandler<CalendarMonthSelectData>;

  /**
   * Callback issued when the year is navigated
   * @param date - The date that is navigated to
   * @param focusOnNavigatedDay - Whether to set the focus to the navigated date.
   */
  onNavigateDate?: EventHandler<CalendarMonthNavigateData>;

  /**
   * Callback function when the header is selected
   */
  onHeaderSelect?: EventHandler<CalendarMonthHeaderSelectData>;

  /**
   * Whether the year picker is hidden
   * @default false
   */
  yearPickerHidden?: boolean;
};

export type CalendarMonthState = ComponentState<CalendarMonthSlots> & {
  /**
   * When the year picker is open, CalendarMonth renders CalendarYear instead of its own grid.
   */
  isYearPickerVisible: boolean;

  /**
   * Reference to the year picker while it is open.
   */
  yearPickerRef: React.RefObject<CalendarYearHandle | null>;

  /**
   * Whether the heading opens the year picker or reports `onHeaderSelect`.
   */
  headerIsClickable: boolean;

  /**
   * Whether navigating to the previous year is allowed by `minDate`.
   */
  isPrevYearInBounds: boolean;

  /**
   * Whether navigating to the next year is allowed by `maxDate`.
   */
  isNextYearInBounds: boolean;

  /**
   * Month cells grouped into rows of four.
   */
  monthRows: CalendarMonthRow[];

  /**
   * The year the grid is showing.
   */
  navigatedYear: number;

  /**
   * Wraps each rendered row. The styled layer uses it for the row motion.
   */
  wrapRow?: CalendarRowWrapper<CalendarMonthRow>;
};

export type CalendarMonthBaseProps = CalendarMonthProps;

export type CalendarMonthBaseState = CalendarMonthState;
