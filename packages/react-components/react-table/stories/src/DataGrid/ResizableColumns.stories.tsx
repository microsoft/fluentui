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
  PresenceBadgeStatus,
  Avatar,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  Menu,
  MenuList,
  MenuPopover,
  MenuTrigger,
  MenuItem,
} from '@fluentui/react-components';

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
      return (
        <TableCellLayout truncate media={item.file.icon}>
          {item.file.label}
        </TableCellLayout>
      );
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
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
    renderHeaderCell: () => {
      return 'Last updated';
    },

    renderCell: item => {
      return <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
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

const columnSizingOptions = {
  file: {
    minWidth: 80,
    defaultWidth: 120,
  },
  author: {
    defaultWidth: 180,
    minWidth: 120,
    idealWidth: 180,
  },
};

export const ResizableColumns = () => {
  const refMap = React.useRef<Record<string, HTMLElement | null>>({});

  return (
    <div style={{ overflowX: 'auto' }}>
      <DataGrid
        items={items}
        columns={columns}
        sortable
        getRowId={item => item.file.label}
        selectionMode="multiselect"
        resizableColumns
        columnSizingOptions={columnSizingOptions}
      >
        <DataGridHeader>
          <DataGridRow selectionCell={{ checkboxIndicator: { 'aria-label': 'Select all rows' } }}>
            {({ renderHeaderCell, columnId }, dataGrid) =>
              dataGrid.resizableColumns ? (
                <Menu openOnContext>
                  <MenuTrigger>
                    <DataGridHeaderCell ref={el => (refMap.current[columnId] = el)}>
                      {renderHeaderCell()}
                    </DataGridHeaderCell>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem onClick={dataGrid.columnSizing_unstable.enableKeyboardMode(columnId)}>
                        Keyboard Column Resizing
                      </MenuItem>
                    </MenuList>
                  </MenuPopover>
                </Menu>
              ) : (
                <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
              )
            }
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Item>>
          {({ item, rowId }) => (
            <DataGridRow<Item> key={rowId} selectionCell={{ checkboxIndicator: { 'aria-label': 'Select row' } }}>
              {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
};

ResizableColumns.storyName = 'Resizable Columns (preview)';
ResizableColumns.parameters = {
  docs: {
    description: {
      story: [
        'Columns can be made resizable by passing a prop `resizableColumns`. The resizing configuration for each ',
        'column (like `minWidth` and `defaultWidth`), can be further customized by passing down a ',
        '`columnSizingOptions` prop.',
        '',
        'The control over the state of resizing can be achieved with the combination of `onColumnResize` callback ',
        'and setting the `idealWidth` for a column in `columnSizingOptions`.',
        '',
        'For accessibility, the `DataGrid` component supports keyboard navigation and screen reader navigation',
        'To make features like column resizing work with keyboard navigation, the `Menu` component is used to provide',
        ' a context menu for the header cells, which allows the user to access other DataGrid features.',
        '',
        'Once an option is selected, the arrows keys can be used to interact with the `DataGrid` (e.g. resize columns).',
        '`ESC`, `ENTER`, or `SPACE` can be used to return to the original navigation mode.',
      ].join('\n'),
    },
  },
};
