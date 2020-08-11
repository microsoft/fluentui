import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { DatepickerVariables } from './datepickerVariables';
import { DatepickerCalendarCellStylesProps } from '../../../../components/Datepicker/DatepickerCalendarCell';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';
import { pxToRem } from '../../../../utils';

export const datepickerCalendarCellStyles: ComponentSlotStylesPrepared<
  DatepickerCalendarCellStylesProps,
  DatepickerVariables
> = {
  root: ({ props: p, theme }): ICSSInJSStyle => {
    const { siteVariables } = theme;
    const { borderWidth } = siteVariables;

    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
      borderPadding: borderWidth,
    });

    return {
      textAlign: 'center',
      height: pxToRem(32),
      width: pxToRem(32),

      ...borderFocusStyles,

      ...{
        backgroundColor: 'white',
        cursor: 'pointer',
        position: 'relative',
        background: 'none',
        color: 'inherit',
        border: 'none',
        padding: 0,
        font: 'inherit',
      },

      msGridRow: p.rowNumber,
      msGridColumn: p.columnNumber,

      ...(p.unfocused && {
        color: 'rgb(200, 198, 196)',
        fontWeight: '400',
      }),

      ...(p.selected && {
        cursor: 'pointer',
        fontWeight: 'normal',
        color: 'rgb(37, 36, 35)',
        backgroundColor: 'rgb(226, 226, 246) !important',
      }),

      ...(p.reference && {
        backgroundColor: 'rgb(98, 100, 167)',
        fontWeight: 'normal',
        color: 'rgb(255, 255, 255)',
        borderRadius: '50%',
      }),

      ':hover': {
        backgroundColor: siteVariables.colorScheme.silver.backgroundHover,
        color: siteVariables.colorScheme.black.foregroundHover,
      },
    };
  },
};
