import type {
  CalendarMonthBaseProps,
  CalendarMonthBaseState,
  CalendarMonthSlots as CalendarMonthStyledSlots,
} from '@fluentui/react-calendar-preview';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { CalendarYear } from '../CalendarYear';

export type {
  CalendarMonthCell,
  CalendarMonthContextValue,
  CalendarMonthContextValues,
  CalendarMonthHandle,
  CalendarMonthHeaderSelectData,
  CalendarMonthNavigateData,
  CalendarMonthSelectData,
} from '@fluentui/react-calendar-preview';

/**
 * Row motion is a styled concern, so the headless month picker renders its rows unanimated. The
 * year picker slot is redeclared here so it resolves to the headless CalendarYear.
 */
export type CalendarMonthSlots = Omit<CalendarMonthStyledSlots, 'rowMotion' | 'yearPicker'> & {
  /**
   * The year picker, which replaces the whole month picker while it is open. Only rendered while
   * `isYearPickerVisible` is set.
   */
  yearPicker: NonNullable<Slot<typeof CalendarYear>>;
};

export type CalendarMonthProps = CalendarMonthBaseProps &
  ComponentProps<Partial<Pick<CalendarMonthSlots, 'yearPicker'>>>;

export type CalendarMonthState = CalendarMonthBaseState & ComponentState<Pick<CalendarMonthSlots, 'yearPicker'>>;
