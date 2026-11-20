'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableCellLayoutProps } from './TableCellLayout.types';
import { useTableCellLayout } from './useTableCellLayout';
import { renderTableCellLayout } from './renderTableCellLayout';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Lays out the media, main content and description of a table cell.
 */
export const TableCellLayout: ForwardRefComponent<TableCellLayoutProps> = /*#__PURE__*/ composeComponent(
  'TableCellLayout',
  useTableCellLayout,
  renderTableCellLayout,
);
