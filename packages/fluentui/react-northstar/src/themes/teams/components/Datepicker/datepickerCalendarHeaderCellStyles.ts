import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarHeaderCellStylesProps } from 'src/components/Datepicker/DatepickerCalendarHeaderCell';

export const datepickerCalendarHeaderCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderCellStylesProps,
  DatepickerVariables
> = {
  root: (): ICSSInJSStyle => {
    return {
      textAlign: 'center',
    };
  },
};
