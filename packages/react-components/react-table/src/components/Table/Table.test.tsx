import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Table } from './Table';
import { isConformant } from '../../common/isConformant';
import { TableProps } from './Table.types';
import { TableRow } from '../TableRow/TableRow';
import { TableCell } from '../TableCell/TableCell';
import { TableBody } from '../TableBody/TableBody';
import { TableHeader } from '../TableHeader/TableHeader';
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';

describe('Table', () => {
  isConformant({
    Component: Table as React.FC<TableProps>,
    displayName: 'Table',
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(
      <Table>
        <tbody>
          <tr>
            <td>Cell</td>
          </tr>
        </tbody>
      </Table>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('renders as div if `noNativeElements` is set', () => {
    const { container } = render(
      <Table noNativeElements>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(container).toMatchSnapshot();
  });

  it('should call onSortColumnChange when column is clicked', () => {
    const columnKey = 'test';
    const spy = jest.fn();
    const { getByRole } = render(
      <Table noNativeElements onSortColumnChange={spy}>
        <TableBody>
          <TableHeader>
            <TableRow>
              <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
            </TableRow>
          </TableHeader>
        </TableBody>
      </Table>,
    );

    fireEvent.click(getByRole('button'));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.anything(), {
      sortState: { sortColumn: columnKey, sortDirection: 'ascending' },
    });
  });

  it('should use defaultSortState on mount', () => {
    const columnKey = 'test';
    const { getByRole } = render(
      <Table noNativeElements defaultSortState={{ sortColumn: columnKey, sortDirection: 'descending' }}>
        <TableBody>
          <TableHeader>
            <TableRow>
              <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
            </TableRow>
          </TableHeader>
        </TableBody>
      </Table>,
    );

    expect(getByRole('columnheader').getAttribute('aria-sort')).toEqual('descending');
  });

  it('should not use defaultSortState after mount', () => {
    const columnKey = 'test';
    const { getByRole, rerender } = render(
      <Table noNativeElements defaultSortState={{ sortColumn: columnKey, sortDirection: 'descending' }}>
        <TableBody>
          <TableHeader>
            <TableRow>
              <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
            </TableRow>
          </TableHeader>
        </TableBody>
      </Table>,
    );

    expect(getByRole('columnheader').getAttribute('aria-sort')).toEqual('descending');

    rerender(
      <Table noNativeElements defaultSortState={{ sortColumn: columnKey, sortDirection: 'ascending' }}>
        <TableBody>
          <TableHeader>
            <TableRow>
              <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
            </TableRow>
          </TableHeader>
        </TableBody>
      </Table>,
    );

    expect(getByRole('columnheader').getAttribute('aria-sort')).toEqual('descending');
  });

  it('should use sortState to control sorting', () => {
    const columnKey = 'test';
    const { getByRole, rerender } = render(
      <Table noNativeElements sortState={{ sortColumn: columnKey, sortDirection: 'descending' }}>
        <TableBody>
          <TableHeader>
            <TableRow>
              <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
            </TableRow>
          </TableHeader>
        </TableBody>
      </Table>,
    );

    expect(getByRole('columnheader').getAttribute('aria-sort')).toEqual('descending');

    rerender(
      <Table noNativeElements sortState={{ sortColumn: columnKey, sortDirection: 'ascending' }}>
        <TableBody>
          <TableHeader>
            <TableRow>
              <TableHeaderCell columnKey={columnKey}>Cell</TableHeaderCell>
            </TableRow>
          </TableHeader>
        </TableBody>
      </Table>,
    );

    expect(getByRole('columnheader').getAttribute('aria-sort')).toEqual('ascending');
  });
});
