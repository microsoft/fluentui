'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableHeaderCellProps } from './TableHeaderCell.types';
import { useTableHeaderCell } from './useTableHeaderCell';
import { renderTableHeaderCell } from './renderTableHeaderCell';

export const TableHeaderCell: ForwardRefComponent<TableHeaderCellProps> = React.forwardRef((props, ref) => {
  return renderTableHeaderCell(useTableHeaderCell(props, ref));
});
TableHeaderCell.displayName = 'TableHeaderCell';
