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
import {
  Avatar,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  createTableColumn,
} from '@fluentui/react-components';

import type { JSXElement, PresenceBadgeStatus, TableColumnDefinition } from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSXElement;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type LastUpdateCell = {
  label: string;
  icon: JSXElement;
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

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return (
        <TableCellLayout truncate media={item.file.icon}>
          {item.file.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
          truncate
          media={
            <Avatar aria-label={item.author.label} name={item.author.label} badge={{ status: item.author.status }} />
          }
        >
          {item.author.label}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => {
      return 'Last updated';
    },
    renderCell: item => {
      return <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => {
      return 'Last update';
    },
    renderCell: item => {
      return (
        <TableCellLayout truncate media={item.lastUpdate.icon}>
          {item.lastUpdate.label}
        </TableCellLayout>
      );
    },
  }),
];

export const ResizableColumnsEvenDistribution = (): JSXElement => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <DataGrid
        items={items}
        columns={columns}
        getRowId={item => item.file.label}
        resizableColumns
        resizableColumnsOptions={{
          autoFitColumnsStrategy: 'even',
        }}
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item> key={rowId}>
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};

ResizableColumnsEvenDistribution.storyName = 'Resizable Columns - Even container auto-fit';
ResizableColumnsEvenDistribution.parameters = {
  docs: {
    description: {
      story: [
        'By default, auto-fit grows every column to its ideal width and gives all of the space that is left',
        'over to the last column. Columns that share the same ideal width therefore stop looking evenly',
        'spaced as soon as the container is wider than the sum of their ideal widths.',
        '',
        'Passing `resizableColumnsOptions={{ autoFitColumnsStrategy: "even" }}` shares the leftover space',
        'equally between all columns instead, so columns with the same ideal width stay equally wide - the',
        'same layout the columns get when resizing is disabled. Columns are still resizable, and the last',
        'column keeps its resize handle because it is no longer stretched to fill the table.',
        '',
        'A column that the user resizes keeps the width they chose, and the remaining columns share the rest',
        'of the container between them.',
      ].join('\n'),
    },
  },
};
