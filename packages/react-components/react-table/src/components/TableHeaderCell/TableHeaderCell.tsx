import * as React from 'react';
import { useTableHeaderCell_unstable } from './useTableHeaderCell';
import { renderTableHeaderCell_unstable } from './renderTableHeaderCell';
import { useTableHeaderCellStyles_unstable } from './useTableHeaderCellStyles';
import type { TableHeaderCellProps } from './TableHeaderCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TableHeaderCell component
 */
export const TableHeaderCell: ForwardRefComponent<TableHeaderCellProps> = React.forwardRef((props, ref) => {
  const state = useTableHeaderCell_unstable(props, ref);

  useTableHeaderCellStyles_unstable(state);
  return renderTableHeaderCell_unstable(state);
});

TableHeaderCell.displayName = 'TableHeaderCell';
