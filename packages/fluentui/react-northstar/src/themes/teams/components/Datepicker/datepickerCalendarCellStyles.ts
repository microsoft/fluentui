import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCell';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const datepickerCalendarCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarCellStylesProps,
  DatepickerVariables
> = {
  root: ({ props: p, variables: v, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;
    const { borderWidth } = siteVariables;

    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderPadding: borderWidth,
    });

    return {
      textAlign: 'center',
      height: v.calendarCellHeight,
      width: v.calendarCellWidth,

      borderRadius: v.calendarCellBorderRadius,
      cursor: 'pointer',
      border: v.calendarCellBorder,

      display: 'table-cell',

      position: 'relative',

      ...borderFocusStyles,

      backgroundColor: v.calendarCellBackgroundColor,
      color: v.calendarCellColor,

      ...(p.today && {
        backgroundColor: v.calendarCellTodayBackgroundColor,
        color: v.calendarCellTodayColor,
        borderRadius: v.calendarCellTodayBorderRadius,
      }),

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
    };
  },
};
