import * as React from 'react';
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
  createColumn,
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

const MultipleSelect = () => {
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
      }),
      createColumn<Item>({
        columnId: 'author',
      }),
      createColumn<Item>({
        columnId: 'lastUpdated',
      }),
      createColumn<Item>({
        columnId: 'lastUpdate',
      }),
    ],
    [],
  );

  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
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
    ],
  );

  const rows = getRows(row => {
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
  });

  const toggleAllKeydown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        toggleAllRows(e);
        e.preventDefault();
      }
    },
    [toggleAllRows],
  );

  return (
    <Table aria-label="Table with multiselect">
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
            onKeyDown={toggleAllKeydown}
            checkboxIndicator={{ 'aria-label': 'Select all rows ' }}
          />
          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
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
            <TableSelectionCell checked={selected} checkboxIndicator={{ 'aria-label': 'Select row' }} />
            <TableCell>
              <TableCellLayout>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout>{item.author.label}</TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

MultipleSelect.decorator = (props: { children: React.ReactNode }) => (
  <FluentProvider theme={webLightTheme}>{props.children}</FluentProvider>
);
export default MultipleSelect;
