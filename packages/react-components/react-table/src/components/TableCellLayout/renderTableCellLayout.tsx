import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableCellLayoutState, TableCellLayoutSlots } from './TableCellLayout.types';

/**
 * Render the final JSX of TableCellLayout
 */
export const renderTableCellLayout_unstable = (state: TableCellLayoutState) => {
  const { slots, slotProps } = getSlots<TableCellLayoutSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.media && <slots.media {...slotProps.media} />}
      {slots.wrapper && (
        <slots.wrapper {...slotProps.wrapper}>
          {slots.main && <slots.main {...slotProps.main}>{slotProps.root.children}</slots.main>}
          {slots.description && <slots.description {...slotProps.description} />}
        </slots.wrapper>
      )}
    </slots.root>
  );
};
