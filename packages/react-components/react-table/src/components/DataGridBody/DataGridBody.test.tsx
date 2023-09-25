import * as React from 'react';
import { render } from '@testing-library/react';
import { DataGridBody } from './DataGridBody';
import { isConformant } from '../../testing/isConformant';
import { DataGridBodyProps } from './DataGridBody.types';
import { mockDataGridContext } from '../../testing/mockDataGridContext';
import { TableContextProvider } from '../../contexts/tableContext';
import { DataGridContextProvider } from '../../contexts/dataGridContext';
import { useTableRowIdContext } from '../../contexts/rowIdContext';
import { TableFeaturesState, TableRowData } from '../../hooks/types';

describe('DataGridBody', () => {
  isConformant<DataGridBodyProps>({
    Component: DataGridBody,
    displayName: 'DataGridBody',
  });

  it('renders items from render function', () => {
    const result = render(<DataGridBody>{() => 'foo'}</DataGridBody>);
    expect(result.container).toMatchSnapshot();
  });

  it('should sort rows if DataGrid is sortable', () => {
    const sort = jest.fn().mockReturnValue([]);
    const dataGridCtx = mockDataGridContext({}, { sort: { sort } });
    render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: true }}>
        <DataGridContextProvider value={dataGridCtx}>
          <DataGridBody>{() => ''}</DataGridBody>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    expect(sort).toHaveBeenCalledTimes(1);
  });

  it('should not sort rows if DataGrid is not sortable', () => {
    const sort = jest.fn().mockReturnValue([]);
    const dataGridCtx = mockDataGridContext({}, { sort: { sort } });
    render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: false }}>
        <DataGridContextProvider value={dataGridCtx}>
          <DataGridBody>{() => ''}</DataGridBody>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    expect(sort).toHaveBeenCalledTimes(0);
  });

  it('renders row id context around each cell', () => {
    const testRows = [
      { rowId: 1, item: {} },
      { rowId: 2, item: {} },
      { rowId: 3, item: {} },
    ];

    const getRows: TableFeaturesState<unknown>['getRows'] = <TRowState extends TableRowData<unknown>>() =>
      testRows as unknown as TRowState[];
    const ctx = mockDataGridContext({ getRows });
    const TestComponent = () => {
      const rowId = useTableRowIdContext();
      return <span role="status">{rowId}</span>;
    };
    const { getAllByRole } = render(
      <DataGridContextProvider value={ctx}>
        <DataGridBody>{() => <TestComponent />}</DataGridBody>
      </DataGridContextProvider>,
    );

    const columnIds = getAllByRole('status').map(el => el.textContent);
    expect(columnIds).toMatchInlineSnapshot(`
      Array [
        "1",
        "2",
        "3",
      ]
    `);
  });
});
