'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableCellProps } from './TableCell.types';
import { useTableCell } from './useTableCell';
import { renderTableCell } from './renderTableCell';

export const TableCell: ForwardRefComponent<TableCellProps> = React.forwardRef((props, ref) => {
  return renderTableCell(useTableCell(props, ref));
});
TableCell.displayName = 'TableCell';
