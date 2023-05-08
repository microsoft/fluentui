/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { DataGridBodyState, DataGridBodySlots } from './DataGridBody.types';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { TableRowData, TableRowIdContextProvider } from '@fluentui/react-table';
import { TableRowIndexContextProvider } from '../../contexts/rowIndexContext';

/**
 * Render the final JSX of DataGridVirtualizedBody
 */
export const renderDataGridBody_unstable = (state: DataGridBodyState) => {
  const { slots, slotProps } = getSlotsNext<DataGridBodySlots>(state);

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
          const row: TableRowData<unknown> = data[index];
          return (
            <TableRowIndexContextProvider value={state.ariaRowIndexStart + index}>
              <TableRowIdContextProvider value={row.rowId}>{state.renderRow(row, style)}</TableRowIdContextProvider>
            </TableRowIndexContextProvider>
          );
        }}
      </List>
    </slots.root>
  );
};
