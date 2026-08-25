import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MotionSlotProps } from '@fluentui/react-motion';
import type { CalendarMonthCell } from '../../contexts/calendarMonthContext';
import type { DirectionalSlideParams } from '../../utils/calendarMotions';

/**
 * Defines the CalendarMonthGridRowSlots contract.
 */

export type CalendarMonthGridRowSlots = {
  /**
   * The `role="row"` element holding one row of month cells.
   */
  root: NonNullable<Slot<'div'>>;

  /**
   * The motion slot wrapping the row. Absent on the unstyled layer, which renders the rows
   * unanimated. Pass `null` to disable the animation.
   */
  motion?: Slot<MotionSlotProps<DirectionalSlideParams>>;
};

/**
 * Defines the CalendarMonthGridRowProps contract.
 */

export type CalendarMonthGridRowProps = ComponentProps<Partial<CalendarMonthGridRowSlots>> & {
  /**
   * Index of the row within the month grid. Everything else is read from the CalendarMonth context.
   */
  rowIndex: number;
};

/**
 * Defines the CalendarMonthGridRowState contract.
 */

export type CalendarMonthGridRowState = ComponentState<CalendarMonthGridRowSlots> & {
  /**
   * The month cells in this row.
   */
  cells: CalendarMonthCell[];
};
