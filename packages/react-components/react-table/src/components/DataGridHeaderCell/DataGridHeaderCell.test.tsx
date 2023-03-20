import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DataGridHeaderCell } from './DataGridHeaderCell';
import { isConformant } from '../../testing/isConformant';
import { DataGridHeaderCellProps } from './DataGridHeaderCell.types';
import { DataGridContextProvider } from '../../contexts/dataGridContext';
import { mockDataGridContext } from '../../testing/mockDataGridContext';
import { TableContextProvider } from '../../contexts/tableContext';

describe('DataGridHeaderCell', () => {
  isConformant<DataGridHeaderCellProps>({
    Component: DataGridHeaderCell,
    displayName: 'DataGridHeaderCell',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            sortIcon: 'Test Icon',
            aside: 'Test aside',
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<DataGridHeaderCell>Default DataGridHeaderCell</DataGridHeaderCell>);
    expect(result.container).toMatchSnapshot();
  });

  it('should get sortDirection from context when the component is sortable', () => {
    const dataGridCtx = mockDataGridContext({}, { sort: { getSortDirection: () => 'descending' } });
    const { getByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: true }}>
        <DataGridContextProvider value={dataGridCtx}>
          <DataGridHeaderCell>Header cell</DataGridHeaderCell>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    expect(getByRole('columnheader').getAttribute('aria-sort')).toEqual('descending');
  });

  it('should call sort state from context when the component is sortable', () => {
    const toggleColumnSort = jest.fn();
    const dataGridCtx = mockDataGridContext({}, { sort: { toggleColumnSort } });
    const { getByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: true }}>
        <DataGridContextProvider value={dataGridCtx}>
          <DataGridHeaderCell>Header cell</DataGridHeaderCell>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    fireEvent.click(getByRole('columnheader'));
    expect(toggleColumnSort).toHaveBeenCalledTimes(1);
  });

  it('should not call sort state from context when the component is not sortable', () => {
    const toggleColumnSort = jest.fn();
    const dataGridCtx = mockDataGridContext({}, { sort: { toggleColumnSort } });
    const { getByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: false }}>
        <DataGridContextProvider value={dataGridCtx}>
          <DataGridHeaderCell>Header cell</DataGridHeaderCell>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    fireEvent.click(getByRole('columnheader'));
    expect(toggleColumnSort).toHaveBeenCalledTimes(0);
  });

  it('should set tabindex 0 on header cell if not sortable', () => {
    const dataGridCtx = mockDataGridContext();
    const { getAllByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: false }}>
        <DataGridContextProvider value={dataGridCtx}>
          <DataGridHeaderCell>Header cell</DataGridHeaderCell>
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
    const dataGridCtx = mockDataGridContext();
    const { getAllByRole } = render(
      <TableContextProvider value={{ noNativeElements: true, size: 'medium', sortable: true }}>
        <DataGridContextProvider value={dataGridCtx}>
          <DataGridHeaderCell>Header cell</DataGridHeaderCell>
        </DataGridContextProvider>
      </TableContextProvider>,
    );

    const columnHeaders = getAllByRole('columnheader');
    columnHeaders.forEach(columnHeader => {
      expect(columnHeader.tabIndex).toBe(-1);
      expect(columnHeader.hasAttribute('tabindex')).toBe(false);
    });
  });
});
