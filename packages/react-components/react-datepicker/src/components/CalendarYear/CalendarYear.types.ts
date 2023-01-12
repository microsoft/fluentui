import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';

export type CalendarYearSlots = {
  root: Slot<'div'>;
};

/**
 * CalendarYear Props
 */
export type CalendarYearProps = ComponentProps<CalendarYearSlots> & {};

/**
 * State used in rendering CalendarYear
 */
export type CalendarYearState = ComponentState<CalendarYearSlots>;
// & Required<Pick<CalendarYearProps, 'propName'>>
