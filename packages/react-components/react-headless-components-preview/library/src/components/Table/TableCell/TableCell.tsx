'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableCellProps } from './TableCell.types';
import { useTableCell } from './useTableCell';
import { renderTableCell } from './renderTableCell';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A cell of a table row.
 */
export const TableCell: ForwardRefComponent<TableCellProps> = /*#__PURE__*/ composeComponent(
  'TableCell',
  useTableCell,
  renderTableCell,
);
