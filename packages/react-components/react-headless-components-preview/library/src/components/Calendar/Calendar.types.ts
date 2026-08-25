import type {
  CalendarBaseProps,
  CalendarBaseState,
  CalendarSlots as CalendarStyledSlots,
} from '@fluentui/react-calendar-preview';
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-utilities';
import type { CalendarDay } from './CalendarDay';
import type { CalendarMonth } from './CalendarMonth';

export type { CalendarDismissData, CalendarSelectDateData } from '@fluentui/react-calendar-preview';

/**
 * The picker slots are redeclared here so they resolve to the headless CalendarDay and
 * CalendarMonth rather than the styled ones.
 */
export type CalendarSlots = Omit<CalendarStyledSlots, 'dayPicker' | 'monthPicker'> & {
  /**
   * The day picker. Only rendered while `isDayPickerVisible` is set.
   */
  dayPicker: NonNullable<Slot<typeof CalendarDay>>;

  /**
   * The month picker. Only rendered while `isMonthPickerVisible` is set.
   */
  monthPicker: NonNullable<Slot<typeof CalendarMonth>>;
};

export type CalendarProps = CalendarBaseProps &
  ComponentProps<Partial<Pick<CalendarSlots, 'dayPicker' | 'monthPicker'>>>;

export type CalendarState = CalendarBaseState & ComponentState<Pick<CalendarSlots, 'dayPicker' | 'monthPicker'>>;
