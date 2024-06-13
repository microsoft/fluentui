import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableColumnDefinition,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useTableColumnSizing_unstable,
  useTableFeatures,
  PresenceBadgeStatus,
  Avatar,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import {
  DocumentPdfRegular,
  DocumentRegular,
  EditRegular,
  FolderRegular,
  OpenRegular,
  PeopleRegular,
  VideoRegular,
} from '@fluentui/react-icons';

const columnsDef: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    renderHeaderCell: () => <>File</>,
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => <>Author</>,
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => <>Last updated</>,
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => <>Last update</>,
  }),
];

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

const columnSizingOptions = {
  file: {
    idealWidth: 300,
    minWidth: 150,
  },
  author: {
    minWidth: 110,
    defaultWidth: 250,
  },
  lastUpdate: {
    minWidth: 150,
  },
};

export const ResizableColumnsDisableAutoFit = () => {
  const [columns] = React.useState<TableColumnDefinition<Item>[]>(columnsDef);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { getRows, columnSizing_unstable, tableRef } = useTableFeatures(
    {
      columns,
      items,
    },
    [useTableColumnSizing_unstable({ columnSizingOptions, autoFitColumns: false })],
  );
  const rows = getRows();

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table ref={tableRef} {...columnSizing_unstable.getTableProps()} noNativeElements={true}>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <Menu openOnContext key={column.columnId}>
                <MenuTrigger>
                  <TableHeaderCell
                    key={column.columnId}
                    {...columnSizing_unstable.getTableHeaderCellProps(column.columnId)}
                  >
                    {column.renderHeaderCell()}
                  </TableHeaderCell>
                </MenuTrigger>
                <MenuPopover>
                  <MenuList>
                    <MenuItem onClick={columnSizing_unstable.enableKeyboardMode(column.columnId)}>
                      Keyboard Column Resizing
                    </MenuItem>
                  </MenuList>
                </MenuPopover>
              </Menu>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map(({ item }) => (
            <TableRow key={item.file.label}>
              <TableCell {...columnSizing_unstable.getTableCellProps('file')}>
                <TableCellLayout truncate media={item.file.icon}>
                  {item.file.label}
                </TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing_unstable.getTableCellProps('author')}>
                <TableCellLayout
                  truncate
                  media={
                    <Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />
                  }
                >
                  {item.author.label}
                </TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing_unstable.getTableCellProps('lastUpdated')}>
                <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>
              </TableCell>
              <TableCell {...columnSizing_unstable.getTableCellProps('lastUpdate')}>
                <TableCellLayout truncate media={item.lastUpdate.icon}>
                  {item.lastUpdate.label}
                </TableCellLayout>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
ResizableColumnsDisableAutoFit.storyName = 'Resizable Columns - Disabled container auto-fit';
ResizableColumnsDisableAutoFit.parameters = {
  docs: {
    description: {
      story: [
        'By default, the column sizing feature will automatically fit the columns to the content.',
        'This behavior can be disabled by setting the`autoFitColumns` option to`false`.',
        '',
        'Make sure to also enable `noNativeElements` option to prevent displaying the table elements as',
        "native elements, as the native elements won't overflow the parent table.",
      ].join('\n'),
    },
  },
};
