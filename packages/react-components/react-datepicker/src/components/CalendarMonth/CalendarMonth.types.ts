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
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CalendarMonthProps.
// & Required<Pick<CalendarMonthProps, 'propName'>>
