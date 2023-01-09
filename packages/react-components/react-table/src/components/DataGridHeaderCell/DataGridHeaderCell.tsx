import * as React from 'react';
import { useDataGridHeaderCell_unstable } from './useDataGridHeaderCell';
import { renderDataGridHeaderCell_unstable } from './renderDataGridHeaderCell';
import { useDataGridHeaderCellStyles_unstable } from './useDataGridHeaderCellStyles';
import type { DataGridHeaderCellProps } from './DataGridHeaderCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * DataGridHeaderCell component
 */
export const DataGridHeaderCell: ForwardRefComponent<DataGridHeaderCellProps> = React.forwardRef((props, ref) => {
  const state = useDataGridHeaderCell_unstable(props, ref);

  useDataGridHeaderCellStyles_unstable(state);
  return renderDataGridHeaderCell_unstable(state);
});

DataGridHeaderCell.displayName = 'DataGridHeaderCell';
