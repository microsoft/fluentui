/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import { TableHeaderContextProvider } from '../../contexts/tableHeaderContext';
import type { TableHeaderState, TableHeaderSlots } from './TableHeader.types';

/**
 * Render the final JSX of TableHeader
 */
export const renderTableHeader_unstable = (state: TableHeaderState) => {
  const { slots, slotProps } = getSlotsNext<TableHeaderSlots>(state);

  return (
    <TableHeaderContextProvider value="">
      <slots.root {...slotProps.root} />
    </TableHeaderContextProvider>
  );
};
