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
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell } from '../..';
import { useTable, ColumnDefinition, ColumnId } from '../../hooks';

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

export const Sort = () => {
  const {
    rows,
    sort: { getSortDirection, toggleColumnSort },
  } = useTable({ columns, items });

  const headerSortProps = (columnId: ColumnId) => () => ({
    onClick: () => toggleColumnSort(columnId),
    sortDirection: getSortDirection(columnId),
  });

  return (
    <Table sortable>
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
            <TableCell media={item.file.icon}>{item.file.label}</TableCell>
            <TableCell media={<Avatar badge={{ status: item.author.status }} />}>{item.author.label}</TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
