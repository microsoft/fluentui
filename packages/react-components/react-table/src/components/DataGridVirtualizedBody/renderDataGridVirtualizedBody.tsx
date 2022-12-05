import * as React from 'react';
import type { DataGridVirtualizedBodyState } from './DataGridVirtualizedBody.types';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { getSlots } from '@fluentui/react-utilities';
import { DataGridBodySlots } from '../DataGridBody/DataGridBody.types';
import { RowState } from '../../hooks';
import { RowIdContextProvider } from '../../contexts/rowIdContext';

/**P
 * Render the final JSX of DataGridVirtualizedBody
 */
export const renderDataGridVirtualizedBody_unstable = (state: DataGridVirtualizedBodyState) => {
  const { slots, slotProps } = getSlots<DataGridBodySlots>(state);

  return (
    <slots.root {...slotProps.root}>
      <List
        itemSize={state.itemSize}
        width="100%"
        itemData={state.rows}
        height={state.height}
        itemCount={state.rows.length}
      >
        {({ data, index, style }: ListChildComponentProps) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const row: RowState<any> = data[index];
          return <RowIdContextProvider value={row.rowId}>{state.childrenFn(row, style)}</RowIdContextProvider>;
        }}
      </List>
    </slots.root>
  );
};
