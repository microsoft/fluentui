/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TableCellBaseState, TableCellSlots } from './TableCell.types';

/**
 * Render the final JSX of TableCell
 */
export const renderTableCell_unstable = (state: TableCellBaseState): JSXElement => {
  assertSlots<TableCellSlots>(state);

  return <state.root />;
};
