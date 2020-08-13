import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerCalendarCellVariables } from './datepickerCalendarCellVariables';
import { DatepickerCalendarCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCell';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { pxToRem } from '../../../../utils';

export const datepickerCalendarCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarCellStylesProps,
  DatepickerCalendarCellVariables
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
      height: v.height,
      width: v.width,

      borderRadius: pxToRem(2),
      cursor: 'pointer',
      background: 'none',
      border: 'none',

      backgroundColor: v.backgroundColor,
      color: v.color,

      ...borderFocusStyles,

      ...(p.unfocused && {
        color: v.unfocusedColor,
      }),

      ...(p.selected && {
        color: v.selectedColor,
        backgroundColor: v.selectedBackgroundColor,
      }),

      ...(p.reference && {
        backgroundColor: v.referenceBackgroundColor,
        color: v.referenceColor,
        borderRadius: '50%',
      }),

      ':hover': {
        backgroundColor: v.hoverBackgroundColor,
        color: v.hoverColor,
      },
    };
  },
};
