import * as React from 'react';
import { useTableCellActions_unstable } from './useTableCellActions';
import { renderTableCellActions_unstable } from './renderTableCellActions';
import { useTableCellActionsStyles_unstable } from './useTableCellActionsStyles';
import type { TableCellActionsProps } from './TableCellActions.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TableCellActions component - TODO: add more docs
 */
export const TableCellActions: ForwardRefComponent<TableCellActionsProps> = React.forwardRef((props, ref) => {
  const state = useTableCellActions_unstable(props, ref);

  useTableCellActionsStyles_unstable(state);
  return renderTableCellActions_unstable(state);
});

TableCellActions.displayName = 'TableCellActions';
