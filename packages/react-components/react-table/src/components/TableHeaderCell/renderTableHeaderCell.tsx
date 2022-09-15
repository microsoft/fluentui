import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableHeaderCellState, TableHeaderCellSlots } from './TableHeaderCell.types';

/**
 * Render the final JSX of TableHeaderCell
 */
export const renderTableHeaderCell_unstable = (state: TableHeaderCellState) => {
  const { slots, slotProps } = getSlots<TableHeaderCellSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <slots.button {...slotProps.button}>
        {slotProps.root.children}
        {slots.sortIcon && <slots.sortIcon {...slotProps.sortIcon} />}
      </slots.button>
    </slots.root>
  );
};
