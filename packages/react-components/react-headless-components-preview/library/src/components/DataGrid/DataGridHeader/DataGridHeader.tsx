'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { DataGridHeaderProps } from './DataGridHeader.types';
import { useDataGridHeader } from './useDataGridHeader';
import { renderDataGridHeader } from './renderDataGridHeader';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Groups the header rows of a DataGrid.
 */
export const DataGridHeader: ForwardRefComponent<DataGridHeaderProps> = /*#__PURE__*/ composeComponent(
  'DataGridHeader',
  useDataGridHeader,
  renderDataGridHeader,
);
