import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { DatepickerVariables } from './datepickerVariables';
import type { DatepickerCalendarHeaderCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarHeaderCell';

export const datepickerCalendarHeaderCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderCellStylesProps,
  DatepickerVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      textAlign: 'center',
      verticalAlign: 'middle',

      fontWeight: v.calendarHeaderCellFontWeight,

      height: v.calendarHeaderCellHeight,
      width: v.calendarHeaderCellWidth,

      padding: v.calendarHeaderCellPadding,

      display: 'table-cell',
    };
  },
};
