import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarGridRowStylesProps } from '../../../../components/Datepicker/DatepickerCalendarGridRow';
import { datepickerCalendarCellButtonClassName } from '../../../../components/Datepicker/DatepickerCalendarCellButton';

export const datepickerCalendarGridRowStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarGridRowStylesProps,
  DatepickerVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      ...(p.isRowSelectionActive && {
        [`:hover .${datepickerCalendarCellButtonClassName}`]: {
          backgroundColor: v.calendarCellHoverBackgroundColor,
          color: v.calendarCellHoverColor,
        },
      }),
    };
  },
};
