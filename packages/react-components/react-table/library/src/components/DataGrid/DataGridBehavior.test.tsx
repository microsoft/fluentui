import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { DataGrid } from './DataGrid';
import { DataGridBody } from '../DataGridBody/DataGridBody';
import { DataGridCell } from '../DataGridCell/DataGridCell';
import { DataGridHeader } from '../DataGridHeader/DataGridHeader';
import { DataGridHeaderCell } from '../DataGridHeaderCell/DataGridHeaderCell';
import { DataGridRow } from '../DataGridRow/DataGridRow';
import type { DataGridProps } from './DataGrid.types';
import { createTableColumn } from '../../hooks';

jest.mock('../../hooks/useMeasureElement', () => {
  return { useMeasureElement: () => ({ width: 1000, measureElementRef: jest.fn() }) };
});

interface Item {
  name: string;
  age: number;
}

const items: Item[] = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 },
];

const columns = [
  createTableColumn<Item>({
    columnId: 'name',
    compare: (a, b) => a.name.localeCompare(b.name),
    renderHeaderCell: () => 'Name',
    renderCell: item => item.name,
  }),
  createTableColumn<Item>({
    columnId: 'age',
    renderHeaderCell: () => 'Age',
    renderCell: item => String(item.age),
  }),
];

const renderGrid = (props: Partial<DataGridProps> = {}) =>
  render(
    <DataGrid items={items} columns={columns} aria-label="People" {...props}>
      <DataGridHeader>
        <DataGridRow>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item> key={rowId}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>,
  );

const bodyRowNames = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[role="rowgroup"]:last-of-type [role="row"]')).map(
    row => row.querySelector('[role="gridcell"]')?.textContent,
  );

