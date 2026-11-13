'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridCellProps } from './DataGridCell.types';
import { useDataGridCell } from './useDataGridCell';
import { renderDataGridCell } from './renderDataGridCell';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A cell of a DataGrid row.
 */
export const DataGridCell: ForwardRefComponent<DataGridCellProps> = /*#__PURE__*/ composeComponent(
  'DataGridCell',
  useDataGridCell,
  renderDataGridCell,
);
