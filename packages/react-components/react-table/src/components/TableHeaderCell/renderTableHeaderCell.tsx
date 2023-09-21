/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { TableHeaderCellState, TableHeaderCellSlots } from './TableHeaderCell.types';

/**
 * Render the final JSX of TableHeaderCell
 */
export const renderTableHeaderCell_unstable = (state: TableHeaderCellState) => {
  assertSlots<TableHeaderCellSlots>(state);

  return (
    <state.root>
      <state.button>
        {state.root.children}
        {state.sortIcon && <state.sortIcon />}
      </state.button>
      {state.aside && <state.aside />}
    </state.root>
  );
};
