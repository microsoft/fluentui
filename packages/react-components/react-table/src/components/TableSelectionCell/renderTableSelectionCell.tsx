/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { TableSelectionCellState, TableSelectionCellSlots } from './TableSelectionCell.types';

/**
 * Render the final JSX of TableSelectionCell
 */
export const renderTableSelectionCell_unstable = (state: TableSelectionCellState) => {
  assertSlots<TableSelectionCellSlots>(state);

  return (
    <state.root>
      {state.type === 'checkbox' && state.checkboxIndicator && <state.checkboxIndicator />}

      {state.type === 'radio' && state.radioIndicator && <state.radioIndicator />}
    </state.root>
  );
};
