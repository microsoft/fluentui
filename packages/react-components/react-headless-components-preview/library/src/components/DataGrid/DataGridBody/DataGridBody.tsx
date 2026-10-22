'use client';

import type { ForwardRefComponent, JSXElement } from '@fluentui/react-utilities';
import type { DataGridBodyProps } from './DataGridBody.types';
import { useDataGridBody } from './useDataGridBody';
import { renderDataGridBody } from './renderDataGridBody';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Renders a row for each item of the DataGrid, sorted when the grid is sortable.
 * The `children` render function receives the row data.
 */
export const DataGridBody: ForwardRefComponent<DataGridBodyProps> &
  (<TItem>(props: DataGridBodyProps<TItem>) => JSXElement) = /*#__PURE__*/ composeComponent(
  'DataGridBody',
  useDataGridBody,
  renderDataGridBody,
) as ForwardRefComponent<DataGridBodyProps> & (<TItem>(props: DataGridBodyProps<TItem>) => JSXElement);
