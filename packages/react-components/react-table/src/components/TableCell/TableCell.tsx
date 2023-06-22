import * as React from 'react';
import { useTableCell_unstable } from './useTableCell';
import { renderTableCell_unstable } from './renderTableCell';
import { useTableCellStyles_unstable } from './useTableCellStyles.styles';
import type { TableCellProps } from './TableCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * TableCell component
 */
export const TableCell: ForwardRefComponent<TableCellProps> = React.forwardRef((props, ref) => {
  const state = useTableCell_unstable(props, ref);

  useTableCellStyles_unstable(state);

  useCustomStyleHook_unstable('useTableCellStyles_unstable')(state);

  return renderTableCell_unstable(state);
});

TableCell.displayName = 'TableCell';
