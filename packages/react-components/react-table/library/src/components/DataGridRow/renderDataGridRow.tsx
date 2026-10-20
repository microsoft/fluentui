/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */
import { assertSlots } from '@fluentui/react-utilities';
import type { JSXElement } from '@fluentui/react-utilities';
import type { DataGridRowBaseState, DataGridRowSlots, DataGridRowState } from './DataGridRow.types';
import type { DataGridContextValue } from '../DataGrid/DataGrid.types';
import { ColumnIdContextProvider } from '../../contexts/columnIdContext';

/**
 * Render the final JSX of DataGridRow
 *
 * The selection cell is rendered when the state has one. The base state does not, its caller adds it.
 */
export const renderDataGridRow_unstable = (baseState: DataGridRowState | DataGridRowBaseState): JSXElement => {
  // The base state has no `selectionCell`, which the slots assertion treats as an optional slot
  const state = baseState as DataGridRowState;
  assertSlots<DataGridRowSlots>(state);

  return (
    <state.root>
      {state.selectionCell && <state.selectionCell />}
      {state.columnDefs.map(columnDef => (
        <ColumnIdContextProvider value={columnDef.columnId} key={columnDef.columnId}>
          {state.renderCell(columnDef, state.dataGridContextValue as DataGridContextValue)}
        </ColumnIdContextProvider>
      ))}
    </state.root>
  );
};
