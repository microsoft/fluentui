import * as React from 'react';
import { useTable_unstable } from './useTable';
import { renderTable_unstable } from './renderTable';
import { useTableStyles_unstable } from './useTableStyles';
import type { TableProps } from './Table.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { useTableContextValues_unstable } from './useTableContextValues';

/**
 * Table component
 */
export const Table: ForwardRefComponent<TableProps> = React.forwardRef((props, ref) => {
  const state = useTable_unstable(props, ref);

  useTableStyles_unstable(state);
  return renderTable_unstable(state, useTableContextValues_unstable(state));
});

Table.displayName = 'Table';
