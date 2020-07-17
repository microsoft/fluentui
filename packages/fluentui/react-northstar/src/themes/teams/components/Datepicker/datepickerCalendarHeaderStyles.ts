import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarHeaderStylesProps } from 'src/components/Datepicker/DatepickerCalendarHeader';

export const datepickerCalendarHeaderStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderStylesProps,
  DatepickerVariables
> = {
  root: (): ICSSInJSStyle => {
    return {
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      msGridColumns: '1fr auto auto',
    };
  },
};
