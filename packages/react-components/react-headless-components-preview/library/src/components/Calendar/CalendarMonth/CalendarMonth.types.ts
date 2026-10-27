import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { CalendarGridRow } from '../hooks/useCalendarGrid';
import type { CalendarYear } from '../CalendarYear/CalendarYear';

/**
 * The imperative API exposed through CalendarMonth's `imperativeRef` prop.
 */
export type CalendarMonthHandle = {
  /**
   * Moves focus to the navigated month (or the first available month if it is disabled),
   * or to the year picker while it is open.
   */
  focus(options?: FocusOptions): void;
};

/**
 * Semantic month data stored in the grid and passed to cell getters, without DOM props.
 */
export type CalendarMonthCellData = {
  /**
   * Index of the month within the year, matching `Date.prototype.getMonth()`.
   */
  index: number;
  /**
   * The formatted short month name displayed in the cell.
   */
  label: string;
  /**
   * Whether this month is the grid's initial focus target, falling back to an available month when needed.
   */
  isNavigated: boolean;
  /**
   * Whether this month matches today's month and year, independently of consumer styling.
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
};

/** Semantic month row passed to getters, without DOM props on the row or its cells. */
export type CalendarMonthRowData = CalendarGridRow<CalendarMonthCellData>;

/** Overrides for a month gridcell and its nested button. */
export type CalendarMonthCellProps = {
  /**
   * Overrides for the `<div role="gridcell">`.
   */
  root?: Omit<React.ComponentProps<'div'>, 'children'> & { focusgroupstart?: string };
  /**
   * Overrides for the nested month button. Set `children` to customize the month content.
   */
  button?: React.ComponentProps<'button'>;
};

/** Overrides for a month row. */
export type CalendarMonthRowProps = {
  /**
   * Overrides for the row's `<div>`. Its month cells remain controlled by the renderer.
   */
  root?: React.ComponentProps<'div'> & { focusgrouprow?: string };
};

/**
 * Slots rendered by the month picker.
 */
export type CalendarMonthSlots = {
  /**
   * The outer container of the month picker.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Holds the year title and the navigation buttons.
   */
  header: NonNullable<Slot<'div'>>;

  /**
   * The year label, which opens the year picker when it is not hidden.
   */
  heading: NonNullable<Slot<'button', 'div'>>;

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
   * The grid holding the month rows. Focusgroup provides arrow navigation.
   */
  grid: NonNullable<Slot<'div'>>;

  /**
   * The year picker, which replaces the whole month picker while it is open. Only rendered while
   * `isYearPickerVisible` is set.
   */
  yearPicker: NonNullable<Slot<typeof CalendarYear>>;
};

/**
 * Data describing a month selection and its bounded, unrestricted date range.
 */
export type CalendarMonthSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>> & {
  /**
   * An available day in the selected month, preserving the navigated day of the month when possible.
   */
  date: Date;
  /**
   * The dates selected for the configured range, excluding restricted and out-of-bounds dates.
   */
  selectedDateRange: Date[];
};

/**
 * Data describing a request to navigate the month picker.
 */
export type CalendarMonthNavigateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  /**
   * The date to navigate to.
   */
  date: Date;
  /**
   * Whether focus should move into the day grid after navigation.
   */
  focusOnNavigatedDay: boolean;
};

/**
 * Data describing activation of the month picker's heading or a month selection that returns to the day view.
 */
export type CalendarMonthHeaderSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>>;

/**
 * Props for the month picker. Shared selection, boundaries, and formatting come from CalendarProvider.
 */
export type CalendarMonthProps = ComponentProps<Partial<CalendarMonthSlots>> & {
  /**
   * Provides access to the picker's focus handle. The regular `ref` points to the root element.
   */
  imperativeRef?: React.Ref<CalendarMonthHandle>;

  /**
   * The currently navigated date
   */
  navigatedDate?: Date;

  /**
   * The date whose month is selected and whose year is selected in the year picker.
   * Defaults to the Calendar's selected value, or today when that value is undefined.
   * Set to null for an empty selection.
   */
  selectedDate?: Date | null;

  /**
   * Overrides each month gridcell and its nested button. Use button.children to customize its content.
   * Receives semantic month data and a formatted label, not DOM props.
   * Refs are composed, class names appended and styles merged.
   * Defined consumer props override defaults, including roles, focus, disabled/selection state and data attributes.
   * Consumers are responsible for preserving accessibility and interaction semantics when overriding these props.
   * Handlers run before the delegated grid behavior; preventDefault cancels selection.
   * Called when the renderer resolves the cell's props, not while the hook builds its data.
   */
  getCellProps?: (month: CalendarMonthCellData) => CalendarMonthCellProps;

  /**
   * Overrides each row's default props, including its role and focus attributes, without replacing its cells.
   * Receives semantic row and month data. Called when the renderer resolves the row's props.
   */
  getRowProps?: (row: CalendarMonthRowData) => CalendarMonthRowProps;

  /**
   * Called when a month is selected. The date is an available day in that month and the range
   * follows the CalendarProvider configuration. Year navigation does not select a month.
   */
  onSelectDate?: EventHandler<CalendarMonthSelectData>;

  /**
   * Called when month or year navigation is requested. The event data includes the destination date
   * and whether focus should move into the day grid.
   */
  onNavigateDate?: EventHandler<CalendarMonthNavigateData>;

  /**
   * Called when the heading is activated while the year picker is hidden, or when a month is selected
   * to return to the day view.
   */
  onHeaderSelect?: EventHandler<CalendarMonthHeaderSelectData>;

  /**
   * Whether the year picker is hidden
   * @default false
   */
  yearPickerHidden?: boolean;
};

/**
 * Resolved slots, semantic grid data and on-demand prop getters used to render the month picker.
 */
export type CalendarMonthState = ComponentState<CalendarMonthSlots> & {
  /**
   * When the year picker is open, CalendarMonth renders CalendarYear instead of its own grid.
   */
  isYearPickerVisible: boolean;

  /**
   * Semantic month data grouped into rows of three, without HTML prop bags.
   */
  monthRows: CalendarMonthRowData[];

  /**
   * Resolves built-in HTML props and consumer overrides for a month without modifying its data.
   * Calls the consumer's `getCellProps` callback.
   * @param month - A month from a row in `monthRows`.
   * @returns Props for the month gridcell and its nested button.
   */
  getMonthCellProps: (month: CalendarMonthCellData) => Required<CalendarMonthCellProps>;

  /**
   * Resolves built-in HTML props and consumer overrides for a row without modifying its data.
   * Calls the consumer's `getRowProps` callback.
   * @param row - A row from `monthRows`.
   * @returns Props for the row element.
   */
  getMonthRowProps: (row: CalendarMonthRowData) => Required<CalendarMonthRowProps>;
};
