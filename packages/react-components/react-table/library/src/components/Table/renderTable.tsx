/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { TableBaseState, TableSlots, TableContextValues } from './Table.types';
import { TableContextProvider } from '../../contexts/tableContext';

/**
 * Render the final JSX of Table
 */
export const renderTable_unstable = (state: TableBaseState, contextValues: TableContextValues): JSXElement => {
  assertSlots<TableSlots>(state);

  return (
    <TableContextProvider value={contextValues.table}>
      <state.root />
    </TableContextProvider>
  );
};
