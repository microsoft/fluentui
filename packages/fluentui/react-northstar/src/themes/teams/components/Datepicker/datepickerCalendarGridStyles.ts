import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { DatepickerVariables } from './datepickerVariables';
import type { DatepickerCalendarGridStylesProps } from '../../../../components/Datepicker/DatepickerCalendarGrid';

export const datepickerCalendarGridStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarGridStylesProps,
  DatepickerVariables
> = {
  root: (): ICSSInJSStyle => {
    return { 'border-spacing': '0rem', tableLayout: 'fixed' };
  },
};
