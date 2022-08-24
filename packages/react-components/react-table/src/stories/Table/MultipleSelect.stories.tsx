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
import { TableBody, TableCell, TableRow, Table, TableHeader, TableHeaderCell, TableSelectionCell } from '../..';
import { useTable, ColumnDefinition } from '../../hooks';
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
  },
  {
    columnId: 'author',
  },
  {
    columnId: 'lastUpdated',
  },
  {
    columnId: 'lastUpdate',
  },
];

export const MultipleSelect = () => {
  const {
    rows,
    selection: { allRowsSelected, someRowsSelected, toggleAllRows },
  } = useTable({
    columns,
    items,
    rowEnhancer: (row, { selection }) => ({
      ...row,
      onClick: () => selection.toggleRow(row.rowId),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
          selection.toggleRow(row.rowId);
        }
      },
      selected: selection.isRowSelected(row.rowId),
    }),
  });

  // eslint-disable-next-line deprecation/deprecation
  const ref = useNavigationMode<HTMLDivElement>('row');

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableSelectionCell
            checked={allRowsSelected ? true : someRowsSelected ? 'mixed' : false}
            onClick={toggleAllRows}
          />
          <TableHeaderCell>File</TableHeaderCell>
          <TableHeaderCell>Author</TableHeaderCell>
          <TableHeaderCell>Last updated</TableHeaderCell>
          <TableHeaderCell>Last update</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody ref={ref}>
        {rows.map(({ item, selected, onClick, onKeyDown }) => (
          <TableRow tabIndex={0} key={item.file.label} onClick={onClick} onKeyDown={onKeyDown} aria-selected={selected}>
            <TableSelectionCell checkboxIndicator={{ tabIndex: -1 }} checked={selected} />
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
