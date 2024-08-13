import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  useArrowNavigationGroup,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
  useTableFeatures,
  TableColumnDefinition,
  useTableSelection,
  useTableSort,
  createTableColumn,
  TableColumnId,
  TableRowId,
  TableRowProps,
  TableSelectionState,
} from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSX.Element;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
  lastUpdate: LastUpdateCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 3 },
    lastUpdate: {
      label: 'You edited this',
      icon: <EditRegular />,
    },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
    lastUpdate: {
      label: 'You recently opened this',
      icon: <OpenRegular />,
    },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 1 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
  }),
];

export const Memoization = () => {
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
        selected,
        appearance: selected ? ('brand' as const) : ('none' as const),
      };
    }),
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <Table
      {...keyboardNavAttr}
      role="grid"
      sortable
      aria-label="DataGrid implementation with Table primitives"
      style={{ minWidth: '550px' }}
    >
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
        {rows.map(({ item, selected, appearance, rowId }) => (
          <TableSelectableRowMemoized
            key={rowId}
            rowId={rowId}
            toggleRow={toggleRow}
            item={item}
            selected={selected}
            appearance={appearance}
          />
        ))}
      </TableBody>
    </Table>
  );
};

type TableSelectableRowProps = {
  toggleRow: TableSelectionState['toggleRow'];
  item: Item;
  selected: boolean;
  appearance: TableRowProps['appearance'];
  rowId: TableRowId;
};

const TableSelectableRow: React.FC<TableSelectableRowProps> = props => {
  const { item, selected, appearance, rowId, toggleRow } = props;
  const onClick = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => toggleRow(e, rowId), [toggleRow, rowId]);
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === ' ') {
        e.preventDefault();
        toggleRow(e, rowId);
      }
    },
    [toggleRow, rowId],
  );

  return (
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
        <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
      </TableCell>
      <TableCell tabIndex={0} role="gridcell">
        <TableCellLayout
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      </TableCell>
      <TableCell tabIndex={0} role="gridcell">
        {item.lastUpdated.label}
      </TableCell>
      <TableCell tabIndex={0} role="gridcell">
        <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
      </TableCell>
    </TableRow>
  );
};

const TableSelectableRowMemoized = React.memo(TableSelectableRow);

Memoization.parameters = {
  docs: {
    description: {
      story: [
        'There is no single correct way to memoize components. It is important to note that memoization is not free',
        'and should only be used to optimize scenarios that can be identified as performance bottlenecks. This',
        "example demonstrates a reasonable memoization strategy to memoize entire table. When a row's selection",
        'changes, only the affected row is re-rendered.',
      ].join('\n'),
    },
  },
};
