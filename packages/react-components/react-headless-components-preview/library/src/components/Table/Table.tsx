'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableProps } from './Table.types';
import { useTable, useTableContextValues } from './useTable';
import { renderTable } from './renderTable';
import { composeComponent } from '../../utils/composeComponent';

/**
 * A table component that renders semantic table elements, or divs with ARIA table roles when `noNativeElements` is set.
 */
export const Table: ForwardRefComponent<TableProps> = /*#__PURE__*/ composeComponent(
  'Table',
  useTable,
  renderTable,
  useTableContextValues,
);
