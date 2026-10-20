'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableBodyProps } from './TableBody.types';
import { useTableBody } from './useTableBody';
import { renderTableBody } from './renderTableBody';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * Groups the body rows of a table.
 */
export const TableBody: ForwardRefComponent<TableBodyProps> = /*#__PURE__*/ composeComponent(
  'TableBody',
  useTableBody,
  renderTableBody,
);
