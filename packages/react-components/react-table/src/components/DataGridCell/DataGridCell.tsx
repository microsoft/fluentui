import * as React from 'react';
import { useDataGridCell_unstable } from './useDataGridCell';
import { renderDataGridCell_unstable } from './renderDataGridCell';
import { useDataGridCellStyles_unstable } from './useDataGridCellStyles.styles';
import type { DataGridCellProps } from './DataGridCell.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';

/**
 * DataGridCell component
 */
export const DataGridCell: ForwardRefComponent<DataGridCellProps> = React.forwardRef((props, ref) => {
  const state = useDataGridCell_unstable(props, ref);

  useDataGridCellStyles_unstable(state);

  useCustomStyleHook_unstable('useDataGridCellStyles_unstable')(state);

  return renderDataGridCell_unstable(state);
});

DataGridCell.displayName = 'DataGridCell';
