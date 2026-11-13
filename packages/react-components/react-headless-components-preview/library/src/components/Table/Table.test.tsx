import * as React from 'react';
import { render } from '@testing-library/react';
import { TableBody } from './TableBody/TableBody';
import { TableCell } from './TableCell/TableCell';
import { TableCellActions } from './TableCellActions/TableCellActions';
import { TableCellLayout } from './TableCellLayout/TableCellLayout';
import { TableHeader } from './TableHeader/TableHeader';
import { TableHeaderCell } from './TableHeaderCell/TableHeaderCell';
import { TableRow } from './TableRow/TableRow';
import { TableSelectionCell } from './TableSelectionCell/TableSelectionCell';
import { isConformant } from '../../testing/isConformant';
import { Table } from './Table';
import type { TableProps } from './Table.types';

describe('Table', () => {
  isConformant<TableProps>({
    Component: Table,
    displayName: 'Table',
  });
});

describe('Table family', () => {
  const renderTable = (props: React.ComponentProps<typeof Table> = {}, selectionProps: object = {}) =>
    render(
      <Table aria-label="People" {...props}>
        <TableHeader>
          <TableRow>
            <TableSelectionCell checkboxIndicator={{ 'aria-label': 'Select all' }} {...selectionProps} />
            <TableHeaderCell sortDirection="ascending" sortable>
              Name
            </TableHeaderCell>
            <TableHeaderCell>Age</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableSelectionCell checkboxIndicator={{ 'aria-label': 'Select Alice' }} checked />
            <TableCell>
              <TableCellLayout media="m" description="Admin">
                Alice
              </TableCellLayout>
              <TableCellActions visible>
                <button>Edit</button>
              </TableCellActions>
            </TableCell>
            <TableCell>25</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

  it('renders semantic table elements', () => {
    const { container, getByRole, getAllByRole } = renderTable();

    expect(container.querySelector('table')).toBe(getByRole('table', { name: 'People' }));
    expect(container.querySelector('thead')).not.toBeNull();
    expect(container.querySelector('tbody')).not.toBeNull();
    expect(getAllByRole('row')).toHaveLength(2);
    expect(getAllByRole('columnheader')).toHaveLength(2);
    expect(getAllByRole('cell')).toHaveLength(4);
  });

  it('renders divs with ARIA roles when `noNativeElements` is set', () => {
    const { container, getByRole, getAllByRole } = renderTable({ noNativeElements: true });

    expect(container.querySelector('table')).toBeNull();
    expect(getByRole('table', { name: 'People' }).tagName).toBe('DIV');
    expect(getAllByRole('rowgroup')).toHaveLength(2);
    expect(getAllByRole('row')).toHaveLength(2);
    expect(getAllByRole('columnheader')).toHaveLength(2);
  });

  it('does not add design state or Fluent classes', () => {
    const { container } = renderTable();

    expect(container.querySelector('[class*="fui-"]')).toBeNull();
    expect(container.querySelector('[data-tabster]')).toBeNull();
    expect(container.querySelector('.fui-Checkbox')).toBeNull();
  });

  describe('data attributes', () => {
    it('marks a sortable table', () => {
      const { getByRole, rerender } = renderTable({ sortable: true });
      expect(getByRole('table')).toHaveAttribute('data-sortable');

      rerender(
        <Table aria-label="People">
          <TableBody />
        </Table>,
      );
      expect(getByRole('table')).not.toHaveAttribute('data-sortable');
    });

    it('marks the header row', () => {
      const { getAllByRole } = renderTable();
      const [headerRow, bodyRow] = getAllByRole('row');

      expect(headerRow).toHaveAttribute('data-header-row');
      expect(bodyRow).not.toHaveAttribute('data-header-row');
    });

    it('exposes the sort state of a header cell', () => {
      const { getAllByRole } = renderTable();
      const [name, age] = getAllByRole('columnheader');

      expect(name).toHaveAttribute('data-sortable');
      expect(name).toHaveAttribute('data-sort-direction', 'ascending');
      expect(name).toHaveAttribute('aria-sort', 'ascending');
      expect(age).not.toHaveAttribute('data-sortable');
      expect(age).not.toHaveAttribute('data-sort-direction');
      expect(age).not.toHaveAttribute('aria-sort');
    });

    it('renders the sorted header content inside a button, without a default icon', () => {
      const { getByRole, getAllByRole } = renderTable();

      expect(getByRole('button', { name: 'Name' })).toBeInTheDocument();
      expect(getAllByRole('columnheader')[0].querySelector('svg')).toBeNull();
    });

    it('exposes the selection state of a selection cell', () => {
      const { getAllByRole } = renderTable({}, { checked: 'mixed' });
      const [headerCell, bodyCell] = getAllByRole('row').map(row => row.firstElementChild as HTMLElement);

      expect(headerCell).toHaveAttribute('data-checked', 'mixed');
      expect(headerCell).toHaveAttribute('data-selection-type', 'checkbox');
      expect(headerCell).not.toHaveAttribute('data-invisible');
      expect(bodyCell).toHaveAttribute('data-checked', '');
    });

    it('leaves data-checked off an unselected cell and marks an invisible one', () => {
      const { getAllByRole } = renderTable({}, { invisible: true });
      const headerCell = getAllByRole('row')[0].firstElementChild as HTMLElement;

      expect(headerCell).not.toHaveAttribute('data-checked');
      expect(headerCell).toHaveAttribute('data-invisible');
    });

    it('marks visible cell actions', () => {
      const { getByText } = renderTable();

      expect(getByText('Edit').parentElement).toHaveAttribute('data-visible');
    });

    it('cannot be overridden by consumer props', () => {
      const { getByRole } = render(
        <Table aria-label="People" data-sortable="nope">
          <TableBody />
        </Table>,
      );

      expect(getByRole('table')).not.toHaveAttribute('data-sortable');
    });
  });

  describe('selection cell', () => {
    it('renders a native checkbox that reflects checked and mixed', () => {
      const { getByRole, rerender } = render(
        <table>
          <tbody>
            <tr>
              <TableSelectionCell checked checkboxIndicator={{ 'aria-label': 'Select' }} />
            </tr>
          </tbody>
        </table>,
      );
      const checkbox = () => getByRole('checkbox', { name: 'Select' }) as HTMLInputElement;

      expect(checkbox().checked).toBe(true);

      rerender(
        <table>
          <tbody>
            <tr>
              <TableSelectionCell checked="mixed" checkboxIndicator={{ 'aria-label': 'Select' }} />
            </tr>
          </tbody>
        </table>,
      );
      expect(checkbox().checked).toBe(false);
      expect(checkbox().indeterminate).toBe(true);
    });

    it('renders a native radio for the radio type', () => {
      const { getByRole } = render(
        <table>
          <tbody>
            <tr>
              <TableSelectionCell type="radio" checked radioIndicator={{ 'aria-label': 'Select' }} />
            </tr>
          </tbody>
        </table>,
      );

      const radio = getByRole('radio', { name: 'Select' }) as HTMLInputElement;
      expect(radio.checked).toBe(true);
    });
  });

  describe('cell layout', () => {
    it('renders the media, main content and description', () => {
      const { getByText } = renderTable();

      expect(getByText('m')).toBeInTheDocument();
      expect(getByText('Alice')).toBeInTheDocument();
      expect(getByText('Admin')).toBeInTheDocument();
    });
  });
});
