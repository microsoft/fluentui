/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { TableCellActionsState, TableCellActionsSlots } from './TableCellActions.types';

/**
 * Render the final JSX of TableCellActions
 */
export const renderTableCellActions_unstable = (state: TableCellActionsState) => {
  assertSlots<TableCellActionsSlots>(state);

  return <state.root />;
};
