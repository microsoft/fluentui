import * as React from 'react';
import { useArrowNavigationGroup } from '@fluentui/react-tabster';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  ColumnDefinition,
  useTableSelection,
  useTableSort,
  createColumn,
  ColumnId,
} from '@fluentui/react-table';
import { FluentProvider } from '@fluentui/react-provider';
import { webLightTheme } from '@fluentui/react-theme';

type FileCell = {
  label: string;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
};

type AuthorCell = {
  label: string;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const DataGrid = () => {
  const items = React.useMemo(() => {
    const baseItems: Item[] = [
      {
        file: { label: 'Meeting notes' },
        author: { label: 'Max Mustermann' },
        lastUpdated: { label: '7h ago', timestamp: 3 },
        lastUpdate: {
          label: 'You edited this',
        },
      },
      {
        file: { label: 'Thursday presentation' },
        author: { label: 'Erika Mustermann' },
        lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
        lastUpdate: {
          label: 'You recently opened this',
        },
      },
      {
        file: { label: 'Training recording' },
        author: { label: 'John Doe' },
        lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
        lastUpdate: {
          label: 'You recently opened this',
        },
      },
      {
        file: { label: 'Purchase order' },
        author: { label: 'Jane Doe' },
        lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
        lastUpdate: {
          label: 'You shared this in a Teams chat',
        },
      },
    ];

    return new Array(15).fill(0).map((_, i) => baseItems[i % baseItems.length]);
  }, []);

  const columns: ColumnDefinition<Item>[] = React.useMemo(
    () => [
      createColumn<Item>({
        columnId: 'file',
        compare: (a, b) => {
          return a.file.label.localeCompare(b.file.label);
        },
      }),
      createColumn<Item>({
        columnId: 'author',
        compare: (a, b) => {
          return a.author.label.localeCompare(b.author.label);
        },
      }),
      createColumn<Item>({
        columnId: 'lastUpdated',
        compare: (a, b) => {
          return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
        },
      }),
      createColumn<Item>({
        columnId: 'lastUpdate',
        compare: (a, b) => {
          return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
        },
      }),
    ],
    [],
  );

  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'multiselect',
        defaultSelectedItems: new Set([0, 1]),
      }),
      useTableSort({ defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' } }),
    ],
  );

  const rows = sort(
    getRows(row => {
      const selected = isRowSelected(row.rowId);
      return {
        ...row,
        onClick: (e: React.MouseEvent) => toggleRow(e, row.rowId),
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === ' ') {
            e.preventDefault();
            toggleRow(e, row.rowId);
          }
        },
        selected,
        appearance: selected ? ('brand' as const) : ('none' as const),
      };
    }),
  );

  const headerSortProps = (columnId: ColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <Table {...keyboardNavAttr} role="grid" sortable aria-label="DataGrid implementation with Table primitives">
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            aria-checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            role="checkbox"
            onClick={toggleAllRows}
            checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
          />
          <TableHeaderCell {...headerSortProps('file')}>File</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('author')}>Author</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdated')}>Last updated</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdate')}>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, selected, onClick, onKeyDown, appearance }) => (
          <TableRow
            key={item.file.label}
            onClick={onClick}
            onKeyDown={onKeyDown}
            aria-selected={selected}
            appearance={appearance}
          >
            <TableSelectionCell
              role="gridcell"
              aria-selected={selected}
              checked={selected}
              checkboxIndicator={{ 'aria-label': 'Select row' }}
            />
            <TableCell tabIndex={0} role="gridcell" aria-selected={selected}>
              <TableCellLayout>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.author.label}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              {item.lastUpdated.label}
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

DataGrid.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);

export default DataGrid;
