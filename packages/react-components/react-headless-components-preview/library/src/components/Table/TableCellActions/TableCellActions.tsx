'use client';
import * as React from 'react';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import type { TableCellActionsProps } from './TableCellActions.types';
import { useTableCellActions } from './useTableCellActions';
import { renderTableCellActions } from './renderTableCellActions';

export const TableCellActions: ForwardRefComponent<TableCellActionsProps> = React.forwardRef((props, ref) => {
  return renderTableCellActions(useTableCellActions(props, ref));
});
TableCellActions.displayName = 'TableCellActions';
