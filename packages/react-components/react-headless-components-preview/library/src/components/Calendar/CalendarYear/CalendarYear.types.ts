import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { CalendarGridRow } from '../hooks/useCalendarGrid';

/**
 * The imperative API exposed through CalendarYear's `imperativeRef` prop.
 */
export type CalendarYearHandle = {
  /**
   * Focuses the navigated year, or the selected/current year when navigation is unspecified,
   * within the focusable visible range.
   */
  focus(options?: FocusOptions): void;
};

/**
 * A range of years, inclusive.
 */
export interface CalendarYearRange {
  /**
   * The first year in the range.
   */
  fromYear: number;
  /**
   * The last year in the range.
   */
  toYear: number;
}

/**
 * Semantic year data stored in the grid and passed to cell getters, without DOM props.
 */
export type CalendarYearCellData = {
  /**
   * The numeric year represented by the cell.
   */
  year: number;
  /**
   * Formatted year label.
   */
  label: string;
  /**
   * Whether this is the current year.
   */
  isCurrent: boolean;
  /**
   * Whether this is the selected year.
   */
  isSelected: boolean;
  /**
   * Whether this is the focus target in the displayed range.
   */
  isNavigated: boolean;
  /**
   * Whether this year cannot be selected.
   */
  isDisabled: boolean;
};

/** Semantic year row passed to getters, without DOM props on the row or its cells. */
export type CalendarYearRowData = CalendarGridRow<CalendarYearCellData>;

/** Overrides for a year gridcell and its nested button. */
export type CalendarYearCellProps = {
  /**
   * Overrides for the `<div role="gridcell">`.
   */
  root?: Omit<React.ComponentProps<'div'>, 'children'> & { focusgroupstart?: string };
  /**
   * Overrides for the nested year button. Set `children` to customize the year content.
   */
  button?: React.ComponentProps<'button'>;
};

/** Overrides for a year row. */
export type CalendarYearRowProps = {
  /**
   * Overrides for the row's `<div>`. Its year cells remain controlled by the renderer.
   */
  root?: Omit<React.ComponentProps<'div'>, 'children'> & { focusgrouprow?: string };
};

/**
 * Slots rendered by the year picker.
 */
export type CalendarYearSlots = {
  /**
   * The outer container of the year picker.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * Holds the year range title and the navigation buttons.
   */
  header: NonNullable<Slot<'div'>>;

  /**
   * The year range label. Renders as a `button` when `onHeaderSelect` is set, otherwise as a
   * plain `div`.
   */
  heading: NonNullable<Slot<'button', 'div'>>;

  /**
   * Wraps the previous and next range buttons.
   */
  navigation: NonNullable<Slot<'div'>>;

  /**
   * The button to navigate to the previous year range.
   */
  previousRangeButton: NonNullable<Slot<'button'>>;

  /**
   * The button to navigate to the next year range.
   */
  nextRangeButton: NonNullable<Slot<'button'>>;

  /**
   * The grid holding the year rows. Focusgroup provides arrow navigation.
   */
  grid: NonNullable<Slot<'div'>>;
};

/**
 * Data describing a year selection.
 */
export type CalendarYearSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>> & {
  /**
   * The selected year.
   */
  year: number;
};

/**
 * Data describing navigation to another visible year range.
 */
export type CalendarYearNavigateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>> & {
  /**
   * The first year of the destination range.
   */
  year: number;
};

/**
 * Data describing activation of the year-range heading.
 */
export type CalendarYearHeaderSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  /**
   * Whether focus should move to the parent picker when returning from the year view.
   */
  focus: boolean;
};

/**
 * Props for the year picker. Shared selection, boundaries, and formatting come from CalendarProvider.
 */
export type CalendarYearProps = ComponentProps<Partial<CalendarYearSlots>> & {
  /**
   * Provides access to the picker's focus handle. The regular `ref` points to the root element.
   */
  imperativeRef?: React.Ref<CalendarYearHandle>;

  /**
   * The currently navigated year. Takes precedence over selectedYear for the displayed range and focus.
   */
  navigatedYear?: number;

  /**
   * The highlighted year. Initializes the displayed range and focus only when navigatedYear is omitted.
   * Defaults to the year of the Calendar's selected value. Set to null for an empty selection.
   */
  selectedYear?: number | null;

  /**
   * Overrides each year gridcell and its nested button. Use button.children to customize its content.
   * Receives semantic year data and a formatted label, not DOM props.
   * Refs are composed, class names appended and styles merged.
   * Defined consumer props override defaults, including roles, focus, disabled/selection state and data attributes.
   * Consumers are responsible for preserving accessibility and interaction semantics when overriding these props.
   * Handlers run before the delegated grid behavior; preventDefault cancels selection.
   * Called when the renderer resolves the cell's props, not while the hook builds its data.
   */
  getCellProps?: (year: CalendarYearCellData) => CalendarYearCellProps;

  /**
   * Overrides each row's default props, including its role and focus attributes, without replacing its cells.
   * Receives semantic row and year data. Called when the renderer resolves the row's props.
   */
  getRowProps?: (row: CalendarYearRowData) => CalendarYearRowProps;

  /**
   * Called when a year is selected. The event data includes the selected year.
   */
  onSelectYear?: EventHandler<CalendarYearSelectData>;

  /**
   * Called when navigation changes the visible twelve-year range.
   * The event data includes the first year of the destination range.
   */
  onNavigateDate?: EventHandler<CalendarYearNavigateData>;

  /**
   * Called when the year-range heading is activated to return to the parent picker.
   */
  onHeaderSelect?: EventHandler<CalendarYearHeaderSelectData>;
};

/**
 * Resolved slots, semantic grid data and on-demand prop getters used to render the year picker.
 */
export type CalendarYearState = ComponentState<CalendarYearSlots> & {
  /**
   * Semantic year data grouped into rows of three, without HTML prop bags.
   */
  yearRows: CalendarYearRowData[];

  /**
   * Resolves built-in HTML props and consumer overrides for a year without modifying its data.
   * Calls the consumer's `getCellProps` callback.
   * @param year - A year from a row in `yearRows`.
   * @returns Props for the year gridcell and its nested button.
   */
  getYearCellProps: (year: CalendarYearCellData) => Required<CalendarYearCellProps>;

  /**
   * Resolves built-in HTML props and consumer overrides for a row without modifying its data.
   * Calls the consumer's `getRowProps` callback.
   * @param row - A row from `yearRows`.
   * @returns Props for the row element.
   */
  getYearRowProps: (row: CalendarYearRowData) => Required<CalendarYearRowProps>;
};
