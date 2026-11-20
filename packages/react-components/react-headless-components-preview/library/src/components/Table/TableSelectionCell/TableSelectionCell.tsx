'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableSelectionCellProps } from './TableSelectionCell.types';
import { useTableSelectionCell } from './useTableSelectionCell';
import { renderTableSelectionCell } from './renderTableSelectionCell';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A cell with a native checkbox or radio that reflects the selection of a row. Give the indicator an accessible name with `checkboxIndicator` or `radioIndicator`.
 */
export const TableSelectionCell: ForwardRefComponent<TableSelectionCellProps> = /*#__PURE__*/ composeComponent(
  'TableSelectionCell',
  useTableSelectionCell,
  renderTableSelectionCell,
);
