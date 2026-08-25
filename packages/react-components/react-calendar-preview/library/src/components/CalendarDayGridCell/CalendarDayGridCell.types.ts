import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { DayInfo } from '../../hooks/useWeeks';

/**
 * Defines the CalendarDayGridCellSlots contract.
 */

export type CalendarDayGridCellSlots = {
  /**
   * The `role="gridcell"` element for a single day. Resolved from the grid's `dayCell` shorthand,
   * so a consumer can take the cell over entirely.
   */
  root: NonNullable<Slot<'td'>>;

  /**
   * The button rendered inside the cell, which carries the day's accessible name.
   */
  button: NonNullable<Slot<'button'>>;

  /**
   * The formatted day number.
   */
  dayLabel: NonNullable<Slot<'span'>>;

  /**
   * The dot shown under marked days. Only rendered while the day is marked.
   */
  marker?: Slot<'div'>;
};

/**
 * Defines the CalendarDayGridCellProps contract.
 */

export type CalendarDayGridCellProps = ComponentProps<Partial<CalendarDayGridCellSlots>> & {
  day: DayInfo;

  dayIndex: number;

  weekIndex: number;

  /**
   * Set on the transition rows, which exist only to be animated out.
   */
  ariaHidden?: boolean;
};

/**
 * Defines the CalendarDayGridCellState contract.
 */

export type CalendarDayGridCellState = ComponentState<CalendarDayGridCellSlots> & {
  day: DayInfo;

  lightenDaysOutsideNavigatedMonth: boolean;
};
