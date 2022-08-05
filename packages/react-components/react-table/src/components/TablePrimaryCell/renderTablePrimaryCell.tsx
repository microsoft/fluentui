import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TablePrimaryCellState, TablePrimaryCellSlots } from './TablePrimaryCell.types';

/**
 * Render the final JSX of TablePrimaryCell
 */
export const renderTablePrimaryCell_unstable = (state: TablePrimaryCellState) => {
  const { slots, slotProps } = getSlots<TablePrimaryCellSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.media && <slots.media {...slotProps.media} />}
      {slots.wrapper && (
        <slots.wrapper {...slotProps.wrapper}>
          {slots.main && <slots.main {...slotProps.main} />}
          {slots.secondary && <slots.secondary {...slotProps.secondary} />}
        </slots.wrapper>
      )}
      {slotProps.root.children}
    </slots.root>
  );
};
