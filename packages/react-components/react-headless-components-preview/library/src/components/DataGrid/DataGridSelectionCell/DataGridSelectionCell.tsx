'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridSelectionCellProps } from './DataGridSelectionCell.types';
import { useDataGridSelectionCell } from './useDataGridSelectionCell';
import { renderDataGridSelectionCell } from './renderDataGridSelectionCell';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * The cell with the selection indicator of a DataGrid row. In the header it toggles the selection of all rows.
 */
export const DataGridSelectionCell: ForwardRefComponent<DataGridSelectionCellProps> = /*#__PURE__*/ composeComponent(
  'DataGridSelectionCell',
  useDataGridSelectionCell,
  renderDataGridSelectionCell,
);
