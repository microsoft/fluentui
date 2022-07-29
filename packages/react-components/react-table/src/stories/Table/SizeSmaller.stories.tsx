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

export const SizeSmaller = () => {
  return (
    <Table noNativeElements size="smaller">
      <TableHeader>
        {columns.map(column => (
          <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
        ))}
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell media={item.file.icon}>{item.file.label}</TableCell>
            <TableCell
              media={
                <Avatar
                  size={20}
                  name={item.author.label}
                  badge={{ status: item.author.status as PresenceBadgeStatus }}
                />
              }
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
