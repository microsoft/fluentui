import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableRowState, TableRowSlots } from './TableRow.types';

/**
 * Render the final JSX of TableRow
 */
export const renderTableRow_unstable = (state: TableRowState) => {
  const { slots, slotProps } = getSlots<TableRowSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
