import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MotionSlotProps } from '@fluentui/react-motion';
import type { DirectionalSlideOutParams } from '../../utils/calendarMotions';
import type { DayInfo } from '../../hooks/useWeeks';

/**
 * Defines the CalendarDayGridRowSlots contract.
 */

export type CalendarDayGridRowSlots = {
  /**
   * The `<tr>` holding one week of day cells.
   */
  root: NonNullable<Slot<'tr'>>;

  /**
   * The leading week number cell. Only rendered while the grid shows week numbers.
   */
  weekNumberCell?: Slot<'th'>;

  /**
   * The motion slot wrapping the row. The shorthand is resolved once per row, so each row animates in lockstep.
   */
  motion?: Slot<MotionSlotProps<DirectionalSlideOutParams>>;
};

/**
 * Defines the CalendarDayGridRowProps contract.
 */

export type CalendarDayGridRowProps = ComponentProps<Partial<CalendarDayGridRowSlots>> & {
  week: DayInfo[];

  weekIndex: number;

  /**
   * Marks the row as one of the hidden filler rows that only exist to be animated out. Transition
   * rows are skipped entirely when the layer supplies no motion.
   */
  transition?: 'first' | 'last';
};

/**
 * Defines the CalendarDayGridRowState contract.
 */

export type CalendarDayGridRowState = ComponentState<CalendarDayGridRowSlots> & {
  transition: CalendarDayGridRowProps['transition'];
};

/**
 * Row motion is a styled concern, so the base hook leaves it unresolved.
 */
export type CalendarDayGridRowBaseProps = Omit<CalendarDayGridRowProps, 'motion'>;
