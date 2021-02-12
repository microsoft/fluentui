import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarGridStylesProps } from '../../../../components/Datepicker/DatepickerCalendarGrid';

export const datepickerCalendarGridStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarGridStylesProps,
  DatepickerVariables
> = {
  root: (): ICSSInJSStyle => {
    return { 'border-spacing': '0rem', tableLayout: 'fixed' };
  },
};
