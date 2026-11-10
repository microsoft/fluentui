/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TableCellState, TableCellSlots } from './TableCell.types';

/**
 * Render the final JSX of TableCell
 */
export const renderTableCell_unstable = (state: TableCellState): JSXElement => {
  assertSlots<TableCellSlots>(state);

  return <state.root />;
};
