import { datepickerCalendarCellButtonClassName } from '../../../../components/Datepicker/DatepickerCalendarCellButton';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { DatepickerVariables } from './datepickerVariables';
import type { DatepickerCalendarGridRowStylesProps } from '../../../../components/Datepicker/DatepickerCalendarGridRow';

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
