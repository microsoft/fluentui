import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableCellPrimaryLayoutState, TableCellPrimaryLayoutSlots } from './TableCellPrimaryLayout.types';

/**
 * Render the final JSX of TableCellPrimaryLayout
 */
export const renderTableCellPrimaryLayout_unstable = (state: TableCellPrimaryLayoutState) => {
  const { slots, slotProps } = getSlots<TableCellPrimaryLayoutSlots>(state);

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
