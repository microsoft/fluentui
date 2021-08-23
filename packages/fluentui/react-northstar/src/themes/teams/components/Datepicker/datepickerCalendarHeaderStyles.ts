import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { DatepickerVariables } from './datepickerVariables';
import type { DatepickerCalendarHeaderStylesProps } from '../../../../components/Datepicker/DatepickerCalendarHeader';

export const datepickerCalendarHeaderStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderStylesProps,
  DatepickerVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      display: 'flex',
      alignItems: 'center',
      paddingTop: v.calendarHeaderPaddingTop,
      paddingBottom: v.calendarHeaderPaddingBottom,
    };
  },
  label: ({ variables: v }): ICSSInJSStyle => {
    return {
      fontWeight: v.calendarHeaderLabelFontWeight,
      flexGrow: 1,
      paddingLeft: v.calendarHeaderLabelPaddingLeft,
    };
  },
};
