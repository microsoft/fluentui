import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCell';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

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
  tableCell: ({ props: p, variables: v }): ICSSInJSStyle => {
    return {
      height: v.calendarCellHeight,
      width: v.calendarCellWidth,
      padding: v.calendarCellPadding,

      ...cellStyles(p, v),
    };
  },

  button: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;
    const { borderWidth } = siteVariables;

    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderPadding: borderWidth,
    });

    return {
      textAlign: 'center',

      height: '100%',
      width: '100%',

      borderRadius: v.calendarCellBorderRadius,
      cursor: 'pointer',
      border: v.calendarCellBorder,

      padding: v.calendarCellPadding,
      margin: v.calendarCellMargin,

      display: 'table-cell',

      position: 'relative',

      ...borderFocusStyles,

      backgroundColor: v.calendarCellBackgroundColor,
      color: v.calendarCellColor,

      ...cellStyles(p, v),

      // Today's date only stays here because today's date is rendered circular.
      // The other properties would be rendered rectangular around it.
      ...(p.today && {
        backgroundColor: v.calendarCellTodayBackgroundColor,
        color: v.calendarCellTodayColor,
        borderRadius: v.calendarCellTodayBorderRadius,
      }),
    };
  },
};
