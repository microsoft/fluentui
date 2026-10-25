'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridHeaderCellProps } from './DataGridHeaderCell.types';
import { useDataGridHeaderCell } from './useDataGridHeaderCell';
import { renderDataGridHeaderCell } from './renderDataGridHeaderCell';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A header cell of a DataGrid. When the column is sortable, the cell content is a button that toggles the sort.
 */
export const DataGridHeaderCell: ForwardRefComponent<DataGridHeaderCellProps> = /*#__PURE__*/ composeComponent(
  'DataGridHeaderCell',
  useDataGridHeaderCell,
  renderDataGridHeaderCell,
);
