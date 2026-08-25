import type * as React from 'react';
import type { ComponentProps, ComponentState, EventData, EventHandler, Slot } from '@fluentui/react-utilities';
import type { CalendarYearCell } from '../../contexts/calendarYearContext';

export type { CalendarContextValue, CalendarContextValues } from '../../contexts/calendarContext';

export type {
  CalendarYearCell,
  CalendarYearContextValue,
  CalendarYearContextValues,
} from '../../contexts/calendarYearContext';

/**
 * The imperative API exposed on CalendarYear's forwarded ref.
 */
export type CalendarYearHandle = {
  /**
   * Moves focus to the selected year, falling back to the current year.
   */
  focus(): void;
};

/**
 * Defines the CalendarYearRange contract.
 */

export interface CalendarYearRange {
  fromYear: number;
  toYear: number;
}

/**
 * Defines the CalendarYearSlots contract.
 */

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

  navigation: NonNullable<Slot<'div'>>;

  previousRangeButton: NonNullable<Slot<'button'>>;

  nextRangeButton: NonNullable<Slot<'button'>>;

  /**
   * The `role="grid"` container holding the year rows.
   */
  grid: NonNullable<Slot<'div'>>;
};

/**
 * Defines the CalendarYearSelectData contract.
 */

export type CalendarYearSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>> & {
  year: number;
};

/**
 * Defines the CalendarYearNavigateData contract.
 */

export type CalendarYearNavigateData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLButtonElement>> & {
  year: number;
};

/**
 * Defines the CalendarYearHeaderSelectData contract.
 */

export type CalendarYearHeaderSelectData = EventData<'click' | 'keydown', React.SyntheticEvent<HTMLElement>> & {
  focus: boolean;
};

/**
 * Defines the CalendarYearProps contract.
 */

export type CalendarYearProps = ComponentProps<Partial<CalendarYearSlots>> & {
  /**
   * The currently navigated year
   */
  navigatedYear?: number;

  /**
   * The highlighted year, which also decides which range the picker opens on. Defaults to the year
   * of the Calendar's selected value.
   */
  selectedYear?: number;

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

/**
 * Defines the CalendarYearState contract.
 */

export type CalendarYearState = ComponentState<CalendarYearSlots> & {
  /**
   * The first year of the visible range, used to replay the row motions on navigation.
   */
  fromYear: number;

  hasHeaderClickCallback: boolean;

  onSelectYear: CalendarYearProps['onSelectYear'];

  prevDisabled: boolean;

  nextDisabled: boolean;

  /**
   * Year cells grouped into rows of four.
   */
  yearRows: CalendarYearCell[][];

  currentYearRef: React.RefObject<HTMLButtonElement | null>;

  selectedYearRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * Row motion lives on CalendarYearGridRow, so the base and styled layers share the same props.
 */
export type CalendarYearBaseProps = CalendarYearProps;

/**
 * Defines the CalendarYearBaseState contract.
 */

export type CalendarYearBaseState = CalendarYearState;
