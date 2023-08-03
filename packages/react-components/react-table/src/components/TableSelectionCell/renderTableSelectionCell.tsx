/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { TableSelectionCellState, TableSelectionCellSlots } from './TableSelectionCell.types';

/**
 * Render the final JSX of TableSelectionCell
 */
export const renderTableSelectionCell_unstable = (state: TableSelectionCellState) => {
  const { slots, slotProps } = getSlotsNext<TableSelectionCellSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {state.type === 'checkbox' && slots.checkboxIndicator && (
        <slots.checkboxIndicator {...slotProps.checkboxIndicator} />
      )}
      {state.type === 'radio' && slots.radioIndicator && <slots.radioIndicator {...slotProps.radioIndicator} />}
    </slots.root>
  );
};
