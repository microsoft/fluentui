import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { createTableColumn } from '@fluentui/react-table';
import { DataGridBody } from './DataGridBody/DataGridBody';
import { DataGridCell } from './DataGridCell/DataGridCell';
import { DataGridHeader } from './DataGridHeader/DataGridHeader';
import { DataGridHeaderCell } from './DataGridHeaderCell/DataGridHeaderCell';
import { DataGridRow } from './DataGridRow/DataGridRow';
import { isConformant } from '../../testing/isConformant';
import { DataGrid } from './DataGrid';
import type { DataGridProps } from './DataGrid.types';

describe('DataGrid', () => {
  isConformant<DataGridProps>({
    Component: DataGrid,
    displayName: 'DataGrid',
    requiredProps: { items: [], columns: [] } as DataGridProps,
  });
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

const renderGrid = (props: Partial<React.ComponentProps<typeof DataGrid>> = {}) => {
  // The selection indicator needs an accessible name, which is only rendered when selection is enabled
  const selectionCell = (label: string, header = false) => {
    if (!props.selectionMode) {
      return undefined;
    }

    // the header of a single select grid has no radio
    return props.selectionMode === 'single'
      ? { radioIndicator: header ? undefined : { 'aria-label': label } }
      : { checkboxIndicator: { 'aria-label': label } };
  };

  return render(
    <DataGrid items={items} columns={columns} aria-label="People" {...props}>
      <DataGridHeader>
        <DataGridRow selectionCell={selectionCell('Select all', true)}>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item> key={rowId} selectionCell={selectionCell(`Select ${item.name}`)}>
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>,
  );
};

const bodyRowNames = (container: HTMLElement) =>
  Array.from(container.querySelectorAll('[role="rowgroup"]:last-of-type [role="row"]')).map(
    row => row.querySelector('[role="gridcell"]:not([data-selection-type])')?.textContent,
  );

describe('DataGrid family', () => {
  it('renders the grid roles and has no axe violations', async () => {
    const { container, getByRole, getAllByRole } = renderGrid({ selectionMode: 'multiselect' });

    expect(getByRole('grid', { name: 'People' })).toBeInTheDocument();
    expect(getAllByRole('rowgroup')).toHaveLength(2);
    expect(getAllByRole('row')).toHaveLength(4);
    expect(getAllByRole('columnheader')).toHaveLength(2);
    expect(await axe(container, { rules: { region: { enabled: false } } })).toHaveNoViolations();
  });

  it('does not add design state, Fluent classes or Tabster attributes', () => {
    const { container } = renderGrid({ selectionMode: 'multiselect' });

    expect(container.querySelector('[class*="fui-"]')).toBeNull();
    expect(container.querySelector('[data-tabster]')).toBeNull();
  });

  describe('focus modes', () => {
    it('uses an inline focusgroup in the cell focus mode, and makes the cells tabbable', () => {
      const { getByRole, getAllByRole } = renderGrid();

      expect(getByRole('grid')).toHaveAttribute('focusgroup', 'toolbar inline');
      expect(getByRole('grid')).toHaveAttribute('data-focus-mode', 'cell');
      getAllByRole('gridcell').forEach(cell => expect(cell.tabIndex).toBe(0));
      getAllByRole('columnheader').forEach(cell => expect(cell.tabIndex).toBe(0));
    });

    it('uses a block focusgroup over the rows in the row focus mode, and opts the cells out of it', () => {
      const { getByRole, getAllByRole } = renderGrid({ focusMode: 'row_unstable', selectionMode: 'multiselect' });
      const [headerRow, ...bodyRows] = getAllByRole('row');

      expect(getByRole('grid')).toHaveAttribute('focusgroup', 'toolbar block');
      expect(getByRole('grid')).toHaveAttribute('data-focus-mode', 'row_unstable');
      expect(headerRow).not.toHaveAttribute('tabindex');
      bodyRows.forEach(row => expect(row.tabIndex).toBe(0));
      getAllByRole('gridcell').forEach(cell => expect(cell).toHaveAttribute('focusgroup', 'none'));
      getAllByRole('columnheader').forEach(cell => expect(cell).toHaveAttribute('focusgroup', 'none'));
    });

    it('adds no focusgroup in the none focus mode', () => {
      const { getByRole, getAllByRole } = renderGrid({ focusMode: 'none' });

      expect(getByRole('grid')).not.toHaveAttribute('focusgroup');
      expect(getByRole('grid')).toHaveAttribute('data-focus-mode', 'none');
      getAllByRole('gridcell').forEach(cell => expect(cell).not.toHaveAttribute('tabindex'));
    });

    it('lets a cell opt out of the keyboard navigation', () => {
      const { getAllByRole } = render(
        <DataGrid items={items} columns={columns} aria-label="People">
          <DataGridBody<Item>>
            {({ item, rowId }) => (
              <DataGridRow<Item> key={rowId}>
                {({ renderCell }) => <DataGridCell focusMode="none">{renderCell(item)}</DataGridCell>}
              </DataGridRow>
            )}
          </DataGridBody>
        </DataGrid>,
      );

      getAllByRole('gridcell').forEach(cell => expect(cell).not.toHaveAttribute('tabindex'));
    });

    it('moves focus to the same column of the next row with the arrow keys', () => {
      const { getAllByRole } = renderGrid();
      const cells = getAllByRole('gridcell');

      cells[1].focus();
      fireEvent.keyDown(cells[1], { key: 'ArrowDown' });
      expect(document.activeElement).toBe(cells[3]);

      fireEvent.keyDown(cells[3], { key: 'ArrowUp' });
      expect(document.activeElement).toBe(cells[1]);
    });

    it('moves focus within a row with Home and End, and within the grid with Ctrl+Home and Ctrl+End', () => {
      const { getAllByRole } = renderGrid();
      const cells = getAllByRole('gridcell');
      const headers = getAllByRole('columnheader');

      cells[2].focus();
      fireEvent.keyDown(cells[2], { key: 'End' });
      expect(document.activeElement).toBe(cells[3]);

      fireEvent.keyDown(cells[3], { key: 'Home' });
      expect(document.activeElement).toBe(cells[2]);

      fireEvent.keyDown(cells[2], { key: 'End', ctrlKey: true });
      expect(document.activeElement).toBe(cells[5]);

      fireEvent.keyDown(cells[5], { key: 'Home', ctrlKey: true });
      expect(document.activeElement).toBe(headers[0]);
    });

    it('leaves the horizontal arrow keys to the focusgroup', () => {
      const { getAllByRole } = renderGrid();
      const cells = getAllByRole('gridcell');

      cells[0].focus();
      expect(fireEvent.keyDown(cells[0], { key: 'ArrowRight' })).toBe(true);
      expect(document.activeElement).toBe(cells[0]);
    });
  });

  describe('sorting', () => {
    it('sorts rows when a sortable header cell is clicked and exposes the sort state', () => {
      const { container, getByRole } = renderGrid({ sortable: true });
      const nameHeader = getByRole('columnheader', { name: 'Name' });
      const ageHeader = getByRole('columnheader', { name: 'Age' });

      expect(getByRole('grid')).toHaveAttribute('data-sortable');
      expect(nameHeader).toHaveAttribute('data-sortable');
      expect(nameHeader).not.toHaveAttribute('data-sort-direction');
      // a column without a compare function is not sortable
      expect(ageHeader).not.toHaveAttribute('data-sortable');
      expect(bodyRowNames(container)).toEqual(['Charlie', 'Alice', 'Bob']);

      fireEvent.click(nameHeader);
      expect(nameHeader).toHaveAttribute('data-sort-direction', 'ascending');
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
      expect(bodyRowNames(container)).toEqual(['Alice', 'Bob', 'Charlie']);

      fireEvent.click(nameHeader);
      expect(nameHeader).toHaveAttribute('data-sort-direction', 'descending');
      expect(bodyRowNames(container)).toEqual(['Charlie', 'Bob', 'Alice']);
    });

    it('does not sort when the grid is not sortable', () => {
      const { container, getByRole } = renderGrid();
      const nameHeader = getByRole('columnheader', { name: 'Name' });

      fireEvent.click(nameHeader);

      expect(nameHeader).not.toHaveAttribute('data-sortable');
      expect(nameHeader).not.toHaveAttribute('data-sort-direction');
      expect(bodyRowNames(container)).toEqual(['Charlie', 'Alice', 'Bob']);
    });

    it('makes the sort button, not the header cell, the focus target', () => {
      const { getByRole } = renderGrid({ sortable: true });

      expect(getByRole('columnheader', { name: 'Name' })).not.toHaveAttribute('tabindex');
      expect(getByRole('button', { name: 'Name' }).tabIndex).toBe(0);
    });
  });

  describe('selection', () => {
    it('exposes the selection mode and selects rows on click', () => {
      const onSelectionChange = jest.fn();
      const { getByRole, getAllByRole } = renderGrid({ selectionMode: 'multiselect', onSelectionChange });
      const rows = getAllByRole('row');

      expect(getByRole('grid')).toHaveAttribute('data-selection-mode', 'multiselect');
      expect(rows[1]).not.toHaveAttribute('data-selected');
      expect(rows[1]).toHaveAttribute('aria-selected', 'false');

      fireEvent.click(rows[1]);
      expect(rows[1]).toHaveAttribute('data-selected');
      expect(rows[1]).toHaveAttribute('aria-selected', 'true');
      expect(onSelectionChange).toHaveBeenLastCalledWith(
        expect.anything(),
        expect.objectContaining({ selectedItems: new Set([0]) }),
      );

      fireEvent.click(rows[1]);
      expect(rows[1]).not.toHaveAttribute('data-selected');
    });

    it('never marks the header row as selected', () => {
      const { getAllByRole } = renderGrid({ selectionMode: 'multiselect' });
      const [headerRow] = getAllByRole('row');

      fireEvent.click(headerRow);

      expect(headerRow).toHaveAttribute('data-header-row');
      expect(headerRow).not.toHaveAttribute('data-selected');
    });

    it('toggles a selectable row with the Space key', () => {
      const { getAllByRole } = renderGrid({ selectionMode: 'multiselect', focusMode: 'row_unstable' });
      const row = getAllByRole('row')[1];

      fireEvent.keyDown(row, { key: ' ' });
      expect(row).toHaveAttribute('data-selected');
    });

    it('keeps a single selected row in single-select mode, with radio indicators', () => {
      const { getByRole, getAllByRole } = renderGrid({ selectionMode: 'single' });
      const rows = getAllByRole('row');

      expect(getByRole('grid')).toHaveAttribute('data-selection-mode', 'single');
      expect(getAllByRole('radio')).toHaveLength(3);

      fireEvent.click(rows[1]);
      fireEvent.click(rows[2]);

      expect(rows[1]).not.toHaveAttribute('data-selected');
      expect(rows[2]).toHaveAttribute('data-selected');
      expect(rows[2].querySelector('[data-selection-type="radio"]')).toHaveAttribute('data-checked');
    });

    it('toggles all rows from the header selection cell, going through the mixed state', () => {
      const { getAllByRole, getByRole } = renderGrid({ selectionMode: 'multiselect' });
      const header = () => getByRole('checkbox', { name: 'Select all' }) as HTMLInputElement;
      const headerCell = () => header().closest('[role="gridcell"]') as HTMLElement;

      expect(headerCell()).not.toHaveAttribute('data-checked');

      fireEvent.click(getAllByRole('row')[1]);
      expect(header().indeterminate).toBe(true);
      expect(headerCell()).toHaveAttribute('data-checked', 'mixed');

      fireEvent.click(header());
      expect(headerCell()).toHaveAttribute('data-checked', '');
      expect(
        getAllByRole('row')
          .slice(1)
          .every(row => row.hasAttribute('data-selected')),
      ).toBe(true);

      fireEvent.click(header());
      expect(headerCell()).not.toHaveAttribute('data-checked');
      expect(getAllByRole('row').some(row => row.hasAttribute('data-selected'))).toBe(false);
    });

    it('renders no selection cells and no aria-selected without a selection mode', () => {
      const { getByRole, getAllByRole, queryAllByRole } = renderGrid();

      expect(getByRole('grid')).not.toHaveAttribute('data-selection-mode');
      expect(queryAllByRole('checkbox')).toHaveLength(0);
      expect(getAllByRole('row')[1]).not.toHaveAttribute('aria-selected');
    });

    it('does not let consumer props override the reserved attributes', () => {
      const { getByRole } = render(
        <DataGrid items={items} columns={columns} aria-label="People" data-focus-mode="nope" data-selection-mode="nope">
          <DataGridBody<Item>>{() => null}</DataGridBody>
        </DataGrid>,
      );

      expect(getByRole('grid')).toHaveAttribute('data-focus-mode', 'cell');
      expect(getByRole('grid')).not.toHaveAttribute('data-selection-mode');
    });
  });
});
