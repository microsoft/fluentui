/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { DataGridBodyState, DataGridBodySlots } from './DataGridBody.types';
import { TableRowIdContextProvider } from '../../contexts/rowIdContext';

/**
 * Render the final JSX of DataGridBody
 */
export const renderDataGridBody_unstable = (state: DataGridBodyState) => {
  const { slots, slotProps } = getSlotsNext<DataGridBodySlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {state.rows.map(row => (
        <TableRowIdContextProvider key={row.rowId} value={row.rowId}>
          {state.renderRow(row)}
        </TableRowIdContextProvider>
      ))}
    </slots.root>
  );
};
