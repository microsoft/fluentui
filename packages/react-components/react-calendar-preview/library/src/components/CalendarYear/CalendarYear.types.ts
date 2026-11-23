import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { CalendarElementProps, CalendarGridRow, CalendarRowWrapper } from '../../utils/calendarGrid.types';

/**
 * The imperative API exposed on CalendarYear's forwarded ref.
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
  fromYear: number;
  toYear: number;
}

/**
 * One year cell in the grid.
 */
export type CalendarYearCell = {
  /**
   * Four-digit year represented by the cell.
   */
  year: number;
  /**
   * Visible cell content.
   */
  content: React.ReactNode;
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
  /**
   * Props of the `button` rendered for the cell.
   */
  props: CalendarElementProps<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>;
};

/**
 * One row of year cells.
 */
export type CalendarYearRow = CalendarGridRow<CalendarYearCell>;

export type CalendarYearSlots = {
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
   * The `role="grid"` container holding the year rows. Owns arrow key navigation and the roving tab stop.
   */
  grid: NonNullable<Slot<'div'>>;
};

export type CalendarYearSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>> & {
  year: number;
};

export type CalendarYearNavigateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>> & {
  year: number;
};

export type CalendarYearHeaderSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  focus: boolean;
};

export type CalendarYearProps = ComponentProps<Partial<CalendarYearSlots>> & {
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
   * Renders the content of each year cell without replacing its selection and keyboard behavior.
   */
  renderYear?: (year: number) => React.ReactNode;

  /**
   * Callback action when a year is selected
   * @param year - The year the user selected
   */
  onSelectYear?: EventHandler<CalendarYearSelectData>;

  /**
   * Callback action when the decade is navigated
   * @param year - The year at the start of the new decade range being navigated to
   */
  onNavigateDate?: EventHandler<CalendarYearNavigateData>;

  /**
   * Callback action when the header is selected
   */
  onHeaderSelect?: EventHandler<CalendarYearHeaderSelectData>;
};

export type CalendarYearState = ComponentState<CalendarYearSlots> & {
  /**
   * The first year of the visible range.
   */
  fromYear: number;

  /**
   * Whether the heading is a button.
   */
  hasHeaderClickCallback: boolean;

  /**
   * Whether navigating to the previous range is allowed by `minDate`.
   */
  prevDisabled: boolean;

  /**
   * Whether navigating to the next range is allowed by `maxDate`.
   */
  nextDisabled: boolean;

  /**
   * Year cells grouped into rows of four.
   */
  yearRows: CalendarYearRow[];

  /**
   * Wraps each rendered row. The styled layer uses it for the row motion.
   */
  wrapRow?: CalendarRowWrapper<CalendarYearRow>;
};

export type CalendarYearBaseProps = CalendarYearProps;

export type CalendarYearBaseState = CalendarYearState;
