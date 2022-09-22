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
import { PresenceBadgeStatus, Avatar } from '@fluentui/react-components';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableSelectionCell,
  TableCellLayout,
} from '../..';
import { useTable, ColumnDefinition, useSelection, useSort, useColumnSizing, ColumnId } from '../../hooks';
import { useNavigationMode } from '../../navigationModes/useNavigationMode';

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

const columns: ColumnDefinition<Item>[] = [
  {
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
  },
  {
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  },
  {
    columnId: 'lastUpdated',
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  },
  {
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
  },
];

export const Everything = () => {
  const {
    getRows,
    tableRef,
    sort: { getSortDirection, toggleColumnSort, sort },
    selection: { allRowsSelected, someRowsSelected, toggleAllRows, toggleRow, isRowSelected },
    columnSizing: { getColumnWidth, getOnMouseDown },
  } = useTable(
    {
      columns,
      items,
    },
    [
      tableState =>
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSelection(tableState, {
          selectionMode: 'multiselect',
        }),
      // eslint-disable-next-line react-hooks/rules-of-hooks
      tableState => useSort(tableState, { defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' } }),
      useColumnSizing,
    ],
  );

  const headerSortProps = (columnId: ColumnId) => ({
    onClick: () => {
      toggleColumnSort(columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = getRows(row => ({
    ...row,
    onClick: () => toggleRow(row.rowId),
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        toggleRow(row.rowId);
      }
    },
    selected: isRowSelected(row.rowId),
  }));

  const getColumnStyle = (columnId: ColumnId) => ({
    minWidth: getColumnWidth(columnId),
    maxWidth: getColumnWidth(columnId),
  });

  return (
    <Table ref={tableRef}>
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
          />
          <TableHeaderCell style={getColumnStyle('file')} {...headerSortProps('file')}>
            File
            <Resizer onMouseDown={getOnMouseDown('file')} />
          </TableHeaderCell>
          <TableHeaderCell style={getColumnStyle('author')} {...headerSortProps('author')}>
            Author
            <Resizer onMouseDown={getOnMouseDown('author')} />
          </TableHeaderCell>
          <TableHeaderCell style={getColumnStyle('lastUpdated')} {...headerSortProps('lastUpdated')}>
            Last updated
            <Resizer onMouseDown={getOnMouseDown('lastUpdated')} />
          </TableHeaderCell>
          <TableHeaderCell style={getColumnStyle('lastUpdate')} {...headerSortProps('lastUpdate')}>
            Last update
            <Resizer onMouseDown={getOnMouseDown('lastUpdate')} />
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sort(rows).map(({ item, selected, onClick, onKeyDown }) => (
          <TableRow tabIndex={0} key={item.file.label} onClick={onClick} onKeyDown={onKeyDown} aria-selected={selected}>
            <TableSelectionCell checkboxIndicator={{ tabIndex: -1 }} checked={selected} />
            <TableCell style={getColumnStyle('file')}>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </TableCell>
            <TableCell style={getColumnStyle('author')}>
              <TableCellLayout media={<Avatar badge={{ status: item.author.status }} />}>
                {item.author.label}
              </TableCellLayout>
            </TableCell>
            <TableCell style={getColumnStyle('lastUpdated')}>{item.lastUpdated.label}</TableCell>
            <TableCell style={getColumnStyle('lastUpdate')}>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

const Resizer: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  return (
    <div
      {...props}
      style={{
        borderRight: '2px solid red',
        height: 44,
        cursor: 'w-resize',
        paddingLeft: 4,
        paddingRight: 4,
        position: 'absolute',
        right: -8,
      }}
    />
  );
};
