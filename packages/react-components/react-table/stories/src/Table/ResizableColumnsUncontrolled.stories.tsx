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

export const ResizableColumnsUncontrolled = () => {
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
    [useTableColumnSizing_unstable({ columnSizingOptions })],
  );

  const [inputValue, setInputValue] = React.useState('300');

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const numeric = parseInt(e.target.value, 10);
    if (!Number.isNaN(numeric)) {
      columnSizing_unstable.setColumnWidth('file', numeric);
    }
  };
  const rows = getRows();

  const inputId = useId('column-width');

  return (
    <>
      <p>
        <label htmlFor={inputId}>First column width: </label>
        <Input type="number" id={inputId} onChange={onWidthChange} value={inputValue ? inputValue.toString() : ''} />
      </p>
      <div style={{ overflowX: 'auto' }}>
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
ResizableColumnsUncontrolled.storyName = 'Resizable Columns (preview)';
ResizableColumnsUncontrolled.parameters = {
  docs: {
    description: {
      story: [
        'The Table component contains logic to support column resizing. To enable resizing,',
        'use the `useTableFeatures` hook in combination with the `useTableColumnSizing_unstable` plugin.',
        'The resulting `columnSizing_unstable` object contains methods needed to make resizing work.',
        '',
        'In this example we are choosing an uncontrolled approach, which still allows us to set column ',
        'width in an imperative matter (try changing the input value).',
        '',
        'Options can be passed to the plugin to define minimum, default and optimal ',
        '(in a controlled scenario) width of the column.',
        '',
        'To make features like column resizing work with keyboard navigation, the `Menu` component is used to provide',
        ' a context menu for the header cells, which allows the user to access advanced Table features.',
        '',
        'To learn about how to control widths from the parent, please see the example below.',
      ].join('\n'),
    },
  },
};
