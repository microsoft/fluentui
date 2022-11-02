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
import { TableCellLayout } from '@fluentui/react-components/unstable';
import {
  DataGridBody,
  DataGridCell,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  ColumnDefinition,
  RowState,
} from '@fluentui/react-table';

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

const columns: ColumnDefinition<Item>[] = [
  { columnId: 'file' },
  { columnId: 'author' },
  { columnId: 'lastUpdated' },
  { columnId: 'lastUpdate' },
];

export const Default = () => {
  return (
    <DataGrid items={items} columns={columns}>
      <DataGridHeader>
        <DataGridRow>
          <DataGridHeaderCell>File</DataGridHeaderCell>
          <DataGridHeaderCell>Author</DataGridHeaderCell>
          <DataGridHeaderCell>Last updated</DataGridHeaderCell>
          <DataGridHeaderCell>Last update</DataGridHeaderCell>
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody>
        {({ item, rowId }: RowState<Item>) => (
          <DataGridRow key={rowId}>
            <DataGridCell>
              <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>
            </DataGridCell>
            <DataGridCell>
              <TableCellLayout
                media={
                  <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                }
              >
                {item.author.label}
              </TableCellLayout>
            </DataGridCell>
            <DataGridCell>{item.lastUpdated.label}</DataGridCell>
            <DataGridCell>
              <TableCellLayout media={item.lastUpdate.icon}>{item.lastUpdate.label}</TableCellLayout>
            </DataGridCell>
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
