import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { MotionSlotProps } from '@fluentui/react-motion';
import type { FadeParams } from '@fluentui/react-motion-components-preview';

/**
 * Defines the CalendarDayGridHeaderRowSlots contract.
 */

export type CalendarDayGridHeaderRowSlots = {
  /**
   * The `<tr>` holding the weekday labels.
   */
  root: NonNullable<Slot<'tr'>>;

  /**
   * The empty leading cell above the week numbers. Only rendered while the grid shows week numbers.
   */
  weekNumberSpacerCell?: Slot<'th'>;
};

/**
 * Defines the CalendarDayGridHeaderRowProps contract.
 */

export type CalendarDayGridHeaderRowProps = ComponentProps<Partial<CalendarDayGridHeaderRowSlots>> & {
  /**
   * Overrides the mount fade played by each weekday label. Pass `null` to disable the animation.
   */
  labelMotion?: Slot<MotionSlotProps<FadeParams>>;
};

/**
 * One weekday label, already resolved for the grid's first day of week and single-week view.
 */
export type CalendarWeekDayLabel = {
  /**
   * The short label shown in the cell.
   */
  content: string;

  /**
   * The full weekday name, used as the cell's accessible name and tooltip.
   */
  label: string;

  /**
   * Stable across navigation, so the mount fade plays once.
   */
  key: string;
};

/**
 * Label motion is a styled concern, so the base hook leaves it unresolved.
 */
export type CalendarDayGridHeaderRowBaseProps = Omit<CalendarDayGridHeaderRowProps, 'labelMotion'>;

/**
 * Defines the CalendarDayGridHeaderRowState contract.
 */

export type CalendarDayGridHeaderRowState = ComponentState<CalendarDayGridHeaderRowSlots> & {
  dayLabels: CalendarWeekDayLabel[];
};
