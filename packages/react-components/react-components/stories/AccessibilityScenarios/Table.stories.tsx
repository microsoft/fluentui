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
  TableColumnDefinition,
  TableColumnId,
  useTableSort,
  useTableSelection,
  useArrowNavigationGroup,
  createTableColumn,
  PresenceBadgeStatus,
  Avatar,
  Button,
} from '@fluentui/react-components';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
} from '@fluentui/react-icons';

import { Scenario } from './utils';

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
    lastUpdated: { label: '7h ago', timestamp: 1 },
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
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
    lastUpdate: {
      label: 'You shared this in a Teams chat',
      icon: <PeopleRegular />,
    },
  },
];

const staticColumns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

const StaticTable = () => {
  return (
    <Table aria-labelledby="static-table-heading">
      <TableHeader>
        <TableRow>
          {staticColumns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const sortableColumns: TableColumnDefinition<Item>[] = [
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

const SortableTable = () => {
  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
  } = useTableFeatures(
    {
      columns: sortableColumns,
      items,
    },
    [
      useTableSort({
        defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' },
      }),
    ],
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (event: React.MouseEvent) => {
      toggleColumnSort(event, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  return (
    <Table aria-labelledby="sortable-table-heading" sortable>
      <TableHeader>
        <TableRow>
          <TableHeaderCell {...headerSortProps('file')}>File</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('author')}>Author</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdated')}>Last updated</TableHeaderCell>
          <TableHeaderCell {...headerSortProps('lastUpdate')}>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item }) => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const selectColumns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
  }),
  createTableColumn<Item>({
    columnId: 'author',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
  }),
];

const MultipleSelectTable = () => {
  const {
    getRows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns: selectColumns,
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
      onClick: (event: React.MouseEvent) => toggleRow(event, row.rowId),
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === ' ') {
          event.preventDefault();
          toggleRow(event, row.rowId);
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
    <Table aria-labelledby="multiple-row-select-table-heading">
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
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout media={<Avatar aria-label={item.author.label} badge={{ status: item.author.status }} />}>
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const SingleSelectTable = () => {
  const {
    getRows,
    selection: { toggleRow, isRowSelected },
  } = useTableFeatures(
    {
      columns: selectColumns,
      items,
    },
    [
      useTableSelection({
        selectionMode: 'single',
        defaultSelectedItems: new Set([1]),
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

  return (
    <Table aria-labelledby="single-row-select-table-heading">
      <TableHeader>
        <TableRow>
          <TableSelectionCell type="radio" hidden />
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
            <TableSelectionCell checked={selected} type="radio" radioIndicator={{ 'aria-label': 'Select row' }} />
            <TableCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout media={<Avatar aria-label={item.author.label} badge={{ status: item.author.status }} />}>
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const CellNavigationTable = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <Table aria-labelledby="cell-navigation-table-heading" {...keyboardNavAttr} role="grid">
      <TableHeader>
        <TableRow>
          {staticColumns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}

          <TableHeaderCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
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
            <TableCell role="gridcell">
              <TableCellLayout>
                <Button icon={<EditRegular />}>Edit</Button>
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const RowNavigationTable = () => {
  const keyboardNavAttr = useArrowNavigationGroup({ axis: 'grid' });

  return (
    <Table
      aria-labelledby="row-navigation-table-heading"
      {...keyboardNavAttr}
      role="grid"
      aria-label="Table with grid keyboard navigation"
    >
      <TableHeader>
        <TableRow>
          {staticColumns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}

          <TableHeaderCell />
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow tabIndex={0} key={item.file.label}>
            <TableCell tabIndex={0} role="gridcell">
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell">
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{
                      status: item.author.status as PresenceBadgeStatus,
                    }}
                  />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell role="gridcell">{item.lastUpdated.label}</TableCell>
            <TableCell role="gridcell">
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
            <TableCell role="gridcell">
              <TableCellLayout>
                <Button icon={<EditRegular />}>Edit</Button>
              </TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export const UserActivityTables = () => {
  return (
    <Scenario pageTitle="User activity tables">
      <h1>User activity tables</h1>

      <h2 id="static-table-heading">Static table</h2>
      <StaticTable />

      <h2 id="sortable-table-heading">Sortable table</h2>
      <SortableTable />

      <h2 id="multiple-row-select-table-heading">Multiple row select table</h2>
      <MultipleSelectTable />

      <h2 id="single-row-select-table-heading">Single row select table</h2>
      <SingleSelectTable />

      <h2 id="cell-navigation-table-heading">Cell navigation table</h2>
      <CellNavigationTable />

      <h2 id="row-navigation-table-heading">Row navigation table</h2>
      <RowNavigationTable />
    </Scenario>
  );
};
