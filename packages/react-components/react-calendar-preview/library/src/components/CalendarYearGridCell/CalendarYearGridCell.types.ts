import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type { CalendarYearCell } from '../../contexts/calendarYearContext';

/**
 * Defines the CalendarYearGridCellSlots contract.
 */

export type CalendarYearGridCellSlots = {
  /**
   * The button representing a year in the grid.
   */
  root: NonNullable<Slot<'button'>>;
};

/**
 * Defines the CalendarYearGridCellProps contract.
 */

export type CalendarYearGridCellProps = {
  cell: CalendarYearCell;
};

/**
 * Defines the CalendarYearGridCellState contract.
 */

export type CalendarYearGridCellState = ComponentState<CalendarYearGridCellSlots> & {
  isCurrent: boolean;

  isDisabled: boolean;

  isSelected: boolean;
};
