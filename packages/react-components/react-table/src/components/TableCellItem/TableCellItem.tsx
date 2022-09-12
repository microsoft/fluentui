import * as React from 'react';
import { useTableCellItem_unstable } from './useTableCellItem';
import { renderTableCellItem_unstable } from './renderTableCellItem';
import { useTableCellItemStyles_unstable } from './useTableCellItemStyles';
import type { TableCellItemProps } from './TableCellItem.types';
import type { ForwardRefComponent } from '@fluentui/react-utilities';

/**
 * TableCellItem component - TODO: add more docs
 */
export const TableCellItem: ForwardRefComponent<TableCellItemProps> = React.forwardRef((props, ref) => {
  const state = useTableCellItem_unstable(props, ref);

  useTableCellItemStyles_unstable(state);
  return renderTableCellItem_unstable(state);
});

TableCellItem.displayName = 'TableCellItem';
