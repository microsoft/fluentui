import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DataGridRowState, DataGridRowSlots } from './DataGridRow.types';

/**
 * Render the final JSX of DataGridRow
 */
export const renderDataGridRow_unstable = (state: DataGridRowState) => {
  const { slots, slotProps } = getSlots<DataGridRowSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.selectionCell && <slots.selectionCell {...slotProps.selectionCell} />}
      {slotProps.root.children}
    </slots.root>
  );
};
