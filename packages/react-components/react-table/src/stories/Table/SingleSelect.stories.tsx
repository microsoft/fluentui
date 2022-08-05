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

const items = [
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

const columns = [
  { columnKey: 'file', label: 'File' },
  { columnKey: 'author', label: 'Author' },
  { columnKey: 'lastUpdated', label: 'Last updated' },
  { columnKey: 'lastUpdate', label: 'Last update' },
];

export const SingleSelect = () => {
  const [selected, setSelected] = React.useState(-1);

  const select = (rowKey: number) => {
    setSelected(rowKey);
  };

  const onClickRow = (rowKey: number) => () => {
    select(rowKey);
  };

  const onKeyDownRow = (rowKey: number) => (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === ' ') {
      select(rowKey);
    }
  };

  return (
    <Table noNativeElements role="grid">
      <TableHeader>
        <TableRow>
          <TableSelectionCell role="gridcell" type="radio" />
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, i) => (
          <TableRow
            key={item.file.label}
            aria-selected={selected === i}
            tabIndex={0}
            onClick={onClickRow(i)}
            onKeyDown={onKeyDownRow(i)}
          >
            <TableSelectionCell
              role="gridcell"
              type="radio"
              checked={selected === i}
              checkboxIndicator={{ tabIndex: -1, title: `Select ${i}` }}
            />
            <TableCell role="gridcell" media={item.file.icon}>
              {item.file.label}
            </TableCell>
            <TableCell
              role="gridcell"
              media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
            >
              {item.author.label}
            </TableCell>
            <TableCell role="gridcell">{item.lastUpdated.label}</TableCell>
            <TableCell role="gridcell" media={item.lastUpdate.icon}>
              {item.lastUpdate.label}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
