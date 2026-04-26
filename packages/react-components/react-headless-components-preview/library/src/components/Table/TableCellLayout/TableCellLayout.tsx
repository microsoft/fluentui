'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableCellLayoutProps } from './TableCellLayout.types';
import { useTableCellLayout, useTableCellLayoutContextValues } from './useTableCellLayout';
import { renderTableCellLayout } from './renderTableCellLayout';

export const TableCellLayout: ForwardRefComponent<TableCellLayoutProps> = React.forwardRef((props, ref) => {
  const state = useTableCellLayout(props, ref);
  const ctx = useTableCellLayoutContextValues(state);
  return renderTableCellLayout(state, ctx);
});
TableCellLayout.displayName = 'TableCellLayout';
