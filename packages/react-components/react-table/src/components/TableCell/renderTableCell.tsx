import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableCellState, TableCellSlots } from './TableCell.types';

/**
 * Render the final JSX of TableCell
 */
export const renderTableCell_unstable = (state: TableCellState) => {
  const { slots, slotProps } = getSlots<TableCellSlots>(state);

  // TODO Add additional slots in the appropriate place
  return (
    <slots.root {...slotProps.root}>
      {slots.media && <slots.media {...slotProps.media} />} {slotProps.root.children}
    </slots.root>
  );
};
