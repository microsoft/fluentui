'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableCellActionsProps } from './TableCellActions.types';
import { useTableCellActions } from './useTableCellActions';
import { renderTableCellActions } from './renderTableCellActions';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Container for the actions of a table cell.
 */
export const TableCellActions: ForwardRefComponent<TableCellActionsProps> = /*#__PURE__*/ composeComponent(
  'TableCellActions',
  useTableCellActions,
  renderTableCellActions,
);
