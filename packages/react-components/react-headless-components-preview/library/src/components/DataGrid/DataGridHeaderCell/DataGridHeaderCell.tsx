'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridHeaderCellProps } from './DataGridHeaderCell.types';
import { useDataGridHeaderCell } from './useDataGridHeaderCell';
import { renderDataGridHeaderCell } from './renderDataGridHeaderCell';

export const DataGridHeaderCell: ForwardRefComponent<DataGridHeaderCellProps> = React.forwardRef((props, ref) => {
  return renderDataGridHeaderCell(useDataGridHeaderCell(props, ref));
});
DataGridHeaderCell.displayName = 'DataGridHeaderCell';
