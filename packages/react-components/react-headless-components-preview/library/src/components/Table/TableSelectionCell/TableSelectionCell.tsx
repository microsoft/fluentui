'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableSelectionCellProps } from './TableSelectionCell.types';
import { useTableSelectionCell } from './useTableSelectionCell';
import { renderTableSelectionCell } from './renderTableSelectionCell';

export const TableSelectionCell: ForwardRefComponent<TableSelectionCellProps> = React.forwardRef((props, ref) => {
  return renderTableSelectionCell(useTableSelectionCell(props, ref));
});
TableSelectionCell.displayName = 'TableSelectionCell';
