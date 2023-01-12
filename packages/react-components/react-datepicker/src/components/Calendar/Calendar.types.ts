import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CalendarSlots = {
  root: Slot<'div'>;
};

/**
 * Calendar Props
 */
export type CalendarProps = ComponentProps<CalendarSlots> & {};

/**
 * State used in rendering Calendar
 */
export type CalendarState = ComponentState<CalendarSlots>;
// & Required<Pick<CalendarProps, 'propName'>>
