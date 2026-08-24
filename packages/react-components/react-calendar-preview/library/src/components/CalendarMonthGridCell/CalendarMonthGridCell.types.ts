import type { ComponentState, Slot } from '@fluentui/react-utilities';
import type { CalendarMonthCell } from '../../contexts/calendarMonthContext';

/**
 * Defines the CalendarMonthGridCellSlots contract.
 */

export type CalendarMonthGridCellSlots = {
  /**
   * The button representing a month in the grid.
   */
  root: NonNullable<Slot<'button'>>;
};

/**
 * Defines the CalendarMonthGridCellProps contract.
 */

export type CalendarMonthGridCellProps = {
  month: CalendarMonthCell;
};

/**
 * Defines the CalendarMonthGridCellState contract.
 */

export type CalendarMonthGridCellState = ComponentState<CalendarMonthGridCellSlots> & {
  isCurrent: boolean;

  isInBounds: boolean;

  isSelected: boolean;
};
