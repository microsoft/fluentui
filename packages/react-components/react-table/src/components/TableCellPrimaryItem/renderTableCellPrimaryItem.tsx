import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableCellPrimaryItemState, TableCellPrimaryItemSlots } from './TableCellPrimaryItem.types';

/**
 * Render the final JSX of TableCellPrimaryItem
 */
export const renderTableCellPrimaryItem_unstable = (state: TableCellPrimaryItemState) => {
  const { slots, slotProps } = getSlots<TableCellPrimaryItemSlots>(state);

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
