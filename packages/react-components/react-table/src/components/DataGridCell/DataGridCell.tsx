import * as React from 'react';
import { useDataGridCell_unstable } from './useDataGridCell';
import { renderDataGridCell_unstable } from './renderDataGridCell';
import { useDataGridCellStyles_unstable } from './useDataGridCellStyles';
import type { DataGridCellProps } from './DataGridCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHooks_unstable } from '@fluentui/react-shared-contexts';

/**
 * DataGridCell component
 */
export const DataGridCell: ForwardRefComponent<DataGridCellProps> = React.forwardRef((props, ref) => {
  const state = useDataGridCell_unstable(props, ref);

  useDataGridCellStyles_unstable(state);

  const { useDataGridCellStyles_unstable: useCustomStyles } = useCustomStyleHooks_unstable();
  useCustomStyles(state);

  return renderDataGridCell_unstable(state);
});

DataGridCell.displayName = 'DataGridCell';
