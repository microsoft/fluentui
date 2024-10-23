import {
  TableColumnDefinition,
  TableColumnId,
  Table,
  TableBody,
  TableCell,
  TableCellLayout,
  TableHeader,
  TableHeaderCell,
  TableRow,
  createTableColumn,
  useId,
  useTableColumnSizing_unstable,
  useTableFeatures,
  useTableSort,
  TableColumnSizingOptions,
  PresenceBadgeStatus,
  Avatar,
  Button,
  Input,
  Label,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
} from '@fluentui/react-components';
import {
  DismissRegular,
  DocumentRegular,
  EditRegular,
  FolderRegular,
  OpenRegular,
  VideoRegular,
  DocumentPdfRegular,
  PeopleRegular,
} from '@fluentui/react-icons';
import * as React from 'react';
import { useState } from 'react';

const columnNames: { [key: TableColumnId]: string } = {
  file: 'File',
  author: 'Author',
  lastUpdated: 'Last updated',
  lastUpdate: 'Last update',
};

const columnsDef: TableColumnDefinition<Item>[] = [
  createTableColumn<Item>({
    columnId: 'file',
    renderHeaderCell: () => <>{columnNames.file}</>,
    renderCell: (item: Item) => (
      <TableCellLayout truncate media={item.file.icon}>
        {item.file.label}
      </TableCellLayout>
    ),
    compare: (a, b) => {
      return a.file.label.localeCompare(b.file.label);
    },
  }),
  createTableColumn<Item>({
    columnId: 'author',
    renderHeaderCell: () => <>{columnNames.author}</>,
    renderCell: (item: Item) => (
      <TableCellLayout
        truncate
        media={<Avatar name={item.author.label} badge={{ status: item.author.status as PresenceBadgeStatus }} />}
      >
        {item.author.label}
      </TableCellLayout>
    ),
    compare: (a, b) => {
      return a.author.label.localeCompare(b.author.label);
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdated',
    renderHeaderCell: () => <>{columnNames.lastUpdated}</>,
    renderCell: (item: Item) => <TableCellLayout truncate>{item.lastUpdated.label}</TableCellLayout>,
    compare: (a, b) => {
      return a.lastUpdated.timestamp - b.lastUpdated.timestamp;
    },
  }),
  createTableColumn<Item>({
    columnId: 'lastUpdate',
    renderHeaderCell: () => <>{columnNames.lastUpdate}</>,
    renderCell: (item: Item) => (
      <TableCellLayout truncate media={item.lastUpdate.icon}>
        {item.lastUpdate.label}
      </TableCellLayout>
    ),
    compare: (a, b) => {
      return a.lastUpdate.label.localeCompare(b.lastUpdate.label);
    },
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

export const ResizableColumnsControlled = () => {
  const [columns, setColumns] = useState<TableColumnDefinition<Item>[]>(columnsDef);
  const [columnSizingOptions, setColumnSizingOptions] = useState<TableColumnSizingOptions>({
    file: {
      idealWidth: 300,
      minWidth: 190,
    },
    author: {
      minWidth: 170,
      defaultWidth: 250,
    },
    lastUpdated: {
      minWidth: 120,
    },
    lastUpdate: {
      minWidth: 220,
    },
  });

  const removeColumn = (index: number) => {
    setColumns([...columns.slice(0, index), ...columns.slice(index + 1)]);
  };

  const addColumn = () => {
    const currentColumnIds = columns.map(({ columnId }) => columnId);
    const missingColumnIndex = columnsDef.findIndex(({ columnId }) => !currentColumnIds.includes(columnId));
    if (missingColumnIndex !== -1) {
      const missingColumn = columnsDef[missingColumnIndex];
      setColumns(state => [...state.slice(0, missingColumnIndex), missingColumn, ...state.slice(missingColumnIndex)]);
    }
  };

  const onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newWidth = parseInt(e.target.value, 10);
    if (Number.isNaN(newWidth)) {
      newWidth = 0;
    }
    setColumnSizingOptions(state => ({
      ...state,
      file: {
        ...state.file,
        idealWidth: newWidth,
      },
    }));
  };

  const onMinWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMinWidth = parseInt(e.target.value, 10);
    if (Number.isNaN(newMinWidth)) {
      newMinWidth = 0;
    }
    setColumnSizingOptions(state => ({
      ...state,
      file: {
        ...state.file,
        minWidth: newMinWidth,
      },
    }));
  };

  const onColumnResize = React.useCallback((_, { columnId, width }) => {
    setColumnSizingOptions(state => ({
      ...state,
      [columnId]: {
        ...state[columnId],
        idealWidth: width,
      },
    }));
  }, []);

  const {
    getRows,
    sort: { getSortDirection, toggleColumnSort, sort },
    columnSizing_unstable: columnSizing,
    tableRef,
  } = useTableFeatures(
    {
      columns,
      items,
    },
    [
      useTableColumnSizing_unstable({ columnSizingOptions, onColumnResize }),
      useTableSort({ defaultSortState: { sortColumn: 'file', sortDirection: 'ascending' } }),
    ],
  );

  const headerSortProps = (columnId: TableColumnId) => ({
    onClick: (e: React.MouseEvent) => {
      toggleColumnSort(e, columnId);
    },
    sortDirection: getSortDirection(columnId),
  });

  const rows = sort(getRows());

  const inputId = useId('first-column');

  return (
    <>
      <p>
        <Label htmlFor={`${inputId}-width`}>First column width: </Label>
        <Input
          type="number"
          id={`${inputId}-width`}
          onChange={onWidthChange}
          value={columnSizingOptions.file.idealWidth ? columnSizingOptions.file.idealWidth.toString() : ''}
        />
      </p>
      <p>
        <Label htmlFor={`${inputId}-minwidth`}>First column minWidth: </Label>
        <Input
          type="number"
          id={`${inputId}-minwidth`}
          onChange={onMinWidthChange}
          value={columnSizingOptions.file.minWidth ? columnSizingOptions.file.minWidth?.toString() : ''}
        />
      </p>
      <p>
        <Button onClick={addColumn} disabled={columns.length === columnsDef.length}>
          Add removed column
        </Button>
      </p>
      <div style={{ overflowX: 'auto' }}>
        <Table sortable aria-label="Table with sort" ref={tableRef} {...columnSizing.getTableProps()}>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <Menu openOnContext key={column.columnId}>
                  <MenuTrigger>
                    <TableHeaderCell
                      key={column.columnId}
                      {...columnSizing.getTableHeaderCellProps(column.columnId)}
                      {...headerSortProps(column.columnId)}
                    >
                      {column.renderHeaderCell()}
                      <Button
                        appearance="transparent"
                        aria-label={`Remove ${columnNames[column.columnId]} column`}
                        size="small"
                        icon={<DismissRegular />}
                        style={{ position: 'absolute', right: 0 }}
                        onClick={() => removeColumn(index)}
                      />
                    </TableHeaderCell>
                  </MenuTrigger>
                  <MenuPopover>
                    <MenuList>
                      <MenuItem onClick={columnSizing.enableKeyboardMode(column.columnId)}>
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
                {columns.map(column => (
                  <TableCell key={column.columnId} {...columnSizing.getTableCellProps(column.columnId)}>
                    {column.renderCell(item)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
ResizableColumnsControlled.storyName = 'Resizable Columns - controlled (preview)';
ResizableColumnsControlled.parameters = {
  docs: {
    description: {
      story: [
        'This example demonstrates how `columnSizingOptions` can be used in combination with ',
        '`onColumnResize` callback to control the width of each column from the parent component.',
        '',
        'The table itself still makes sure the columns are laid out in such a way that they fit in the container.',
        '',
        'To make features like column resizing work with keyboard navigation, the `Menu` component is used to provide',
        ' a context menu for the header cells, which allows the user to access advanced Table features.',
        '',
        'This example also demonstrates how columns can be removed or added.',
      ].join('\n'),
    },
  },
};
