import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { RadioGroupProvider } from '@fluentui/react-radio';
import type { TableSelectionCellState, TableSelectionCellSlots } from './TableSelectionCell.types';

/**
 * Render the final JSX of TableSelectionCell
 */
export const renderTableSelectionCell_unstable = (state: TableSelectionCellState) => {
  const { slots, slotProps } = getSlots<TableSelectionCellSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {state.type === 'checkbox' && slots.checkboxIndicator && (
        <slots.checkboxIndicator {...slotProps.checkboxIndicator} />
      )}
      {state.type === 'radio' && slots.radioIndicator && (
        <RadioGroupProvider value={{ value: state.checked ? state.radioValue : '' }}>
          <slots.radioIndicator {...slotProps.radioIndicator} />
        </RadioGroupProvider>
      )}
    </slots.root>
  );
};
