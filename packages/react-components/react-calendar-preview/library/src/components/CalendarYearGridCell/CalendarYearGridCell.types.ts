import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
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
export type CalendarYearGridCellProps = ComponentProps<Partial<CalendarYearGridCellSlots>> & {
  /**
   * The calendar year cell data associated with this grid cell.
   */
  cell: CalendarYearCell;
};

/**
 * Defines the CalendarYearGridCellState contract.
 */
export type CalendarYearGridCellState = ComponentState<CalendarYearGridCellSlots> & {
  /**
   * Whether the year represented by this cell is the current year.
   */
  isCurrent: boolean;

  /**
   * Whether the year represented by this cell is disabled.
   */
  isDisabled: boolean;

  /**
   * Whether the year represented by this cell is selected.
   */
  isSelected: boolean;
};
