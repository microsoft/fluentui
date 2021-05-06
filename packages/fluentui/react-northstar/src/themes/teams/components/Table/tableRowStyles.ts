import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TableVariables } from './tableVariables';
import { TableRowStylesProps } from '../../../../components/Table/TableRow';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const tableRowStyles: ComponentSlotStylesPrepared<TableRowStylesProps, TableVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
    });

    return {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      fontSize: v.bodyFontSize,
      height: v.defaultRowHeight,
      color: v.color,
      backgroundColor: v.backgroundColor,
      borderWidth: v.borderWidth,
      borderStyle: 'solid',
      borderColor: 'transparent',
      borderBottomColor: v.rowBorderColor,
      padding: v.rowPadding,
      position: 'relative',
      width: '100%',
      ':hover': {
        color: v.hoverColor,
        backgroundColor: v.backgroundHoverColor,
        borderColor: v.rowBorderHoverColor,
      },
      ...borderFocusStyles,
      ...(p.header && {
        fontSize: v.headerFontSize,
        ':hover': {
          color: v.color,
          backgroundColor: v.backgroundColor,
        },
      }),
      ...(p.compact && {
        height: v.compactRowHeight,
      }),
    };
  },
};
