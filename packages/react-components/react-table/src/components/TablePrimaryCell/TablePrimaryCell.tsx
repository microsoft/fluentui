import * as React from 'react';
import { useTablePrimaryCell_unstable } from './useTablePrimaryCell';
import { renderTablePrimaryCell_unstable } from './renderTablePrimaryCell';
import { useTablePrimaryCellStyles_unstable } from './useTablePrimaryCellStyles';
import type { TablePrimaryCellProps } from './TablePrimaryCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TablePrimaryCell component - TODO: add more docs
 */
export const TablePrimaryCell: ForwardRefComponent<TablePrimaryCellProps> = React.forwardRef((props, ref) => {
  const state = useTablePrimaryCell_unstable(props, ref);

  useTablePrimaryCellStyles_unstable(state);
  return renderTablePrimaryCell_unstable(state);
});

TablePrimaryCell.displayName = 'TablePrimaryCell';