describe('DataGrid behavior', () => {
  describe('structure', () => {
    it('exposes the grid, rowgroup, row, columnheader and gridcell roles', () => {
      const { getByRole, getAllByRole } = renderGrid();

      expect(getByRole('grid', { name: 'People' })).toBeTruthy();
      expect(getAllByRole('rowgroup')).toHaveLength(2);
      expect(getAllByRole('row')).toHaveLength(4);
      expect(getAllByRole('columnheader')).toHaveLength(2);
      expect(getAllByRole('gridcell')).toHaveLength(6);
    });
  });

  describe('sorting', () => {
    it('sorts rows when a sortable header is clicked and toggles the direction', () => {
      const { container, getByRole } = renderGrid({ sortable: true });
      const nameHeader = getByRole('columnheader', { name: 'Name' });

      expect(nameHeader.getAttribute('aria-sort')).toBe('none');
      expect(bodyRowNames(container)).toEqual(['Charlie', 'Alice', 'Bob']);

      fireEvent.click(nameHeader);
      expect(nameHeader.getAttribute('aria-sort')).toBe('ascending');
      expect(bodyRowNames(container)).toEqual(['Alice', 'Bob', 'Charlie']);

      fireEvent.click(nameHeader);
      expect(nameHeader.getAttribute('aria-sort')).toBe('descending');
      expect(bodyRowNames(container)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('calls onSortChange', () => {
      const onSortChange = jest.fn();
      const { getByRole } = renderGrid({ sortable: true, onSortChange });

      fireEvent.click(getByRole('columnheader', { name: 'Name' }));

      expect(onSortChange).toHaveBeenCalledWith(expect.anything(), { sortColumn: 'name', sortDirection: 'ascending' });
    });

    it('does not sort or expose aria-sort when the grid is not sortable', () => {
      const { container, getByRole } = renderGrid();
      const nameHeader = getByRole('columnheader', { name: 'Name' });

      fireEvent.click(nameHeader);

      expect(nameHeader.hasAttribute('aria-sort')).toBe(false);
      expect(bodyRowNames(container)).toEqual(['Charlie', 'Alice', 'Bob']);
    });

    it('does not sort by a column without a compare function', () => {
      const { container, getByRole } = renderGrid({ sortable: true });

      fireEvent.click(getByRole('columnheader', { name: 'Age' }));

      expect(bodyRowNames(container)).toEqual(['Charlie', 'Alice', 'Bob']);
    });

    it('renders a sort indicator on the sorted column', () => {
      const { getByRole } = renderGrid({
        sortable: true,
        defaultSortState: { sortColumn: 'name', sortDirection: 'ascending' },
      });

      const nameHeader = getByRole('columnheader', { name: 'Name' });
      expect(nameHeader.getAttribute('aria-sort')).toBe('ascending');
      expect(nameHeader.querySelector('svg')).not.toBeNull();
    });
  });

  describe('selection', () => {
    it('selects rows through the row checkboxes in multiselect mode', () => {
      const onSelectionChange = jest.fn();
      const { getAllByRole } = renderGrid({ selectionMode: 'multiselect', onSelectionChange });
      const rows = getAllByRole('row');

      expect(rows[1].getAttribute('aria-selected')).toBe('false');

      fireEvent.click(rows[1]);
      expect(rows[1].getAttribute('aria-selected')).toBe('true');
      expect(onSelectionChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ selectedItems: new Set([0]) }),
      );

      fireEvent.click(rows[1]);
      expect(rows[1].getAttribute('aria-selected')).toBe('false');
    });

    it('keeps a single selected row in single-select mode', () => {
      const { getAllByRole } = renderGrid({ selectionMode: 'single' });
      const rows = getAllByRole('row');

      fireEvent.click(rows[1]);
      fireEvent.click(rows[2]);

      expect(rows[1].getAttribute('aria-selected')).toBe('false');
      expect(rows[2].getAttribute('aria-selected')).toBe('true');
    });

    it('toggles all rows from the header checkbox, going through the mixed state', () => {
      const { getAllByRole, getAllByRole: all } = renderGrid({ selectionMode: 'multiselect' });
      const checkboxes = () => all('checkbox') as HTMLInputElement[];
      const [headerCheckbox] = checkboxes();

      expect(headerCheckbox.checked).toBe(false);

      fireEvent.click(getAllByRole('row')[1]);
      expect(checkboxes()[0].indeterminate).toBe(true);

      fireEvent.click(checkboxes()[0]);
      expect(checkboxes().every(c => c.checked)).toBe(true);

      fireEvent.click(checkboxes()[0]);
      expect(checkboxes().every(c => !c.checked)).toBe(true);
    });

    it('does not render selection cells or aria-selected without a selection mode', () => {
      const { getAllByRole, queryAllByRole } = renderGrid();

      expect(queryAllByRole('checkbox')).toHaveLength(0);
      expect(getAllByRole('row')[1].hasAttribute('aria-selected')).toBe(false);
    });
  });

  describe('focus mode attributes', () => {
    it('makes cells tabbable in the default cell mode', () => {
      const { getAllByRole } = renderGrid();

      getAllByRole('gridcell').forEach(cell => expect(cell.tabIndex).toBe(0));
      getAllByRole('columnheader').forEach(header => expect(header.tabIndex).toBe(0));
    });

    it('makes rows instead of cells tabbable in the row mode', () => {
      const { getAllByRole } = renderGrid({ focusMode: 'row_unstable' });
      const [headerRow, ...bodyRows] = getAllByRole('row');

      expect(headerRow.hasAttribute('tabindex')).toBe(false);
      bodyRows.forEach(row => expect(row.tabIndex).toBe(0));
      getAllByRole('gridcell').forEach(cell => expect(cell.hasAttribute('tabindex')).toBe(false));
    });

    it('makes nothing tabbable in the none mode', () => {
      const { getAllByRole } = renderGrid({ focusMode: 'none' });

      getAllByRole('gridcell').forEach(cell => expect(cell.hasAttribute('tabindex')).toBe(false));
      getAllByRole('row').forEach(row => expect(row.hasAttribute('tabindex')).toBe(false));
    });

    it('makes rows tabbable and adds a row groupper in the composite mode', () => {
      const { getAllByRole } = renderGrid({ focusMode: 'composite' });
      const [headerRow, ...bodyRows] = getAllByRole('row');

      expect(headerRow.hasAttribute('tabindex')).toBe(false);
      bodyRows.forEach(row => {
        expect(row.tabIndex).toBe(0);
        expect(row.getAttribute('data-tabster')).toContain('groupper');
      });
    });
  });

  describe('keyboard', () => {
    it('toggles a selectable row with the Space key', () => {
      const { getAllByRole } = renderGrid({ selectionMode: 'multiselect', focusMode: 'row_unstable' });
      const row = getAllByRole('row')[1];

      fireEvent.keyDown(row, { key: ' ' });
      expect(row.getAttribute('aria-selected')).toBe('true');
    });

    it('calls the consumer onKeyDown before handling the event', () => {
      const onKeyDown = jest.fn();
      const { getByRole } = renderGrid({ onKeyDown });

      fireEvent.keyDown(getByRole('grid'), { key: 'a' });

      expect(onKeyDown).toHaveBeenCalledTimes(1);
    });
  });
});
