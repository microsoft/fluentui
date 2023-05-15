/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { DataGridRowState, DataGridRowSlots } from './DataGridRow.types';
import { ColumnIdContextProvider } from '../../contexts/columnIdContext';

/**
 * Render the final JSX of DataGridRow
 */
export const renderDataGridRow_unstable = (state: DataGridRowState) => {
  const { slots, slotProps } = getSlotsNext<DataGridRowSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.selectionCell && <slots.selectionCell {...slotProps.selectionCell} />}
      {state.columnDefs.map(columnDef => (
        <ColumnIdContextProvider value={columnDef.columnId} key={columnDef.columnId}>
          {state.renderCell(columnDef, state.dataGridContextValue)}
        </ColumnIdContextProvider>
      ))}
    </slots.root>
  );
};
