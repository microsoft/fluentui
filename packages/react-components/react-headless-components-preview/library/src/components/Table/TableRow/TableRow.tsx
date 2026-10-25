'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableRowProps } from './TableRow.types';
import { useTableRow } from './useTableRow';
import { renderTableRow } from './renderTableRow';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A row of a table.
 */
export const TableRow: ForwardRefComponent<TableRowProps> = /*#__PURE__*/ composeComponent(
  'TableRow',
  useTableRow,
  renderTableRow,
);
