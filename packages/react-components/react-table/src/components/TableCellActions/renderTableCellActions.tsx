import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { TableCellActionsState, TableCellActionsSlots } from './TableCellActions.types';

/**
 * Render the final JSX of TableCellActions
 */
export const renderTableCellActions_unstable = (state: TableCellActionsState) => {
  const { slots, slotProps } = getSlots<TableCellActionsSlots>(state);

  return <slots.root {...slotProps.root} />;
};
