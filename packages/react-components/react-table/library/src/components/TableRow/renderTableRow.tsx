/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { TableRowState, TableRowSlots } from './TableRow.types';

/**
 * Render the final JSX of TableRow
 */
export const renderTableRow_unstable = (state: TableRowState) => {
  assertSlots<TableRowSlots>(state);

  return <state.root />;
};
