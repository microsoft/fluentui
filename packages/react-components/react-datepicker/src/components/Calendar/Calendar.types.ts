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
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CalendarProps.
// & Required<Pick<CalendarProps, 'propName'>>
