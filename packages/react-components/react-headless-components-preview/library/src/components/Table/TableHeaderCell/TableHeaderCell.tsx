'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableHeaderCellProps } from './TableHeaderCell.types';
import { useTableHeaderCell } from './useTableHeaderCell';
import { renderTableHeaderCell } from './renderTableHeaderCell';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A header cell of a table. When sortable, its content is rendered inside a button that handles the sort interaction.
 */
export const TableHeaderCell: ForwardRefComponent<TableHeaderCellProps> = /*#__PURE__*/ composeComponent(
  'TableHeaderCell',
  useTableHeaderCell,
  renderTableHeaderCell,
);
