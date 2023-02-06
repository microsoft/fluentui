import * as React from 'react';
import { useTableSelectionCell_unstable } from './useTableSelectionCell';
import { renderTableSelectionCell_unstable } from './renderTableSelectionCell';
import { useTableSelectionCellStyles_unstable } from './useTableSelectionCellStyles';
import type { TableSelectionCellProps } from './TableSelectionCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TableSelectionCell component
 */
export const TableSelectionCell: ForwardRefComponent<TableSelectionCellProps> = React.forwardRef((props, ref) => {
  const state = useTableSelectionCell_unstable(props, ref);

  useTableSelectionCellStyles_unstable(state);
  return renderTableSelectionCell_unstable(state);
});

TableSelectionCell.displayName = 'TableSelectionCell';
