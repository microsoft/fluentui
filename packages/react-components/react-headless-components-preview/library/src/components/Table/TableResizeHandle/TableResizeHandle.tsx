'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableResizeHandleProps } from './TableResizeHandle.types';
import { useTableResizeHandle } from './useTableResizeHandle';
import { renderTableResizeHandle } from './renderTableResizeHandle';

export const TableResizeHandle: ForwardRefComponent<TableResizeHandleProps> = React.forwardRef((props, ref) => {
  return renderTableResizeHandle(useTableResizeHandle(props, ref));
});
TableResizeHandle.displayName = 'TableResizeHandle';
