import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableState, TableSlots, TableContextValues } from './Table.types';
import { TableContextProvider } from '../../contexts/tableContext';

/**
 * Render the final JSX of Table
 */
export const renderTable_unstable = (state: TableState, contextValues: TableContextValues) => {
  const { slots, slotProps } = getSlots<TableSlots>(state);

  return (
    <TableContextProvider value={contextValues.table}>
      <slots.root {...slotProps.root} />
    </TableContextProvider>
  );
};
