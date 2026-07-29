import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { CLASSNAME_OVERRIDES_WIN_TEST_NAME, classNameOverridesWin } from '@fluentui/react-conformance';
import { DataGridHeaderCell } from './DataGridHeaderCell';
import { isConformant } from '../../testing/isConformant';
import type { DataGridHeaderCellProps } from './DataGridHeaderCell.types';
import { DataGridContextProvider } from '../../contexts/dataGridContext';
import { mockDataGridContext } from '../../testing/mockDataGridContext';
import { TableContextProvider } from '../../contexts/tableContext';
import { ColumnIdContextProvider } from '../../contexts/columnIdContext';
import type { DataGridContextValue } from '../DataGrid/DataGrid.types';
import type { TableSelectionState, TableSortState } from '../../hooks/types';

describe('DataGridHeaderCell', () => {
  isConformant<DataGridHeaderCellProps>({
    Component: DataGridHeaderCell,
    displayName: 'DataGridHeaderCell',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // `make-styles-overrides-win` jest-mocks `@griffel/react`'s mergeClasses and asserts
    // it was called with the consumer className last; this component now composes with
    // clsx and never calls mergeClasses, so the test can no longer observe the contract.
    // `classname-overrides-win` below is its cascade-native replacement (DECISIONS.md D9).
    disabledTests: ['make-styles-overrides-win'],
    // This component renders another component's ROOT — a DataGridHeaderCell IS a TableHeaderCell — so the
    // element legitimately carries BOTH markers (DECISIONS.md D16.3). Declaring the whole set
    // keeps `component-has-group-marker` running as an exact set comparison, and keeps its
    // `classList[0]` half — the D16.2 invariant nwsapi's jsdom `:scope` polyfill depends on —
    // asserted here.
    testOptions: {
      'has-group-marker': {
        markers: ['group/fui-table-header-cell', 'group/fui-data-grid-header-cell'],
      },
    },
    extraTests: { [CLASSNAME_OVERRIDES_WIN_TEST_NAME]: classNameOverridesWin },
  });

  const mockSortableDataGridContext = (
    options: Partial<DataGridContextValue> = {},
    substates: { sort?: Partial<TableSortState<unknown>>; selection?: Partial<TableSelectionState> } = {},
  ) => {
    const dataGridCtx = mockDataGridContext(options, substates);
    dataGridCtx.columns.forEach(col => {
      col.compare = (a, b) => 1;
    });

    return dataGridCtx;
  };

  it('renders a default state', () => {
    const result = render(<DataGridHeaderCell>Default DataGridHeaderCell</DataGridHeaderCell>);
    expect(result.container).toMatchSnapshot();
  });

  it('should get sortDirection from context when the component is sortable', () => {
    const dataGridCtx = mockSortableDataGridContext({}, { sort: { getSortDirection: () => 'descending' } });
    const { getByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: true }}>
        <DataGridContextProvider value={dataGridCtx}>
          <ColumnIdContextProvider value={dataGridCtx.columns[0].columnId}>
            <DataGridHeaderCell>Header cell</DataGridHeaderCell>
          </ColumnIdContextProvider>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    expect(getByRole('columnheader').getAttribute('aria-sort')).toEqual('descending');
  });

  it('should call sort state from context when the component is sortable', () => {
    const toggleColumnSort = jest.fn();
    const dataGridCtx = mockSortableDataGridContext({}, { sort: { toggleColumnSort } });
    const { getByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: true }}>
        <DataGridContextProvider value={dataGridCtx}>
          <ColumnIdContextProvider value={dataGridCtx.columns[0].columnId}>
            <DataGridHeaderCell>Header cell</DataGridHeaderCell>
          </ColumnIdContextProvider>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    fireEvent.click(getByRole('columnheader'));
    expect(toggleColumnSort).toHaveBeenCalledTimes(1);
  });

  it('should not call sort state from context when the grid is not sortable', () => {
    const toggleColumnSort = jest.fn();
    const dataGridCtx = mockSortableDataGridContext({}, { sort: { toggleColumnSort } });
    const { getByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: false }}>
        <DataGridContextProvider value={dataGridCtx}>
          <ColumnIdContextProvider value={dataGridCtx.columns[0].columnId}>
            <DataGridHeaderCell>Header cell</DataGridHeaderCell>
          </ColumnIdContextProvider>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    fireEvent.click(getByRole('columnheader'));
    expect(toggleColumnSort).toHaveBeenCalledTimes(0);
  });

  it('should not call sort state from context when the column has no compare', () => {
    const toggleColumnSort = jest.fn();
    const dataGridCtx = mockSortableDataGridContext({}, { sort: { toggleColumnSort } });
    const unsortableColumn = dataGridCtx.columns[0];
    unsortableColumn.compare = () => 1;

    const { getByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: true }}>
        <DataGridContextProvider value={dataGridCtx}>
          <ColumnIdContextProvider value={unsortableColumn.columnId}>
            <DataGridHeaderCell>Header cell</DataGridHeaderCell>
          </ColumnIdContextProvider>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    fireEvent.click(getByRole('columnheader'));
    expect(toggleColumnSort).toHaveBeenCalledTimes(0);
  });

  it('should set tabindex 0 on header cell if not grid is not sortable', () => {
    const dataGridCtx = mockSortableDataGridContext();
    const { getAllByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: false }}>
        <DataGridContextProvider value={dataGridCtx}>
          <ColumnIdContextProvider value={dataGridCtx.columns[0].columnId}>
            <DataGridHeaderCell>Header cell</DataGridHeaderCell>
          </ColumnIdContextProvider>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    const columnHeaders = getAllByRole('columnheader');
    columnHeaders.forEach(columnHeader => {
      expect(columnHeader.tabIndex).toBe(0);
      expect(columnHeader.getAttribute('tabindex')).toBe('0');
    });
  });

  it('should set tabindex 0 on header cell if not column has no compare', () => {
    const dataGridCtx = mockSortableDataGridContext();
    const unsortableColumn = dataGridCtx.columns[0];
    unsortableColumn.compare = () => 1;
    const { getAllByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: true }}>
        <DataGridContextProvider value={dataGridCtx}>
          <ColumnIdContextProvider value={unsortableColumn.columnId}>
            <DataGridHeaderCell>Header cell</DataGridHeaderCell>
          </ColumnIdContextProvider>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    const columnHeaders = getAllByRole('columnheader');
    columnHeaders.forEach(columnHeader => {
      expect(columnHeader.tabIndex).toBe(0);
      expect(columnHeader.getAttribute('tabindex')).toBe('0');
    });
  });

  it('should not set tabindex on header cell if sortable', () => {
    const dataGridCtx = mockSortableDataGridContext();
    const { getAllByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: true }}>
        <DataGridContextProvider value={dataGridCtx}>
          <ColumnIdContextProvider value={dataGridCtx.columns[0].columnId}>
            <DataGridHeaderCell>Header cell</DataGridHeaderCell>
          </ColumnIdContextProvider>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    const columnHeaders = getAllByRole('columnheader');
    columnHeaders.forEach(columnHeader => {
      expect(columnHeader.tabIndex).toBe(-1);
      expect(columnHeader.hasAttribute('tabindex')).toBe(false);
    });
  });

  it('should not set tabindex when focusMode is none', () => {
    const dataGridCtx = mockSortableDataGridContext();
    const { getAllByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: false }}>
        <DataGridContextProvider value={dataGridCtx}>
          <ColumnIdContextProvider value={dataGridCtx.columns[0].columnId}>
            <DataGridHeaderCell focusMode="none">Header cell</DataGridHeaderCell>
          </ColumnIdContextProvider>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    const columnHeaders = getAllByRole('columnheader');

    columnHeaders.forEach(columnHeader => {
      expect(columnHeader.tabIndex).toBe(-1);
      expect(columnHeader.hasAttribute('tabindex')).toBe(false);
    });
  });

  it('should override sortable and set tabindex when focusMode is group', () => {
    const dataGridCtx = mockSortableDataGridContext();
    const { getAllByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: true }}>
        <DataGridContextProvider value={dataGridCtx}>
          <ColumnIdContextProvider value={dataGridCtx.columns[0].columnId}>
            <DataGridHeaderCell focusMode="group">Header cell</DataGridHeaderCell>
          </ColumnIdContextProvider>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    const columnHeaders = getAllByRole('columnheader');

    columnHeaders.forEach(columnHeader => {
      expect(columnHeader.tabIndex).toBe(0);
      expect(columnHeader.getAttribute('tabindex')).toBe('0');
    });
  });
});
