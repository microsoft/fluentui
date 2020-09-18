import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { TableVariables } from './tableVariables';
import { TableCellStylesProps } from '../../../../components/Table/TableCell';
import { getBorderFocusStyles } from '../../getBorderFocusStyles';

export const tableCellStyles: ComponentSlotStylesPrepared<TableCellStylesProps, TableVariables> = {
  root: ({ variables: v, theme: { siteVariables } }): ICSSInJSStyle => {
    const borderFocusStyles = getBorderFocusStyles({
      variables: siteVariables,
    });

    return {
      display: 'flex',
      flexFlow: 'row nowrap',
      flexGrow: 1,
      flexBasis: 0,
      minWidth: v.minCellWidth,
      outline: 0,
      borderWidth: v.borderWidth,
      borderStyle: 'solid',
      borderColor: 'transparent',
      ...borderFocusStyles,
      padding: v.cellPadding,
      position: 'relative',
      height: '100%',
    };
  },
  content: ({ props: p }): ICSSInJSStyle => {
    return {
      alignSelf: 'center',
      ...(p.truncateContent && {
        display: 'block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
    };
  },
};
