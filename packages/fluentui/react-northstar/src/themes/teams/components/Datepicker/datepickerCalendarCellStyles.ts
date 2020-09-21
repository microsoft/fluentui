import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCell';

const cellStyles = (p: DatepickerCalendarCellStylesProps, v: DatepickerVariables) => ({
  ...(p.quiet && {
    color: v.calendarCellQuietColor,
  }),

  ...(p.selected && {
    color: v.calendarCellSelectedColor,
    backgroundColor: v.calendarCellSelectedBackgroundColor,
  }),

  ...(!p.disabled && {
    ':hover': {
      backgroundColor: v.calendarCellHoverBackgroundColor,
      color: v.calendarCellHoverColor,
    },
  }),

  ...(p.disabled && {
    color: v.calendarCellDisabledColor,
    cursor: 'default',
    backgroundColor: v.calendarCellDisabledBackgroundColor,
  }),
});

export const datepickerCalendarCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarCellStylesProps,
  DatepickerVariables
> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      height: v.calendarCellHeight,
      width: v.calendarCellWidth,
      padding: v.calendarCellPadding,

      ...cellStyles(p, v),
    };
  },
};
