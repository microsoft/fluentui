import * as React from 'react';
import { useTableCell_unstable } from './useTableCell';
import { renderTableCell_unstable } from './renderTableCell';
import { useTableCellStyles_unstable } from './useTableCellStyles';
import type { TableCellProps } from './TableCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * TableCell component
 */
export const TableCell: ForwardRefComponent<TableCellProps> = React.forwardRef((props, ref) => {
  const state = useTableCell_unstable(props, ref);

  useTableCellStyles_unstable(state);

  const { useTableCellStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderTableCell_unstable(state);
});

TableCell.displayName = 'TableCell';
