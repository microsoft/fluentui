import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCell';

export const datepickerCalendarCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarCellStylesProps,
  DatepickerVariables
> = {
  root: ({ props: p }): ICSSInJSStyle => {
    return {
      textAlign: 'center',
      ...(p.hidden && {
        display: 'none',
      }),
    };
  },
};
