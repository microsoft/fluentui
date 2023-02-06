import * as React from 'react';
import { useTableRow_unstable } from './useTableRow';
import { renderTableRow_unstable } from './renderTableRow';
import { useTableRowStyles_unstable } from './useTableRowStyles';
import type { TableRowProps } from './TableRow.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TableRow component
 */
export const TableRow: ForwardRefComponent<TableRowProps> = React.forwardRef((props, ref) => {
  const state = useTableRow_unstable(props, ref);

  useTableRowStyles_unstable(state);
  return renderTableRow_unstable(state);
});

TableRow.displayName = 'TableRow';
