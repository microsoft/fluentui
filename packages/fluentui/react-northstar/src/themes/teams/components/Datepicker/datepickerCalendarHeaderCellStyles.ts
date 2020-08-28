import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarHeaderCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarHeaderCell';

export const datepickerCalendarHeaderCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderCellStylesProps,
  DatepickerVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      textAlign: 'center',
      fontWeight: v.calendarHeaderCellFontWeight,
    };
  },
};
