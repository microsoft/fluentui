import * as React from 'react';
import {
  FolderRegular,
  EditRegular,
  OpenRegular,
  DocumentRegular,
  DocumentPdfRegular,
  VideoRegular,
  DeleteRegular,
} from '@fluentui/react-icons';
import {
  PresenceBadgeStatus,
  Avatar,
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Button,
  TableColumnId,
  DataGridCellFocusMode,
} from '@fluentui/react-components';

type FileCell = {
  label: string;
  icon: JSX.Element;
};

type LastUpdatedCell = {
  label: string;
  timestamp: number;
};

type AuthorCell = {
  label: string;
  status: PresenceBadgeStatus;
};

type Item = {
  file: FileCell;
  author: AuthorCell;
  lastUpdated: LastUpdatedCell;
};

const items: Item[] = [
  {
    file: { label: 'Meeting notes', icon: <DocumentRegular /> },
    author: { label: 'Max Mustermann', status: 'available' },
    lastUpdated: { label: '7h ago', timestamp: 1 },
  },
  {
    file: { label: 'Thursday presentation', icon: <FolderRegular /> },
    author: { label: 'Erika Mustermann', status: 'busy' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
  },
  {
    file: { label: 'Training recording', icon: <VideoRegular /> },
    author: { label: 'John Doe', status: 'away' },
    lastUpdated: { label: 'Yesterday at 1:45 PM', timestamp: 2 },
  },
  {
    file: { label: 'Purchase order', icon: <DocumentPdfRegular /> },
    author: { label: 'Jane Doe', status: 'offline' },
    lastUpdated: { label: 'Tue at 9:30 AM', timestamp: 3 },
  },
];

const columns: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
    renderHeaderCell: () => {
      return 'File';
    },
    renderCell: item => {
      return <TableCellLayout media={item.file.icon}>{item.file.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
    renderHeaderCell: () => {
      return 'Author';
    },
    renderCell: item => {
      return (
        <TableCellLayout
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
    columnId: 'singleAction',
    renderHeaderCell: () => {
      return 'Single action';
    },
    renderCell: () => {
      return <Button icon={<OpenRegular />}>Open</Button>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'actions',
    renderHeaderCell: () => {
      return 'Actions';
    },
    renderCell: () => {
      return (
        <>
          <Button aria-label="Edit" icon={<EditRegular />} />
          <Button aria-label="Delete" icon={<DeleteRegular />} />
        </>
      );
    },
  }),
];

const getCellFocusMode = (columnId: TableColumnId): DataGridCellFocusMode => {
  switch (columnId) {
    case 'singleAction':
      return 'none';
    case 'actions':
      return 'group';
    default:
      return 'cell';
  }
};

export const FocusableElementsInCells = () => {
  return (
    <DataGrid
      items={items}
      columns={columns}
      sortable
      selectionMode="multiselect"
      getRowId={item => item.file.label}
      onSelectionChange={(e, data) => console.log(data)}
      style={{ minWidth: '550px' }}
    >
      <DataGridHeader>
        <DataGridRow selectionCell={{ checkboxIndicator: { 'aria-label': 'Select all rows' } }}>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<Item>>
        {({ item, rowId }) => (
          <DataGridRow<Item> key={rowId} selectionCell={{ checkboxIndicator: { 'aria-label': 'Select row' } }}>
            {({ renderCell, columnId }) => (
              <DataGridCell focusMode={getCellFocusMode(columnId)}>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};

FocusableElementsInCells.parameters = {
  docs: {
    description: {
      story: [
        'When cells contain focusable elements, set the `focusMode` prop on the `DataGridCell` component.',
        '',
        'Use `group` when there are multiple focusable elements in cell,',
        '`group` will enable the following behaviour:',
        '- Enter will move focus into the cell',
        '- Focus is trapped in the cell',
        '- Escape will move focus back to the cell',
        '',
        'Use `none` when there is one single focusable element in cell,',
        '`none` will make the cell non-focusable',
      ].join('\n'),
    },
  },
};
