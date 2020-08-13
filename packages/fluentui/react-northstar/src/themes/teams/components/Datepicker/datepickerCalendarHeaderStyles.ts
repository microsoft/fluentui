import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerCalendarHeaderVariables } from './datepickerCalendarHeaderVariables';
import { DatepickerCalendarHeaderStylesProps } from '../../../../components/Datepicker/DatepickerCalendarHeader';

import { pxToRem } from '../../../../utils';

export const datepickerCalendarHeaderStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarHeaderStylesProps,
  DatepickerCalendarHeaderVariables
> = {
  root: ({ variables: v }): ICSSInJSStyle => {
    return {
      display: 'flex',
      alignItems: 'center',
      paddingTop: pxToRem(5),
      paddingBottom: pxToRem(5),
    };
  },
  month: ({ variables: v }): ICSSInJSStyle => {
    return {
      fontWeight: v.monthFontWeight,
      flexGrow: 1,
      paddingLeft: pxToRem(10),
    };
  },
};
