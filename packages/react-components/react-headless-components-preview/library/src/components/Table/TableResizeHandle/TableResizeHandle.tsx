'use client';

import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableResizeHandleProps } from './TableResizeHandle.types';
import { useTableResizeHandle } from './useTableResizeHandle';
import { renderTableResizeHandle } from './renderTableResizeHandle';
import { composeComponent } from '../../../utils/composeComponent';

/**
 * The handle used to resize a column.
 */
export const TableResizeHandle: ForwardRefComponent<TableResizeHandleProps> = /*#__PURE__*/ composeComponent(
  'TableResizeHandle',
  useTableResizeHandle,
  renderTableResizeHandle,
);
