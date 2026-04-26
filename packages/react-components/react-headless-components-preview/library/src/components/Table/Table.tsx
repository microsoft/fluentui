'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableProps } from './Table.types';
import { useTable, useTableContextValues } from './useTable';
import { renderTable } from './renderTable';

export const Table: ForwardRefComponent<TableProps> = React.forwardRef((props, ref) => {
  const state = useTable(props, ref);
  const contextValues = useTableContextValues(state);
  return renderTable(state, contextValues);
});
Table.displayName = 'Table';
