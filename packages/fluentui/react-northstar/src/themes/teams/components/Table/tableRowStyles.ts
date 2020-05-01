import { ComponentStyleFunctionParam, ICSSInJSStyle } from '@fluentui/styles';
import { TeamsTableVariables } from './tableVariables';
import { TableRowStylesProps } from '../../../../components/Table/TableRow';
import getBorderFocusStyles from '../../getBorderFocusStyles';

export default {
  root: ({
    props: { header, compact },
    variables: v,
    theme: { siteVariables },
  }: ComponentStyleFunctionParam<TableRowStylesProps, TeamsTableVariables>): ICSSInJSStyle => {
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
      ...(header && {
        fontSize: v.headerFontSize,
        ':hover': {
          color: v.color,
          backgroundColor: v.backgroundColor,
        },
      }),
      ...(compact && {
        height: v.compactRowHeight,
      }),
    };
  },
};
