import type { CalendarDayGridHeaderCellSlots as StyledSlots } from '@fluentui/react-calendar-preview';
import type { ComponentState } from '@fluentui/react-utilities';

export type { CalendarDayGridHeaderCellBaseProps as CalendarDayGridHeaderCellProps } from '@fluentui/react-calendar-preview';

/**
 * Weekday-label slots without the styled layer's motion wrapper.
 */
export type CalendarDayGridHeaderCellSlots = Omit<StyledSlots, 'labelMotion'>;

/**
 * Normalized state of an unstyled weekday label.
 */
export type CalendarDayGridHeaderCellState = ComponentState<CalendarDayGridHeaderCellSlots>;
