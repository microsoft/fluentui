import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCell';

export const datepickerCalendarCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarCellStylesProps,
  DatepickerVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      height: v.calendarCellHeight,
      width: v.calendarCellWidth,
      padding: v.calendarCellPadding,

      ':hover': {
        backgroundColor: v.calendarCellHoverBackgroundColor,
        color: v.calendarCellHoverColor,
      },

      ...(p.quiet && {
        color: v.calendarCellQuietColor,
      }),

      ...(p.selected && {
        color: v.calendarCellSelectedColor,
        backgroundColor: v.calendarCellSelectedBackgroundColor,
      }),

      ...(p.disabled && {
        color: v.calendarCellDisabledColor,
        cursor: 'default',
        backgroundColor: v.calendarCellDisabledBackgroundColor,
        ':hover': {},
      }),
    };
  },
};
