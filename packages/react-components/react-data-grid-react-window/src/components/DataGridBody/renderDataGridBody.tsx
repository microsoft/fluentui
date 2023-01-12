import * as React from 'react';
import type { DataGridBodyState, DataGridBodySlots } from './DataGridBody.types';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { getSlots } from '@fluentui/react-components';
import { RowState, RowIdContextProvider } from '@fluentui/react-components/unstable';

/**
 * Render the final JSX of DataGridVirtualizedBody
 */
export const renderDataGridBody_unstable = (state: DataGridBodyState) => {
  const { slots, slotProps } = getSlots<DataGridBodySlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <List
        itemSize={state.itemSize}
        width={state.width}
        itemData={state.rows}
        height={state.height}
        itemCount={state.rows.length}
      >
        {({ data, index, style }: ListChildComponentProps) => {
          const row: RowState<unknown> = data[index];
          return <RowIdContextProvider value={row.rowId}>{state.renderRow(row, style)}</RowIdContextProvider>;
        }}
      </List>
    </slots.root>
  );
};
