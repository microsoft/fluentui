import * as React from 'react';
import {
  Folder16Regular as FolderRegular,
  Edit16Regular as EditRegular,
  Open16Regular as OpenRegular,
  Document16Regular as DocumentRegular,
  People16Regular as PeopleRegular,
  DocumentPdf16Regular as DocumentPdfRegular,
  Video16Regular as VideoRegular,
} from '@fluentui/react-icons';
import { PresenceBadgeStatus, Avatar } from '@fluentui/react-components';
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell } from '../..';
import { SortState } from '../../components/Table/Table.types';

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

type ColumnKey = 'file' | 'author' | 'lastUpdate' | 'lastUpdated';

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

const columns: Record<string, { label: string; compare: (a: unknown, b: unknown) => number }> = {
  file: {
    label: 'File',
    compare: (a: unknown, b: unknown) => (a as FileCell).label.localeCompare((b as FileCell).label),
  },
  author: {
    label: 'Author',
    compare: (a: unknown, b: unknown) => (a as AuthorCell).label.localeCompare((b as AuthorCell).label),
  },
  lastUpdated: {
    label: 'Last updated',
    compare: (a: unknown, b: unknown) => (b as LastUpdatedCell).timestamp - (a as LastUpdatedCell).timestamp,
  },
  lastUpdate: {
    label: 'Last update',
    compare: (a: unknown, b: unknown) => (a as LastUpdateCell).label.localeCompare((b as LastUpdateCell).label),
  },
};

export const Sort = () => {
  const [sortState, setSortState] = React.useState<SortState>({ sortColumn: 'file', sortDirection: 'ascending' });

  const sortedItems = items.slice().sort((a, b) => {
    const { sortColumn, sortDirection } = sortState;
    if (!sortColumn) {
      return 1;
    }

    const columnKey = sortColumn as ColumnKey;
    const mod = sortDirection === 'ascending' ? 1 : -1;
    return columns[columnKey].compare(a[columnKey], b[columnKey]) * mod;
  });

  return (
    <Table onSortColumnChange={(_, data) => setSortState(data.sortState)} defaultSortState={sortState}>
      <TableHeader>
        <TableRow>
          {(Object.keys(columns) as (keyof typeof columns)[]).map(columnKey => (
            <TableHeaderCell key={columnKey} columnKey={columnKey}>
              {columns[columnKey].label}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedItems.map(item => (
          <TableRow key={item.file.label}>
            <TableCell media={item.file.icon}>{item.file.label}</TableCell>
            <TableCell
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
            >
              {item.author.label}
            </TableCell>
            <TableCell>{item.lastUpdated.label}</TableCell>
            <TableCell media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
