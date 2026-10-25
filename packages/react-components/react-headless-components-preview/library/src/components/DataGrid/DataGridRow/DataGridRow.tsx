'use client';

import type { ForwardRefComponent, JSXElement } from '@fluentui/react-utilities';
import type { DataGridRowProps } from './DataGridRow.types';
import { useDataGridRow } from './useDataGridRow';
import { renderDataGridRow } from './renderDataGridRow';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * A row of a DataGrid. The `children` render function is called for each column.
 * Clicking the row, or pressing Space on it, toggles its selection when selection is enabled.
 */
export const DataGridRow: ForwardRefComponent<DataGridRowProps> &
  (<TItem>(props: DataGridRowProps<TItem>) => JSXElement) = /*#__PURE__*/ composeComponent(
  'DataGridRow',
  useDataGridRow,
  renderDataGridRow,
) as ForwardRefComponent<DataGridRowProps> & (<TItem>(props: DataGridRowProps<TItem>) => JSXElement);
