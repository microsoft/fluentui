import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarCellButtonStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCellButton';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const datepickerCalendarCellButtonStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarCellButtonStylesProps,
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

      height: '100%',
      width: '100%',

      cursor: 'pointer',
      border: v.calendarCellBorder,

      padding: v.calendarCellPadding,
      margin: v.calendarCellMargin,

      display: 'table-cell',

      position: 'relative',

      ...borderFocusStyles,

      backgroundColor: v.calendarCellBackgroundColor,
      color: v.calendarCellColor,

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
