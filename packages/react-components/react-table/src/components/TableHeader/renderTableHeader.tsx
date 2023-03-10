import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { TableHeaderContextProvider } from '../../contexts/tableHeaderContext';
import type { TableHeaderState, TableHeaderSlots } from './TableHeader.types';

/**
 * Render the final JSX of TableHeader
 */
export const renderTableHeader_unstable = (state: TableHeaderState) => {
  const { slots, slotProps } = getSlots<TableHeaderSlots>(state);

  return (
    <TableHeaderContextProvider value="">
      <slots.root {...slotProps.root} />
    </TableHeaderContextProvider>
  );
};
