import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerCalendarHeaderCellVariables } from './datepickerCalendarHeaderCellVariables';
import { DatepickerCalendarHeaderCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarHeaderCell';

export const datepickerCalendarHeaderCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderCellStylesProps,
  DatepickerCalendarHeaderCellVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      textAlign: 'center',
      fontWeight: v.fontWeight,
    };
  },
};
