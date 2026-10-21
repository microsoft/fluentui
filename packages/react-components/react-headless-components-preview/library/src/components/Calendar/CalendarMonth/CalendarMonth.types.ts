import type {
  CalendarMonthBaseProps,
  CalendarMonthBaseState,
  CalendarMonthSlots as CalendarMonthBaseSlots,
} from '@fluentui/react-calendar-preview';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { CalendarYear } from '../CalendarYear';

export type {
  CalendarMonthCell,
  CalendarMonthHandle,
  CalendarMonthHeaderSelectData,
  CalendarMonthNavigateData,
  CalendarMonthRow,
  CalendarMonthSelectData,
} from '@fluentui/react-calendar-preview';

/**
 * The year picker slot is redeclared so it resolves to the headless CalendarYear.
 */
export type CalendarMonthSlots = Omit<CalendarMonthBaseSlots, 'yearPicker'> & {
  /**
   * The year picker, which replaces the whole month picker while it is open. Only rendered while
   * `isYearPickerVisible` is set.
   */
  yearPicker: NonNullable<Slot<typeof CalendarYear>>;
};

export type CalendarMonthProps = CalendarMonthBaseProps &
  ComponentProps<Partial<Pick<CalendarMonthSlots, 'yearPicker'>>>;

export type CalendarMonthState = CalendarMonthBaseState & ComponentState<Pick<CalendarMonthSlots, 'yearPicker'>>;
