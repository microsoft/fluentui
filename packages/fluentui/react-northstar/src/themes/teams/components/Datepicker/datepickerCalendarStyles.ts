import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarStylesProps } from '../../../../components/Datepicker/DatepickerCalendar';

export const datepickerCalendarStyles: ComponentSlotStylesPrepared<DatepickerCalendarStylesProps, DatepickerVariables> =
  {
    root: ({ variables: v }): ICSSInJSStyle => ({
      minHeight: v.calendarMinHeight,
    }),
  };
