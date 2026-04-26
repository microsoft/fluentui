'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridCellProps } from './DataGridCell.types';
import { useDataGridCell } from './useDataGridCell';
import { renderDataGridCell } from './renderDataGridCell';

export const DataGridCell: ForwardRefComponent<DataGridCellProps> = React.forwardRef((props, ref) => {
  return renderDataGridCell(useDataGridCell(props, ref));
});
DataGridCell.displayName = 'DataGridCell';
