import * as React from 'react';
import { render } from '@testing-library/react';
import { TableHeaderCell } from './TableHeaderCell';
import { isConformant } from '../../testing/isConformant';
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
            aside: 'Test aside',
          },
        },
      ],
    },
    renderOptions: {
      container: tr,
    },
  });

  it('renders a default state', () => {
    const result = render(<TableHeaderCell>Default TableHeaderCell</TableHeaderCell>, {
      container: tr,
    });
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true }}>
        <TableHeaderCell>Cell</TableHeaderCell>
      </TableContextProvider>,
    );
    expect(container.firstElementChild?.tagName).toEqual('DIV');
    expect(container.firstElementChild?.getAttribute('role')).toEqual('columnheader');
  });

  it('should render sortIcon when sortable is true and the header cell is sorted', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true, sortable: true }}>
        <TableHeaderCell sortDirection="ascending">Cell</TableHeaderCell>
      </TableContextProvider>,
    );
    expect(container.querySelector('svg')).not.toBe(null);
  });

  it('should not render sortIcon when the header cell is not sorted', () => {
    const { container } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true, sortable: true }}>
        <TableHeaderCell>Cell</TableHeaderCell>
      </TableContextProvider>,
    );
    expect(container.querySelector('svg')).toBe(null);
  });

  it('should have interactive button when sortable', () => {
    const { getByRole } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true, sortable: true }}>
        <TableHeaderCell>Cell</TableHeaderCell>
      </TableContextProvider>,
    );

    const button = getByRole('button');
    expect(button?.getAttribute('tabindex')).toEqual('0');
  });

  it('should not have interactive button when not sortable', () => {
    const { queryByRole } = render(
      <TableContextProvider value={{ ...tableContextDefaultValue, noNativeElements: true, sortable: false }}>
        <TableHeaderCell>Cell</TableHeaderCell>
      </TableContextProvider>,
    );

    const button = queryByRole('button');
    expect(button).toBeNull();
  });

  it.each<SortDirection>(['ascending', 'descending'])(
    'should render aria-sort according to sortDirection',
    sortDirection => {
      const { getByRole } = render(
        <TableContextProvider
          value={{
            ...tableContextDefaultValue,
            noNativeElements: true,
            sortable: true,
          }}
        >
          <TableHeaderCell sortDirection={sortDirection}>Cell</TableHeaderCell>
        </TableContextProvider>,
      );
      expect(getByRole('columnheader').getAttribute('aria-sort')).toEqual(sortDirection);
    },
  );

  it('should render aria-sort "none" when column is not sorted', () => {
    const { getByRole } = render(
      <TableContextProvider
        value={{
          ...tableContextDefaultValue,
          noNativeElements: true,
          sortable: true,
        }}
      >
        <TableHeaderCell>Cell</TableHeaderCell>
      </TableContextProvider>,
    );
    expect(getByRole('columnheader').getAttribute('aria-sort')).toEqual('none');
  });

  it('should not render aria-sort table is not sortable', () => {
    const { getByRole } = render(
      <TableContextProvider
        value={{
          ...tableContextDefaultValue,
          noNativeElements: true,
          sortable: false,
        }}
      >
        <TableHeaderCell>Cell</TableHeaderCell>
      </TableContextProvider>,
    );
    expect(getByRole('columnheader').hasAttribute('aria-sort')).toBe(false);
  });
});
