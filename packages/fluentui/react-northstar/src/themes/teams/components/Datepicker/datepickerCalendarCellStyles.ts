import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCell';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { pxToRem } from '../../../../utils';

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
      height: v.datepickerCalendarCellHeight,
      width: v.datepickerCalendarCellWidth,

      borderRadius: pxToRem(2),
      cursor: 'pointer',
      background: 'none',
      border: 'none',

      backgroundColor: v.datepickerCalendarCellBackgroundColor,
      color: v.datepickerCalendarCellColor,

      ...borderFocusStyles,

      ...(p.reference && {
        backgroundColor: v.datepickerCalendarCellReferenceBackgroundColor,
        color: v.datepickerCalendarCellReferenceColor,
        borderRadius: '50%',
      }),

      ...(p.unfocused && {
        color: v.datepickerCalendarCellUnfocusedColor,
      }),

      ...(p.selected && {
        color: v.datepickerCalendarCellSelectedColor,
        backgroundColor: v.datepickerCalendarCellSelectedBackgroundColor,
      }),

      ...(!p.disabled && {
        ':hover': {
          backgroundColor: v.datepickerCalendarCellHoverBackgroundColor,
          color: v.datepickerCalendarCellHoverColor,
        },
      }),

      ...(p.disabled && {
        color: v.datepickerCalendarCellDisabledColor,
        cursor: 'default',
        backgroundColor: v.datepickerCalendarCellDisabledBackgroundColor,
      }),
    };
  },
};
