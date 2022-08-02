import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { TableHeaderCell } from './TableHeaderCell';
import { isConformant } from '../../common/isConformant';
import { TableHeaderCellProps } from './TableHeaderCell.types';
import { TableContextProvider, tableContextDefaultValue } from '../../contexts/tableContext';
import { SortDirection } from '../Table/Table.types';

describe('TableHeaderCell', () => {
  const tr = document.createElement('tr');
  beforeEach(() => {
    document.body.appendChild(tr);
  });

  isConformant({
    Component: TableHeaderCell as React.FC<TableHeaderCellProps>,
    displayName: 'TableHeaderCell',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            sortIcon: 'Test Icon',
          },
        },
      ],
    },
    renderOptions: {
      container: tr,
    },
  });

  it('renders a default state', () => {
    const result = render(<TableHeaderCell columnKey="test">Default TableHeaderCell</TableHeaderCell>, {
      container: tr,
    });
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true }}>
        <TableHeaderCell columnKey={'test'}>Cell</TableHeaderCell>
      </TableContextProvider>,
    );
    expect(container.firstElementChild?.tagName).toEqual('DIV');
    expect(container.firstElementChild?.getAttribute('role')).toEqual('columnheader');
  });

  it('should render sortIcon when sortable is true and the header cell is sorted', () => {
    const columnKey = 'test';
    const { container } = render(
      <TableContextProvider
        value={{ ...tableContextDefaultValue, noNativeElements: true, sortable: true, sortColumn: columnKey }}
      >
        <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
      </TableContextProvider>,
    );
    expect(container.querySelector('svg')).not.toBe(null);
  });

  it('should not render sortIcon when the header cell is not sorted', () => {
    const columnKey = 'test';
    const { container } = render(
      <TableContextProvider
        value={{ ...tableContextDefaultValue, noNativeElements: true, sortable: true, sortColumn: 'sorted' }}
      >
        <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
      </TableContextProvider>,
    );
    expect(container.querySelector('svg')).toBe(null);
  });

  it('should not have interactive button when not sortable', () => {
    const columnKey = 'test';
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true, sortable: false }}>
        <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
      </TableContextProvider>,
    );

    const button = container.querySelector('button');
    expect(button?.getAttribute('role')).toEqual('presentation');
    expect(button?.getAttribute('tabindex')).toEqual('-1');
  });

  it.each<SortDirection>(['ascending', 'descending'])(
    'should render aria-sort according to sortDirection',
    sortDirection => {
      const columnKey = 'test';
      const { getByRole } = render(
        <TableContextProvider
          value={{
            ...tableContextDefaultValue,
            noNativeElements: true,
            sortable: true,
            sortColumn: columnKey,
            sortDirection,
          }}
        >
          <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
        </TableContextProvider>,
      );
      expect(getByRole('columnheader').getAttribute('aria-sort')).toEqual(sortDirection);
    },
  );

  it('should not render aria-sort when column is not sorted', () => {
    const columnKey = 'test';
    const { getByRole } = render(
      <TableContextProvider
        value={{
          ...tableContextDefaultValue,
          noNativeElements: true,
          sortable: true,
          sortColumn: 'other',
          sortDirection: 'ascending',
        }}
      >
        <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
      </TableContextProvider>,
    );
    expect(getByRole('columnheader').hasAttribute('aria-sort')).toBe(false);
  });

  it('should should call requestSortColumnChange when header is clicked', () => {
    const columnKey = 'test';
    const spy = jest.fn();
    const { getByRole } = render(
      <TableContextProvider
        value={{ ...tableContextDefaultValue, noNativeElements: true, sortable: true, requestSortColumnChange: spy }}
      >
        <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
      </TableContextProvider>,
    );

    fireEvent.click(getByRole('button'));

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), columnKey);
  });

  it('should should not call requestSortColumnChange when non-sortable header is clicked', () => {
    const columnKey = 'test';
    const spy = jest.fn();
    const { getByRole } = render(
      <TableContextProvider
        value={{ ...tableContextDefaultValue, noNativeElements: true, sortable: false, requestSortColumnChange: spy }}
      >
        <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
      </TableContextProvider>,
    );

    fireEvent.click(getByRole('presentation'));

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
