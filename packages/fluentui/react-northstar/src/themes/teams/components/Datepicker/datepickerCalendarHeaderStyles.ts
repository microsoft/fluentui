import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerCalendarHeaderVariables } from './datepickerCalendarHeaderVariables';
import { DatepickerCalendarHeaderStylesProps } from '../../../../components/Datepicker/DatepickerCalendarHeader';

export const datepickerCalendarHeaderStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderStylesProps,
  DatepickerCalendarHeaderVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      display: ['grid', '-ms-grid'],
      gridTemplateColumns: '1fr auto auto',
      msGridColumns: '1fr auto auto',
    };
  },
  month: ({ variables: v }): ICSSInJSStyle => {
    return {
      fontWeight: v.monthFontWeight,
    };
  },
};
