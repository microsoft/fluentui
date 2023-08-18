import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableColumnDefinition,
  TableColumnSizingOptions,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useTableColumnSizing_unstable,
  useTableFeatures,
  PresenceBadgeStatus,
  Avatar,
  Input,
  useId,
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

export const ResizableColumnsUnconstrained = () => {
  const [columns] = React.useState<TableColumnDefinition<Item>[]>(columnsDef);
  const [columnSizingOptions] = React.useState<TableColumnSizingOptions>({
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
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { getRows, columnSizing_unstable, tableRef } = useTableFeatures(
    {
      columns,
      items,
    },
    [useTableColumnSizing_unstable({ columnSizingOptions, constrainMaxWidth: false, constrainMinWidth: false })],
  );

  const rows = getRows();

  return (
    <>
      <div style={{ overflow: 'auto' }}>
        <Table sortable aria-label="Table with sort" ref={tableRef} {...columnSizing_unstable.getTableProps()}>
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
    </>
  );
};
ResizableColumnsUnconstrained.storyName = 'Resizable Columns - unconstrained width';
ResizableColumnsUnconstrained.parameters = {
  docs: {
    description: {
      story: [
        'Sometimes it is not desirable for the columns to be constrained by the container width and you would rather have the columns change widths without influencing width of any other column, at the cost of introducing scrollbars.',
        ``,
        'This is now possible using the `constrainMinWidth` and `constrainMaxWidth` parameters.',
      ].join('\n'),
    },
  },
};
