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
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CalendarDayProps.
// & Required<Pick<CalendarDayProps, 'propName'>>
