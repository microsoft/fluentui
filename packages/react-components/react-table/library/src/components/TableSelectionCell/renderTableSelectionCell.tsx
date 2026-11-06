/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type {
  TableSelectionCellBaseSlots,
  TableSelectionCellBaseState,
  TableSelectionCellSlots,
  TableSelectionCellState,
} from './TableSelectionCell.types';

/**
 * Render the final JSX of TableSelectionCell
 */
export const renderTableSelectionCell_unstable = (
  state: TableSelectionCellState | TableSelectionCellBaseState,
): JSXElement => {
  assertSlots<TableSelectionCellSlots | TableSelectionCellBaseSlots>(state);

  return (
    <state.root>
      {state.type === 'checkbox' && state.checkboxIndicator && <state.checkboxIndicator />}

      {state.type === 'radio' && state.radioIndicator && <state.radioIndicator />}
    </state.root>
  );
};
