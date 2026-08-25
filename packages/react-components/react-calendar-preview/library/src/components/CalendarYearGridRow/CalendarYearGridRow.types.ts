import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MotionSlotProps } from '@fluentui/react-motion';
import type { CalendarYearCell } from '../../contexts/calendarYearContext';
import type { DirectionalSlideParams } from '../../utils/calendarMotions';

/**
 * Defines the CalendarYearGridRowSlots contract.
 */

export type CalendarYearGridRowSlots = {
  /**
   * The `role="row"` element holding one row of year cells.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The motion slot wrapping the row. Absent on the unstyled layer, which renders the rows
   * unanimated. Pass `null` to disable the animation.
   */
  motion?: Slot<MotionSlotProps<DirectionalSlideParams>>;
};

/**
 * Defines the CalendarYearGridRowProps contract.
 */

export type CalendarYearGridRowProps = ComponentProps<Partial<CalendarYearGridRowSlots>> & {
  /**
   * Index of the row within the year grid. Everything else is read from the CalendarYear context.
   */
  rowIndex: number;
};

/**
 * Defines the CalendarYearGridRowState contract.
 */

export type CalendarYearGridRowState = ComponentState<CalendarYearGridRowSlots> & {
  /**
   * The year cells in this row.
   */
  cells: CalendarYearCell[];
};

/**
 * Defines the CalendarYearGridRowBaseProps contract.
 */

export type CalendarYearGridRowBaseProps = Omit<CalendarYearGridRowProps, 'motion'>;

/**
 * Defines the CalendarYearGridRowBaseState contract.
 */

export type CalendarYearGridRowBaseState = Omit<CalendarYearGridRowState, 'motion'>;
