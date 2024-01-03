/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { DataGridRowState, DataGridRowSlots } from './DataGridRow.types';
import { ColumnIdContextProvider } from '../../contexts/columnIdContext';

/**
 * Render the final JSX of DataGridRow
 */
export const renderDataGridRow_unstable = (state: DataGridRowState) => {
  assertSlots<DataGridRowSlots>(state);

  return (
    <state.root>
      {state.selectionCell && <state.selectionCell />}
      {state.columnDefs.map(columnDef => (
        <ColumnIdContextProvider value={columnDef.columnId} key={columnDef.columnId}>
          {state.renderCell(columnDef, state.dataGridContextValue)}
        </ColumnIdContextProvider>
      ))}
    </state.root>
  );
};
