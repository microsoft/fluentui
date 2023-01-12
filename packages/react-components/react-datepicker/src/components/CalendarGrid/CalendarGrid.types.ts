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
// & Required<Pick<CalendarGridProps, 'propName'>>
