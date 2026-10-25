'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableHeaderProps } from './TableHeader.types';
import { useTableHeader } from './useTableHeader';
import { renderTableHeader } from './renderTableHeader';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Groups the header rows of a table.
 */
export const TableHeader: ForwardRefComponent<TableHeaderProps> = /*#__PURE__*/ composeComponent(
  'TableHeader',
  useTableHeader,
  renderTableHeader,
);
