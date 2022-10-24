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
import { useTable, ColumnDefinition, useLazyScrolling } from '../../hooks';
import { TableCellLayout } from '../../components/TableCellLayout/TableCellLayout';

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

const rawItems: Item[] = [
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

const items: Item[] = [];

for (let i = 0; i < 10; i++) {
  items.push(...rawItems);
}

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

export const LazyLoading = () => {
  const forceUpdate = React.useReducer(() => ({}), {})[1];
  const {
    getRows,
    lazyScrolling: { observeRef, isTargetPosition },
  } = useTable(
    {
      columns,
      items,
    },
    [
      useLazyScrolling({
        callback: () => {
          console.log('loading');
          items.push(...rawItems);
          forceUpdate();
        },
        thresholds: [0.5, 1],
      }),
    ],
  );

  const rows = getRows((row, i) => {
    return {
      ...row,
      setObserveRef: isTargetPosition(i),
    };
  });

  return (
    <Table sortable>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map(({ item, setObserveRef }, i) => (
          <TableRow key={i} data-count={i} ref={setObserveRef ? observeRef : undefined}>
            <TableCell>
              <TableCellLayout media={item.file.icon}>
                {item.file.label} {i}
              </TableCellLayout>
            </TableCell>
            <TableCell>
              <TableCellLayout
                media={
                  <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
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
