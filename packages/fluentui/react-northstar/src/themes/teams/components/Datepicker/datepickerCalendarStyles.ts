import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { DatepickerVariables } from './datepickerVariables';
import type { DatepickerCalendarStylesProps } from '../../../../components/Datepicker/DatepickerCalendar';

export const datepickerCalendarStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarStylesProps,
  DatepickerVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    minHeight: v.calendarMinHeight,
  }),
};
