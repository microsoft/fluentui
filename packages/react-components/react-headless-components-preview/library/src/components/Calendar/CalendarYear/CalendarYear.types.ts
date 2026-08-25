import type { CalendarYearSlots as CalendarYearStyledSlots } from '@fluentui/react-calendar-preview';

export type {
  CalendarYearBaseProps as CalendarYearProps,
  CalendarYearBaseState as CalendarYearState,
  CalendarYearCell,
  CalendarYearContextValue,
  CalendarYearContextValues,
  CalendarYearHandle,
  CalendarYearHeaderSelectData,
  CalendarYearNavigateData,
  CalendarYearRange,
  CalendarYearSelectData,
} from '@fluentui/react-calendar-preview';

/**
 * Row motion is a styled concern, so the headless year picker renders its rows unanimated.
 */
export type CalendarYearSlots = Omit<CalendarYearStyledSlots, 'rowMotion'>;
