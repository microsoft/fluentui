import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableCellItemState, TableCellItemSlots } from './TableCellItem.types';

/**
 * Render the final JSX of TableCellItem
 */
export const renderTableCellItem_unstable = (state: TableCellItemState) => {
  const { slots, slotProps } = getSlots<TableCellItemSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.media && <slots.media {...slotProps.media} />} {slotProps.root.children}
    </slots.root>
  );
};
