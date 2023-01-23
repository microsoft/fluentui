import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CalendarMonthSlots = {
  root: Slot<'div'>;
};

/**
 * CalendarMonth Props
 */
export type CalendarMonthProps = ComponentProps<CalendarMonthSlots> & {};

/**
 * State used in rendering CalendarMonth
 */
export type CalendarMonthState = ComponentState<CalendarMonthSlots>;
// & Required<Pick<CalendarMonthProps, 'propName'>>
