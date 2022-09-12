import * as React from 'react';
import { useTableCellPrimaryItem_unstable } from './useTableCellPrimaryItem';
import { renderTableCellPrimaryItem_unstable } from './renderTableCellPrimaryItem';
import { useTableCellPrimaryItemStyles_unstable } from './useTableCellPrimaryItemStyles';
import type { TableCellPrimaryItemProps } from './TableCellPrimaryItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TableCellPrimaryItem component - TODO: add more docs
 */
export const TableCellPrimaryItem: ForwardRefComponent<TableCellPrimaryItemProps> = React.forwardRef((props, ref) => {
  const state = useTableCellPrimaryItem_unstable(props, ref);

  useTableCellPrimaryItemStyles_unstable(state);
  return renderTableCellPrimaryItem_unstable(state);
});

TableCellPrimaryItem.displayName = 'TableCellPrimaryItem';
