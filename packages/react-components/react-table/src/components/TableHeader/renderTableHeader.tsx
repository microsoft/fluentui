/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import { TableHeaderContextProvider } from '../../contexts/tableHeaderContext';
import type { TableHeaderState, TableHeaderSlots } from './TableHeader.types';

/**
 * Render the final JSX of TableHeader
 */
export const renderTableHeader_unstable = (state: TableHeaderState) => {
  assertSlots<TableHeaderSlots>(state);

  return (
    <TableHeaderContextProvider value="">
      <state.root />
    </TableHeaderContextProvider>
  );
};
