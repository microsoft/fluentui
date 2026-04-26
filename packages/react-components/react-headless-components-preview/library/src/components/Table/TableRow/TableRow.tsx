'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableRowProps } from './TableRow.types';
import { useTableRow } from './useTableRow';
import { renderTableRow } from './renderTableRow';

export const TableRow: ForwardRefComponent<TableRowProps> = React.forwardRef((props, ref) => {
  return renderTableRow(useTableRow(props, ref));
});
TableRow.displayName = 'TableRow';
