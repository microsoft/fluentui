import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CalendarDaySlots = {
  root: Slot<'div'>;
};

/**
 * CalendarDay Props
 */
export type CalendarDayProps = ComponentProps<CalendarDaySlots> & {};

/**
 * State used in rendering CalendarDay
 */
export type CalendarDayState = ComponentState<CalendarDaySlots>;
// & Required<Pick<CalendarDayProps, 'propName'>>
