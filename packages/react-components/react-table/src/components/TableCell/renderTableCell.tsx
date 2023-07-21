/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TableCellState, TableCellSlots } from './TableCell.types';

/**
 * Render the final JSX of TableCell
 */
export const renderTableCell_unstable = (state: TableCellState) => {
  const { slots, slotProps } = getSlotsNext<TableCellSlots>(state);

  return <slots.root {...slotProps.root} />;
};
