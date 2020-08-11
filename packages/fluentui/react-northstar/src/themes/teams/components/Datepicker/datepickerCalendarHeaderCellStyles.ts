import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarHeaderCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarHeaderCell';

export const datepickerCalendarHeaderCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderCellStylesProps,
  DatepickerVariables
> = {
  root: ({ props: p }): ICSSInJSStyle => {
    return {
      textAlign: 'center',

      msGridRow: p.rowNumber,
      msGridColumn: p.columnNumber,
    };
  },
};
