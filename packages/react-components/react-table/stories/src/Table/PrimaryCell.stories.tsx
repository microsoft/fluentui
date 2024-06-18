import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  EditFilled,
  OpenRegular,
  DocumentRegular,
  PeopleRegular,
  DocumentPdfRegular,
  VideoRegular,
  MoreHorizontalRegular,
  MoreHorizontalFilled,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellActions,
  TableCellLayout,
} from '@fluentui/react-components';

const EditIcon = bundleIcon(EditFilled, EditRegular);
const MoreHorizontalIcon = bundleIcon(MoreHorizontalFilled, MoreHorizontalRegular);

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

export const PrimaryCell = () => {
  return (
    <Table aria-label="Table with primary cell layout" style={{ minWidth: '500px' }}>
      <TableHeader>
        <TableRow>
          {columns.map(column => (
            <TableHeaderCell key={column.columnKey}>{column.label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map(item => (
          <TableRow key={item.file.label}>
            <TableCell>
              <TableCellLayout media={item.file.icon} description="My Organization" appearance="primary">
                {item.file.label}
              </TableCellLayout>
              <TableCellActions>
                <Button icon={<EditIcon />} appearance="subtle" aria-label="Edit" />
                <Button icon={<MoreHorizontalIcon />} appearance="subtle" aria-label="More actions" />
              </TableCellActions>
            </TableCell>

            <TableCell>
              <TableCellLayout
                media={
                  <Avatar
                    aria-label={item.author.label}
                    name={item.author.label}
                    badge={{ status: item.author.status as PresenceBadgeStatus }}
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

PrimaryCell.parameters = {
  docs: {
    description: {
      story: [
        'A primary cell creates emphasis by increasing icon size and font weight for the main text.',
        'Generally the primary cell should be used in the first column of a table, but there is no obligation',
        'to do so and can be used in any column by the user.',
      ].join('\n'),
    },
  },
};
