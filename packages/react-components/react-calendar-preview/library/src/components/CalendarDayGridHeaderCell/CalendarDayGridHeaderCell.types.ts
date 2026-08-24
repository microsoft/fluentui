import type { ComponentProps, ComponentState, Slot, SlotComponentType } from '@fluentui/react-utilities';
import type { MotionComponentProps, MotionSlotProps } from '@fluentui/react-motion';
import type { FadeParams } from '@fluentui/react-motion-components-preview';
import type { CalendarWeekDayLabel } from '../CalendarDayGridHeaderRow/CalendarDayGridHeaderRow.types';

/**
 * What `motionSlot` hands back: the motion params baked in, plus the lifecycle callbacks that stay
 * settable at the render site.
 */
type ResolvedLabelMotion = SlotComponentType<
  Pick<MotionComponentProps, 'onMotionFinish' | 'onMotionStart' | 'onMotionCancel'> & FadeParams
>;

/**
 * Defines the CalendarDayGridHeaderCellSlots contract.
 */

export type CalendarDayGridHeaderCellSlots = {
  /**
   * The `<th>` holding one weekday label.
   */
  root: NonNullable<Slot<'th'>>;
};

/**
 * Defines the CalendarDayGridHeaderCellProps contract.
 */

export type CalendarDayGridHeaderCellProps = ComponentProps<Partial<CalendarDayGridHeaderCellSlots>> & {
  dayLabel: CalendarWeekDayLabel;

  /**
   * Overrides the mount fade. Pass `null` to disable the animation.
   */
  labelMotion?: Slot<MotionSlotProps<FadeParams>>;
};

/**
 * Label motion is a styled concern, so the base hook leaves it unresolved.
 */
export type CalendarDayGridHeaderCellBaseProps = Omit<CalendarDayGridHeaderCellProps, 'labelMotion'>;

/**
 * Defines the CalendarDayGridHeaderCellState contract.
 */

export type CalendarDayGridHeaderCellState = ComponentState<CalendarDayGridHeaderCellSlots> & {
  /**
   * Resolved by the styled hook only; the unstyled layer renders the labels unanimated.
   */
  labelMotion?: ResolvedLabelMotion;
};
