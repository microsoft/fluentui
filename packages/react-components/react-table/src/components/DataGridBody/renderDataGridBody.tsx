/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { DataGridBodyState, DataGridBodySlots } from './DataGridBody.types';
import { TableRowIdContextProvider } from '../../contexts/rowIdContext';

/**
 * Render the final JSX of DataGridBody
 */
export const renderDataGridBody_unstable = (state: DataGridBodyState) => {
  assertSlots<DataGridBodySlots>(state);

  return (
    <state.root>
      {state.rows.map(row => (
        <TableRowIdContextProvider key={row.rowId} value={row.rowId}>
          {state.renderRow(row)}
        </TableRowIdContextProvider>
      ))}
    </state.root>
  );
};
