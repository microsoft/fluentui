import * as React from 'react';
import { useTableCellLayout_unstable } from './useTableCellLayout';
import { renderTableCellLayout_unstable } from './renderTableCellLayout';
import { useTableCellLayoutStyles_unstable } from './useTableCellLayoutStyles';
import type { TableCellLayoutProps } from './TableCellLayout.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TableCellLayout component - TODO: add more docs
 */
export const TableCellLayout: ForwardRefComponent<TableCellLayoutProps> = React.forwardRef((props, ref) => {
  const state = useTableCellLayout_unstable(props, ref);

  useTableCellLayoutStyles_unstable(state);
  return renderTableCellLayout_unstable(state);
});

TableCellLayout.displayName = 'TableCellLayout';
