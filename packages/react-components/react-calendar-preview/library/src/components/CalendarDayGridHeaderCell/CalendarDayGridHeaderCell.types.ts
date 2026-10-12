import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MotionSlotProps } from '@fluentui/react-motion';
import type { FadeParams } from '@fluentui/react-motion-components-preview';
import type { CalendarWeekDayLabel } from '../CalendarDayGridHeaderRow/CalendarDayGridHeaderRow.types';

/**
 * Defines the CalendarDayGridHeaderCellSlots contract.
 */
export type CalendarDayGridHeaderCellSlots = {
  /**
   * The `<th>` holding one weekday label.
   */
  root: NonNullable<Slot<'th'>>;

  /**
   * Optional motion slot for the label.
   */
  labelMotion?: Slot<MotionSlotProps<FadeParams>>;
};

/**
 * Defines the CalendarDayGridHeaderCellBaseSlots contract.
 */
export type CalendarDayGridHeaderCellBaseSlots = Omit<CalendarDayGridHeaderCellSlots, 'labelMotion'>;

/**
 * Defines the CalendarDayGridHeaderCellProps contract.
 */
export type CalendarDayGridHeaderCellProps = ComponentProps<Partial<CalendarDayGridHeaderCellSlots>> & {
  dayLabel: CalendarWeekDayLabel;
};

/**
 * Label motion is a styled concern, so the base hook leaves it unresolved.
 */
export type CalendarDayGridHeaderCellBaseProps = ComponentProps<Partial<CalendarDayGridHeaderCellBaseSlots>> &
  Pick<CalendarDayGridHeaderCellProps, 'dayLabel'>;

/**
 * Defines the CalendarDayGridHeaderCellState contract.
 */
export type CalendarDayGridHeaderCellState = ComponentState<CalendarDayGridHeaderCellSlots>;

/**
 * Defines the CalendarDayGridHeaderCellBaseState contract.
 */
export type CalendarDayGridHeaderCellBaseState = ComponentState<CalendarDayGridHeaderCellBaseSlots>;
