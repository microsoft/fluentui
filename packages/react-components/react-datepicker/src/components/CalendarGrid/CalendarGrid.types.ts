import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CalendarGridSlots = {
  root: Slot<'div'>;
};

/**
 * CalendarGrid Props
 */
export type CalendarGridProps = ComponentProps<CalendarGridSlots> & {};

/**
 * State used in rendering CalendarGrid
 */
export type CalendarGridState = ComponentState<CalendarGridSlots>;
// TODO: Remove semicolon from previous line, uncomment next line, and provide union of props to pick from CalendarGridProps.
// & Required<Pick<CalendarGridProps, 'propName'>>
