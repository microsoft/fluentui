/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TableRowState, TableRowSlots } from './TableRow.types';

/**
 * Render the final JSX of TableRow
 */
export const renderTableRow_unstable = (state: TableRowState) => {
  const { slots, slotProps } = getSlotsNext<TableRowSlots>(state);

  return <slots.root {...slotProps.root} />;
};
