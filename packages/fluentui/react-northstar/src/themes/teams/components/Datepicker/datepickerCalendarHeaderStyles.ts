import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarHeaderStylesProps } from '../../../../components/Datepicker/DatepickerCalendarHeader';

export const datepickerCalendarHeaderStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderStylesProps,
  DatepickerVariables
> = {
  root: (): ICSSInJSStyle => {
    return {
      // TODO: check if grid is needed here and if so, make sure that it works in IE11
      display: 'grid',
      gridTemplateColumns: '1fr auto auto',
      msGridColumns: '1fr auto auto',
    };
  },
};
