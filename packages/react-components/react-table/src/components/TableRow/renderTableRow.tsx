import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableRowState, TableRowSlots } from './TableRow.types';
import { TableRowSubtleContextProvider } from '../../contexts/tableRowSubtleContext';

/**
 * Render the final JSX of TableRow
 */
export const renderTableRow_unstable = (state: TableRowState) => {
  const { slots, slotProps } = getSlots<TableRowSlots>(state);

  return (
    <TableRowSubtleContextProvider value={state.renderSubtle}>
      <slots.root {...slotProps.root} />
    </TableRowSubtleContextProvider>
  );
};
