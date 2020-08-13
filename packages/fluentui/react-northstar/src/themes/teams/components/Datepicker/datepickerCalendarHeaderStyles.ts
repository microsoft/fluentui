import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerCalendarHeaderVariables } from './datepickerCalendarHeaderVariables';
import { DatepickerCalendarHeaderStylesProps } from '../../../../components/Datepicker/DatepickerCalendarHeader';

export const datepickerCalendarHeaderStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderStylesProps,
  DatepickerCalendarHeaderVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '1ch',
    };
  },
  month: ({ variables: v }): ICSSInJSStyle => {
    return {
      fontWeight: v.monthFontWeight,
      flexGrow: 1,
    };
  },
};
